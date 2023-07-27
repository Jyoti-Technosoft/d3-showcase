import { useEffect } from "react";
import * as d3 from "d3";

function IndiaMapChart({ chartId, toolTipShow, parentWidth, parentHeight, isModal }) {

  useEffect(() => {
    createChart();
  }, []);

  function createChart() {
    const width = parentWidth;
    const height = parentHeight;
    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);

    const india = svg.append("g").attr("id", "india");

    d3.json("./assets/states.json").then(function (json) {
      const colorScale = d3
        .scaleQuantile()
        .domain(json.features.map((d) => d.total))
        .range(d3.schemeOranges[9]);

      const projection = d3.geoMercator().fitSize([width, height], json);
      const path = d3.geoPath(projection);

      const tooltip = d3
        .select(`#${chartId}`)
        .append("rect")
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

      const states = india
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", (d) => colorScale(d.total))
        .style("stroke", "#101010")
        .style("stroke-width", 0.6)
        .style("opacity", 0.7)
        .style("cursor", "pointer");

      if (toolTipShow) {
        states
          .on("mouseover", function (event, d) {
            tooltip
              .html(`State: ${d.id} <br> Population: ${d.total} M`)
              .style("opacity", 1);
          })
          .on("mousemove", function (event) {
            tooltip
              .style("left", event.x + "px")
              .style("top", event.y - 130 + "px");
          })
          .on("mouseleave", function () {
            tooltip.style("opacity", 0);
          });
      }
    });

    if (isModal) {
      const legendData = [0.5, 5, 10, 20, 40, 80, 160, 200, 250];

      const colorScale = d3
        .scaleQuantile()
        .domain(legendData)
        .range(d3.schemeOranges[9]);

      const legend = svg
        .append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${width - 130}, ${height - 150})`);

      const legendItem = legend
        .selectAll("g")
        .data(colorScale.range())
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(0, ${i * 17})`);

      legendItem
        .append("rect")
        .attr("x", 50)
        .attr("width", 13)
        .attr("height", 13)
        .style("fill", (d) => d);

      legendItem
        .append("line")
        .attr("x1", 70)
        .attr("y1", 7.5)
        .attr("x2", 75)
        .attr("y2", 7.5)
        .style("stroke", "black")
        .style("stroke-width", 1);

      legendItem
        .append("text")
        .attr("x", 80)
        .attr("y", 12)
        .text((d, i) => {
          return `${legendData[i]} M`;
        })
        .style("font-size", "12px");
    }
  }

  return (
    <>
      <div
        className="india-map-div"
        id={chartId}
        style={{ width: `${parentWidth}`, height: `${parentHeight}` }}
      ></div>
    </>
  );
}

export default IndiaMapChart;
