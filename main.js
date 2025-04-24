import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import waffleGrid from "./waffle-grid.js";

d3.csv("data.csv").then((csv) => {
  const { dates, series } = processData(csv);

  const scrollContainer = d3.select(".scroll");
  const stickyContainer = scrollContainer.select(".sticky");
  const stepsContainer = scrollContainer.select(".steps");

  const stickPage = stickyContainer.append("div").attr("class", "page");
  stickPage.append("h2");
  waffleGrid({
    container: stickPage.append("div"),
    data: series,
  });

  // Set up scroll snap when step container enters in view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("step", entry.isIntersecting);
    });
  });

  dates.forEach((date, i) => {
    const step = stepsContainer.append("div").attr("class", "page");
    step.append("h2").text(date);

    waffleGrid({
      container: step.append("div"),
      data: series,
      index: i,
    });

    io.observe(step.node());
  });
});

function processData(csv) {
  const keys = csv.columns.slice(1);
  csv = [...csv].reverse();
  const dates = csv.map((d) => +d["Year"]);
  const series = keys.map((key) => ({
    key,
    values: csv.map((d) => (d[key] === "" ? 0 : parseInt(d[key]))),
  }));
  return {
    dates,
    series,
  };
}
