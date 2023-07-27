import { useContext, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";

import { CustomContext } from "src/components/CustomContext";
import "./StackedChart.scss";

function StackedChart({ chartId, parentWidth, parentHeight, tooltipShow }) {
  const chartDiv = useRef();

  const { stackedObj, updateDataStacked } = useContext(CustomContext);

  const dataset = stackedObj;

  const janTotal =
    parseInt(dataset[0]?.US) +
    parseInt(dataset[0]?.Europe) +
    parseInt(dataset[0]?.Asia) +
    parseInt(dataset[0]?.SouthAmerica);

  const febTotal =
    parseInt(dataset[1]?.US) +
    parseInt(dataset[1]?.Europe) +
    parseInt(dataset[1]?.Asia) +
    parseInt(dataset[1]?.SouthAmerica);

  const marTotal =
    parseInt(dataset[2]?.US) +
    parseInt(dataset[2]?.Europe) +
    parseInt(dataset[2]?.Asia) +
    parseInt(dataset[2]?.SouthAmerica);

  const aprTotal =
    parseInt(dataset[3]?.US) +
    parseInt(dataset[3]?.Europe) +
    parseInt(dataset[3]?.Asia) +
    parseInt(dataset[3]?.SouthAmerica);

  const mayTotal =
    parseInt(dataset[4]?.US) +
    parseInt(dataset[4]?.Europe) +
    parseInt(dataset[4]?.Asia) +
    parseInt(dataset[4]?.SouthAmerica);

  const juneTotal =
    parseInt(dataset[5]?.US) +
    parseInt(dataset[5]?.Europe) +
    parseInt(dataset[5]?.Asia) +
    parseInt(dataset[5]?.SouthAmerica);

  const julyTotal =
    parseInt(dataset[6]?.US) +
    parseInt(dataset[6]?.Europe) +
    parseInt(dataset[6]?.Asia) +
    parseInt(dataset[6]?.SouthAmerica);

  const augTotal =
    parseInt(dataset[7]?.US) +
    parseInt(dataset[7]?.Europe) +
    parseInt(dataset[7]?.Asia) +
    parseInt(dataset[7]?.SouthAmerica);

  const sepTotal =
    parseInt(dataset[8]?.US) +
    parseInt(dataset[8]?.Europe) +
    parseInt(dataset[8]?.Asia) +
    parseInt(dataset[8]?.SouthAmerica);

  const octTotal =
    parseInt(dataset[9]?.US) +
    parseInt(dataset[9]?.Europe) +
    parseInt(dataset[9]?.Asia) +
    parseInt(dataset[9]?.SouthAmerica);

  const novTotal =
    parseInt(dataset[10]?.US) +
    parseInt(dataset[10]?.Europe) +
    parseInt(dataset[10]?.Asia) +
    parseInt(dataset[10]?.SouthAmerica);

  const decTotal =
    parseInt(dataset[11]?.US) +
    parseInt(dataset[11]?.Europe) +
    parseInt(dataset[11]?.Asia) +
    parseInt(dataset[11]?.SouthAmerica);

  useLayoutEffect(() => {
    createChart();
    onresize();
  }, []);

  if (updateDataStacked) {
    d3.select(`#${chartId} svg`).remove();
    createChart();
  }

  function onresize() {
    window.addEventListener("resize", function (event) {
      const cardWidth = chartDiv?.current?.offsetWidth;
      const cardHeight = chartDiv?.current?.offsetHeight;

      updatedChartFunction(cardWidth, cardHeight);
    });
  }

  function updatedChartFunction(cardWidth, cardHeight) {
    if (cardHeight && cardWidth) {
      const margin = { top: 30, right: 50, bottom: 50, left: 50 },
        width = cardWidth - margin.left - margin.right,
        height = cardHeight - margin.top - margin.bottom;

      const updatedChart = d3
        .select(`#${chartId} svg`)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      const groups = dataset.map((val) => {
        return val.Month;
      });

      const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.05]);

      const y = d3
        .scaleLinear()
        .domain([0, Math.max(janTotal, febTotal, marTotal, aprTotal, mayTotal, juneTotal, julyTotal, augTotal, sepTotal, octTotal, novTotal, decTotal)])
        .range([height, 0]);

      updatedChart
        .selectAll(".bars")
        .attr("width", x.bandwidth())
        .attr("x", (d) => x(d.data.Month));

      updatedChart
        .selectAll(".x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      updatedChart.select(".y-axis").call(d3.axisLeft(y).ticks(8));

      updatedChart
        .selectAll(".stackedbars")
        .attr("x", (d) => x(d.data.Month))
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth());

      updatedChart
        .select(".legend")
        .attr("transform", `translate(0,${height + margin.bottom})`);
    }
  }

  function createChart() {
    const cardWidth = chartDiv?.current?.offsetWidth;
    const cardHeight = chartDiv?.current?.offsetHeight;

    const margin = { top: 30, right: 20, bottom: 50, left: 50 },
      width = cardWidth - margin.left - margin.right,
      height = cardHeight - margin.top - margin.bottom;

    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top - 15})`);

    const subgroups = ["US", "Europe", "Asia", "SouthAmerica"];

    const groups = dataset.map((val) => {
      return val.Month;
    });

    const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.05]);
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    const y = d3
      .scaleLinear()
      .domain([0, Math.max(janTotal, febTotal, marTotal, aprTotal, mayTotal, juneTotal, julyTotal, augTotal, sepTotal, octTotal, novTotal, decTotal)])
      .range([height, 0]);
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y).ticks(8));

    const color = d3.scaleOrdinal(d3.schemeSet2);

    const stackedData = d3.stack().keys(subgroups)(dataset);

    const tooltip = d3
      .select(`#${chartId}`)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("position", "absolute")
      .style("border", "0")
      .style("box-shadow", "rgba(0, 0, 0, 0.24) 0px 3px 8px")
      .style("width", "max-content");

    let bar = svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.Month))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("stroke", "none")
      .attr("class", "stackedbars")
      .style("cursor", "pointer");

    if (tooltipShow) {
      bar
        .on("mouseover", function (event, d) {
          tooltip
            .html(
              `<b>${d.data.Month}</b> <br> <span id="uslegend"></span> US: ${d.data.US} <br> <span id="europelegend"></span> Europe: ${d.data.Europe} <br> <span id="asialegend"></span> Asia: ${d.data.Asia} <br> <span id="southamericalegend"></span> South America: ${d.data.SouthAmerica}`
            )
            .style("opacity", 1);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", d3.pointer(event)[0] + 70 + "px")
            .style("top", d3.pointer(event)[1] + 20 + "px");
        })
        .on("mouseleave", function () {
          tooltip.style("opacity", 0);
        });
    }

    var legend = d3
      .select(`#${chartId} svg`)
      .append("g")
      .attr("transform", `translate(0,${height + margin.bottom})`)
      .attr("class", "legend");

    legend
      .append("rect")
      .attr("x", width - 240)
      .attr("width", 14)
      .attr("height", 14)
      .style("fill", "#66c2a5");

    legend
      .append("text")
      .attr("x", width - 220)
      .attr("y", 6)
      .attr("dy", ".35em")
      .text("US")
      .style("font-size", "13px");

    legend
      .append("rect")
      .attr("x", width - 190)
      .attr("width", 14)
      .attr("height", 14)
      .style("fill", "#fc8d62");

    legend
      .append("text")
      .attr("x", width - 170)
      .attr("y", 6)
      .attr("dy", ".35em")
      .text("Europe")
      .style("font-size", "13px");

    legend
      .append("rect")
      .attr("x", width - 120)
      .attr("width", 14)
      .attr("height", 14)
      .style("fill", "#8da0cb");

    legend
      .append("text")
      .attr("x", width - 100)
      .attr("y", 6)
      .attr("dy", ".35em")
      .text("Asia")
      .style("font-size", "13px");

    legend
      .append("rect")
      .attr("x", width - 70)
      .attr("width", 14)
      .attr("height", 14)
      .style("fill", "#e78ac3");

    legend
      .append("text")
      .attr("x", width - 50)
      .attr("y", 6)
      .attr("dy", ".35em")
      .text("South America")
      .style("font-size", "13px");
  }

  return (
    <>
      <div
        id={chartId}
        className="card"
        ref={chartDiv}
        style={{
          width: parentWidth,
          height: parentHeight,
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      ></div>
    </>
  );
}

export default StackedChart;
