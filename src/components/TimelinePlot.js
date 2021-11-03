import React from "react"
import { Container, Text } from "@chakra-ui/react"
import useSWR from "swr"
import * as d3 from "d3"
import * as Plot from "@observablehq/plot"
import _ from "lodash"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

// Copied from https://observablehq.com/@mkfreeman/plot-tooltip
const hover = (tip, pos, text) => {
  const side_padding = 10
  const vertical_padding = 5
  const vertical_offset = 15

  // Empty it out
  tip.selectAll("*").remove()

  // Append the text
  tip
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("transform", `translate(${pos[0]}, ${pos[1] + 7})`)
    .selectAll("text")
    .data(text)
    .join("text")
    .style("dominant-baseline", "ideographic")
    .text((d) => d)
    .attr("y", (d, i) => (i - (text.length - 1)) * 15 - vertical_offset)
    .style("font-weight", (d, i) => (i === 0 ? "bold" : "normal"))

  const bbox = tip.node().getBBox()

  // Add a rectangle (as background)
  tip
    .append("rect")
    .attr("y", bbox.y - vertical_padding)
    .attr("x", bbox.x - side_padding)
    .attr("width", bbox.width + side_padding * 2)
    .attr("height", bbox.height + vertical_padding * 2)
    .style("fill", "white")
    .style("stroke", "#d3d3d3")
    .lower()
}

const id_generator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return "a" + S4() + S4()
}
const addTooltips = (chart, hover_styles = { fill: "blue", opacity: 0.5 }) => {
  let styles = hover_styles
  const line_styles = {
    stroke: "blue",
    "stroke-width": 3,
  }
  // Workaround if it's in a figure
  const type = d3.select(chart).node().tagName
  const wrapper =
    type === "FIGURE" ? d3.select(chart).select("svg") : d3.select(chart)

  wrapper.style("overflow", "visible") // to avoid clipping at the edges

  // Set pointer events to visibleStroke if the fill is none (e.g., if its a line)
  wrapper.selectAll("path").each(function (data, index, nodes) {
    // For line charts, set the pointer events to be visible stroke
    if (
      d3.select(this).attr("fill") === null ||
      d3.select(this).attr("fill") === "none"
    ) {
      d3.select(this).style("pointer-events", "visibleStroke")
      styles = _.isEqual(hover_styles, { fill: "blue", opacity: 0.5 })
        ? line_styles
        : hover_styles
    }
  })

  const tip = wrapper
    .selectAll(".hover-tip")
    .data([""])
    .join("g")
    .attr("class", "hover")
    .style("pointer-events", "none")
    .style("text-anchor", "middle")

  // Add a unique id to the chart for styling
  const id = id_generator()

  // Add the event listeners
  d3.select(chart)
    .classed(id, true) // using a class selector so that it doesn't overwrite the ID
    .selectAll("title")
    .each(function () {
      // Get the text out of the title, set it as an attribute on the parent, and remove it
      const title = d3.select(this) // title element that we want to remove
      const parent = d3.select(this.parentNode) // visual mark on the screen
      const t = title.text()
      if (t) {
        parent.attr("__title", t).classed("has-title", true)
        title.remove()
      }
      // Mouse events
      parent
        .on("mousemove", function (event) {
          const text = d3.select(this).attr("__title")
          const pointer = d3.pointer(event, wrapper.node())
          if (text) tip.call(hover, pointer, text.split("\n"))
          else tip.selectAll("*").remove()

          // Raise it
          d3.select(this).raise()
          // Keep within the parent horizontally
          const tipSize = tip.node().getBBox()
          if (pointer[0] + tipSize.x < 0)
            tip.attr(
              "transform",
              `translate(${tipSize.width / 2}, ${pointer[1] + 7})`
            )
          else if (pointer[0] + tipSize.width / 2 > wrapper.attr("width"))
            tip.attr(
              "transform",
              `translate(${wrapper.attr("width") - tipSize.width / 2}, ${
                pointer[1] + 7
              })`
            )
        })
        .on("mouseout", function (event) {
          tip.selectAll("*").remove()
          // Lower it!
          d3.select(this).lower()
        })
    })

  // Remove the tip if you tap on the wrapper (for mobile)
  wrapper.on("touchstart", () => tip.selectAll("*").remove())
  // Add styles
  const style_string = Object.keys(styles)
    .map((d) => {
      return `${d}:${styles[d]};`
    })
    .join("")

  // Figure out how to fix the runtime error:
  // Unhandled Runtime Error
  // TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
  // Define the styles
  // const style = `<style>
  //     .${id} .has-title {
  //      cursor: pointer;
  //      pointer-events: all;
  //     }
  //     .${id} .has-title:hover {
  //       ${style_string}
  //   }
  // </style>`
  // chart.appendChild(style)
  return chart
}

