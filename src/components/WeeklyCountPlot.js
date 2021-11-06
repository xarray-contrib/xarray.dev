import React from "react"
import { Text } from "@chakra-ui/react"
import useSWR from "swr"
import * as d3 from "d3"

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/index-chart
function IndexChart(
  data,
  {
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    z = () => 1, // given d in data, returns the (categorical) z-value for series
    defined, // for gaps in data
    curve = d3.curveLinear, // how to interpolate between points
    marginTop = 20, // top margin, in pixels
    marginRight = 40, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleUtc, // the x-scale type
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    xFormat, // a format specifier string for the x-axis
    yType = d3.scaleLog, // the y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    yFormat = "", // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    zDomain, // array of z-values
    formatDate = "%b %-d, %Y", // format specifier string for dates (in the title)
    colors = d3.schemeTableau10, // array of categorical colors
  } = {}
) {
  // Compute values.
  const X = d3.map(data, x)
  const Y = d3.map(data, y)
  const Z = d3.map(data, z)
  if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i])
  const D = d3.map(data, defined)

  // Compute default x- and z-domains, and unique the z-domain.
  if (xDomain === undefined) xDomain = d3.extent(X)
  if (zDomain === undefined) zDomain = Z
  zDomain = new d3.InternSet(zDomain)

  // Omit any data not present in the z-domain.
  const I = d3.range(X.length).filter((i) => zDomain.has(Z[i]))
  const Xs = d3.sort(I.filter((i) => D[i]).map((i) => X[i])) // for bisection later

  // Compute default y-domain.
  if (yDomain === undefined) {
    const r = (I) => d3.max(I, (i) => Y[i]) / d3.min(I, (i) => Y[i])
    const k = d3.max(d3.rollup(I, r, (i) => Z[i]).values())
    yDomain = [1 / k, k]
  }

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange).interpolate(d3.interpolateRound)
  const yScale = yType(yDomain, yRange)
  const color = d3.scaleOrdinal(zDomain, colors)
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / 80, xFormat)
    .tickSizeOuter(0)
  const yAxis = d3.axisLeft(yScale).ticks(null, yFormat)

  // Construct formats.
  formatDate = xScale.tickFormat(null, formatDate)

  // Construct a line generator.
  const line = d3
    .line()
    .defined((i) => D[i])
    .curve(curve)
    .x((i) => xScale(X[i]))
    .y((i, _, I) => yScale(Y[i] / Y[I[0]]))

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .on("touchstart", (event) => event.preventDefault())
    .on("pointermove", pointermoved)

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis)
    .call((g) => g.select(".domain").remove())

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("stroke-opacity", (d) => (d === 1 ? null : 0.2))
        .attr("x2", width - marginLeft - marginRight)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yLabel)
    )

  const rule = svg.append("g")

  rule
    .append("line")
    .attr("y1", marginTop)
    .attr("y2", height - marginBottom - 15)
    .attr("stroke", "currentColor")

  const ruleLabel = rule
    .append("text")
    .attr("y", height - marginBottom - 15)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .attr("dy", "1em")

  const serie = svg
    .append("g")
    .selectAll("g")
    .data(d3.group(I, (i) => Z[i]))
    .join("g")

  serie
    .append("path")
    .attr("fill", "none")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke", ([z]) => color(z))
    .attr("d", ([, I]) => line(I))

  serie
    .append("text")
    .attr("font-weight", "bold")
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round")
    .attr("x", ([, I]) => xScale(X[I[I.length - 1]]))
    .attr("y", ([, I]) => yScale(Y[I[I.length - 1]] / Y[I[0]]))
    .attr("dx", 3)
    .attr("dy", "0.4em")
    .text(([z]) => (z.includes("issue") ? "Issues" : "PRs"))
    .clone(true)
    .attr("fill", ([z]) => color(z))
    .attr("stroke", null)

  function update(date) {
    date = Xs[d3.bisectCenter(Xs, date)]
    rule.attr("transform", `translate(${xScale(date)},0)`)
    ruleLabel.text(formatDate(date))
    serie.attr("transform", ([, I]) => {
      const i = I[d3.bisector((i) => X[i]).center(I, date)]
      return `translate(0,${yScale(1) - yScale(Y[i] / Y[I[0]])})`
    })
    svg.property("value", date).dispatch("input", { bubbles: true }) // for viewof
  }

  function pointermoved(event) {
    update(xScale.invert(d3.pointer(event)[0]))
  }

  update(xDomain[0])

  return Object.assign(svg.node(), { scales: { color }, update })
}

const LinePlot = ({ data }) => {
  const ref = React.useRef(null)
  const width = 1152
  const height = 512

  React.useEffect(() => {
    const plot = IndexChart(data, {
      x: (d) => d.date,
      y: (d) => d.count,
      z: (d) => d.type,
      yLabel: "↑ Change (log scale)",
      width,
      height: height,
    })

    // uses a transition to change the basis date in the chart above,
    // triggering an animation on page load.
    d3.select(plot)
      .on("pointerenter", () => d3.select(plot).interrupt())
      .transition()
      .ease(d3.easeCubicOut)
      .duration(2000)
      .tween("date", () => {
        const i = d3.interpolateDate(
          ...d3.extent(data, (d) => d.date).reverse()
        )
        return (t) => plot.update(i(t))
      })

    if (ref.current) {
      if (ref.current.children[0]) {
        ref.current.children[0].remove()
      }
      ref.current.appendChild(plot)
    }
  }, [ref, data])

  return <div ref={ref} />
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const WeeklyCountPlot = () => {
  const { data, error } = useSWR(
    "https://gist.githubusercontent.com/andersy005/4f62b7b0cbf943b158cb11068e80c7c8/raw/740988cdf59121c1c4bf12345917301b5534217b/xarray-repo-weekly-data.json",
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  data.map((item) => {
    item.date = new Date(item.date)
  })

  const start = d3.min(data, (d) => d.date).toDateString()
  const end = d3.max(data, (d) => d.date).toDateString()

  return (
    <>
      <Text fontSize={"md"} align={"center"}>
        Weekly count of issues and pull requests from {start} to {end} relative
        to each category&apos;s (issue and pull request) count on the
        highlighted date.
      </Text>
      <br />
      <LinePlot data={data} />
    </>
  )
}
