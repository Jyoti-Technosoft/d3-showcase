import * as d3 from "d3";
import { useContext, useEffect, useRef } from "react";
import { CustomContext } from "src/components/CustomContext";

import "./MultiLevelDonutChart.scss";

function MultiLevelDonutChart({
  chartId,
  cardwidth,
  tooltipShow,
  zoomOn,
  isModal,
}) {
  const eleRef = useRef();

  const { donutDataSet } = useContext(CustomContext);

  const dataset = donutDataSet;

  const dataset1 = dataset[0];
  const dataset2 = dataset[1];
  const dataset3 = dataset[2];

  const color1 = d3.schemeSet3;
  const color2 = d3.schemeSet2;
  const color3 = d3.schemeSet3;

  useEffect(() => {
    createChart();
    initZoom();
  }, []);

  function createChart() {
    const width = eleRef?.current?.offsetWidth;
    const height = eleRef?.current?.offsetWidth;
    const donutWidth = width / 7;
    const radius1 = width / 2;
    const radius2 = radius1 - donutWidth;
    const radius3 = radius2 - donutWidth;

    let svg;
    {
      zoomOn
        ? (svg = d3
            .selectAll(`#${chartId}`)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .call(
              d3?.zoom()?.on("zoom", function (e) {
                svg.attr("transform", e.transform);
              })
            )
            .append("g"))
        : (svg = d3
            .selectAll(`#${chartId}`)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .append("g"));
    }

    const svg1 = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    const svg2 = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    const svg3 = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const arc1 = d3
      .arc()
      .innerRadius(radius1 - donutWidth)
      .outerRadius(radius1);
    const arc2 = d3
      .arc()
      .innerRadius(radius2 - donutWidth)
      .outerRadius(radius2);
    const arc3 = d3
      .arc()
      .innerRadius(radius3 - donutWidth)
      .outerRadius(radius3);

    const pie = d3
      .pie()
      .value(function (d) {
        return d.count;
      })
      .sort(null);

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

    const createPath = (svg, dataset, className, arc, color) => {
      const slices = svg
        .selectAll("path")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", `${className}`)
        .append("path")
        .attr("d", arc)
        .attr("class", "arc")
        .attr("fill", function (d, i) {
          return color[i];
        })
        .style("cursor", "pointer");

      if (tooltipShow) {
        slices
          .on("mouseover", function (event, d) {
            tooltip
              .html(
                `City: ${d.data.place} <br> Population: ${d.data.count} M`
              )
              .style("opacity", 1);
          })
          .on("mousemove", function (event) {
            tooltip
              .style("left", event.offsetX + 10 + "px")
              .style("top", event.offsetY + 30 + "px");
          })
          .on("mouseleave", function () {
            tooltip.style("opacity", 0);
          });
      }
    };

    const addAnnotation = (className, arc) => {
      d3.selectAll(`.${className}`)
        .append("text")
        .text(function (d) {
          return `${d.data.place}`;
        })
        .attr("transform", function (d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .style("fill", "black")
        .style("pointer-events", "none");
    };

    createPath(svg1, dataset1, `arc1${chartId}`, arc1, color1);
    addAnnotation(`arc1${chartId}`, arc1);

    createPath(svg2, dataset2, `arc2${chartId}`, arc2, color2);
    addAnnotation(`arc2${chartId}`, arc2);

    createPath(svg3, dataset3, `arc3${chartId}`, arc3, color3);
    addAnnotation(`arc3${chartId}`, arc3);
  }

  let zoom = d3.zoom().on("zoom", handleZoom);

  function handleZoom(e) {
    d3.select("svg g").attr("transform", e.transform);
  }

  function initZoom() {
    d3.select("svg").call(zoom);
  }

  initZoom();

  return (
    <>
      <div
        id={`${chartId}`}
        className={`card ${isModal ? "multi-level-chart" : ""}`}
        ref={eleRef}
        style={{
          width: cardwidth,
          height: "fit-content",
          background: "transparent",
          border: "none",
        }}
      ></div>
    </>
  );
}

export default MultiLevelDonutChart;
