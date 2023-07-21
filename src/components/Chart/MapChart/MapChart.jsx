import { useEffect } from "react";
import * as d3 from "d3";

import "./MapChart.scss";

function MapChart({ chartId, toolTipShow, parentWidth }) {
  useEffect(() => {
    createChart();
  }, []);

  async function createChart() {
    const width = 900;
    const height = 600;
    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

    const projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale([1000]);

    const path = d3.geoPath().projection(projection);
    const data = await d3.json(
      "https://gist.githubusercontent.com/Bradleykingz/3aa5206b6819a3c38b5d73cb814ed470/raw/a476b9098ba0244718b496697c5b350460d32f99/us-states.json"
    );

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

    const colorScale = d3.scaleOrdinal(d3.schemeSet2);

    svg
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("g")
      .attr("class", "group")
      .append("path")
      .attr("fill", function (d, i) {
        return colorScale(i);
      })
      .attr("d", path);

    if (toolTipShow) {
      d3.selectAll(".group")
        .on("mouseover", function (event, d) {
          tooltip.html(`State: ${d.properties.name}`).style("opacity", 1);
        })

        .on("mousemove", function (event) {
          tooltip
            .style("left", event.x - 50 + "px")
            .style("top", event.y - 50 + "px");
        })
        .on("mouseleave", function () {
          tooltip.style("opacity", 0);
        });
    }
  }

  return (
    <>
      <div
        className="myMap"
        id={`${chartId}`}
        style={{ width: parentWidth }}
      ></div>
    </>
  );
}

export default MapChart;