const TimelinePlot = ({ data, attr }) => {
  const ref = React.useRef(null)
  const width = 1152
  const height = 512

  React.useEffect(() => {
    const dateFormat = d3.timeFormat("%Y-%m-%d")
    const timeFormat = d3.timeFormat("%m/%d")
    const tip = (d) =>
      `${dateFormat(d.date)} (${Plot.formatWeekday()(d.date.getDay())}): ${
        d[attr]
      }`
    const movingAvg = Plot.line(
      data,
      Plot.windowY({ x: "date", y: attr, k: 28, shift: "trailing" })
    )
      .initialize()
      .channels.find(([x]) => x === "y")[1].value

    const plot = addTooltips(
      Plot.dot(data, {
        x: "date",
        y: attr,
        title: tip,
        fill: (d, i) => (d[attr] > movingAvg[i] + 5 ? 1 : 0), // adding 5 since we want to highlight points that are a least a bit *above* the moving average
      }).plot({
        y: {
          grid: false,
          // Figure out how to set the domain properly without breaking the plot
          // domain: [d3.min(data, (d) => d[attr]), d3.max(data, (d) => d[attr])],
        },
        x: {
          tickRotate: 45,
          tickFormat: (d) => timeFormat(d),
          label: "→ Time",
        },
        marks: [
          Plot.ruleX(data, {
            x: "date",
            y: attr,
            stroke: "#eee",
            strokeWidth: 2,
          }),
          Plot.line(
            data,
            Plot.windowY({
              x: "date",
              y: (d) => d[attr] + 5,
              k: 28,
              stroke: "lightgray",
              shift: "trailing",
            })
          ),
          Plot.ruleY([0]),
        ],
        marginLeft: 30,
        marginBottom: 100,
        marginRight: 50,
        width: width,
        height: height,
        color: {
          range: ["steelblue", "orange"],
        },
      })
    )

    if (ref.current) {
      if (ref.current.children[0]) {
        ref.current.children[0].remove()
      }
      ref.current.appendChild(plot)
    }
  }, [ref, data, attr])

  return <div ref={ref}></div>
}

export const TimelinePlotContainer = () => {
  const { data, error } = useSWR(
    "https://gist.githubusercontent.com/andersy005/4f62b7b0cbf943b158cb11068e80c7c8/raw/1370342e460c7c00980a47e1e6c60dd665080132/xarray-repo-daily-data.json",
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  data.map((item) => {
    item.date = new Date(item.time)
  })

  const start = d3.min(data, (d) => d.date).toDateString()
  const end = d3.max(data, (d) => d.date).toDateString()

  return (
    <>
      <Text fontSize={"md"} align={"center"}>
        This is a timeline of how many open issues and pull requests Xarray has
        on Github over time from {start} to {end}.
      </Text>
      <br />
      <br />
      <TimelinePlot data={data} attr={"open_pull_requests"} />
      <TimelinePlot data={data} attr={"open_issues"} />
    </>
  )
}
