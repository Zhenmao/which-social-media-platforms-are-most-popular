import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function waffleGrid({ container, data, index }) {
  const waffle = container
    .classed("waffle-grid", true)
    .selectChildren()
    .data(data)
    .join("div")
    .attr("class", "waffle");

  const header = waffle.append("div").attr("class", "waffle__header");

  const body = waffle
    .append("div")
    .attr("class", "waffle__body")
    .attr("dir", "rtl");

  if (index === undefined) {
    header
      .append("svg")
      .attr("class", "waffle__header__icon")
      .append("use")
      .attr("href", (d) => `#${d.key.toLowerCase()}`);

    body
      .classed("waffle__body--base", true)
      .selectChildren()
      .data(d3.range(100))
      .join("div")
      .attr("class", "waffle__cell waffle__cell--filled");
  } else {
    header
      .append("div")
      .attr("class", "waffle__header__value")
      .text((d) => d.values[index] + "%");

    body
      .selectChildren()
      .data((d) => {
        const v = d.values[index];
        return [...Array(100 - v).fill(false), ...Array(v).fill(true)];
      })
      .join("div")
      .attr("class", "waffle__cell")
      .classed("waffle__cell--filled", (d) => d);
  }
}
