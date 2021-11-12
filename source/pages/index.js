import {
  Features,
  HeroBanner,
  Ecosystem,
  Sponsors,
  Donate,
} from "../source/components"

export default function IndexPage() {
  return (
    <>
      <HeroBanner />
      <Features />
      <Ecosystem />
      <Sponsors />
      <Donate />
    </>
  )
}
