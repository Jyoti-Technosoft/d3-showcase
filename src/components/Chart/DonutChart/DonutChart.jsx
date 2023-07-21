import { useEffect, useRef } from "react";
import * as d3 from "d3";

function DonutChart({ chartId }) {
  const eleRef = useRef();

  var dataset1 = [
    { count: 50, place: "Surat" },
    { count: 20, place: "Vadodara" },
    { count: 30, place: "Valsad" },
    { count: 40, place: "Ahmedabad" },
    { count: 12, place: "Bharuch" },
  ];

  var dataset2 = [
    { count: 25, place: "Lucknow" },
    { count: 15, place: "Varanasi" },
    { count: 25, place: "Nodai" },
    { count: 15, place: "Ayodhya" },
    { count: 45, place: "Prayagraj" },
  ];

  var dataset3 = [
    { count: 15, place: "Delhi" },
    { count: 25, place: "Mumbai" },
    { count: 10, place: "Kolkata" },
    { count: 35, place: "Chennai" },
    { count: 15, place: "Pune" },
  ];

  useEffect(() => {
    createChart();
  });

  let zoom = d3.zoom().on("zoom", handleZoom);

  function handleZoom(e) {
    d3.select("svg g").attr("transform", e.transform);
  }

  function initZoom() {
    d3.select("svg").call(zoom);
  }

  function createChart() {
    var width = eleRef?.current?.offsetWidth;
    var height = eleRef?.current?.offsetWidth;
    var donutWidth = width / 7;
    var radius1 = width / 2;
    var radius2 = radius1 - donutWidth;
    var radius3 = radius2 - donutWidth;

    var svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g");
    var svg1 = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var svg2 = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var svg3 = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var arc1 = d3
      .arc()
      .innerRadius(radius1 - donutWidth)
      .outerRadius(radius1);
    var arc2 = d3
      .arc()
      .innerRadius(radius2 - donutWidth)
      .outerRadius(radius2);
    var arc3 = d3
      .arc()
      .innerRadius(radius3 - donutWidth)
      .outerRadius(radius3);

    var pie = d3
      .pie()
      .value(function (d) {
        return d.count;
      })
      .sort(null);

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
      .style("width", "max-content")
      .style("position", "absolute");

    svg1
      .selectAll("path")
      .data(pie(dataset1))
      .enter()
      .append("g")
      .attr("class", "arc1")
      .append("path")
      .attr("d", arc1)
      .attr("class", "arc")
      .attr("fill", function (d, i) {
        return d3.schemeSet2[i];
      })
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        tooltip
          .html(`City: ${d.data.place} <br> No. of Hospital: ${d.data.count}`)
          .style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        tooltip
          .style("left", event.offsetX + 10 + "px")
          .style("top", event.offsetY + 30 + "px");
      })
      .on("mouseleave", function (event, d) {
        tooltip.style("opacity", 0);
      });

    d3.selectAll(".arc1")
      .append("text")
      .text(function (d) {
        return `${d.data.place}`;
      })
      .attr("transform", function (d) {
        return "translate(" + arc1.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("fill", "black")
      .style("pointer-events", "none");

    svg2
      .selectAll("path")
      .data(pie(dataset2))
      .enter()
      .append("g")
      .attr("class", "arc2")
      .append("path")
      .attr("d", arc2)
      .attr("class", "arc")
      .attr("fill", function (d, i) {
        return d3.schemeSet1[i];
      })
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        tooltip
          .html(`City: ${d.data.place} <br> No. of Hospital: ${d.data.count}`)
          .style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        tooltip
          .style("left", event.offsetX + 10 + "px")
          .style("top", event.offsetY + 30 + "px");
      })
      .on("mouseleave", function (event, d) {
        tooltip.style("opacity", 0);
      });

    d3.selectAll(".arc2")
      .append("text")
      .text(function (d) {
        return `${d.data.place}`;
      })
      .attr("transform", function (d) {
        return "translate(" + arc2.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("fill", "black")
      .style("pointer-events", "none");

    svg3
      .selectAll("path")
      .data(pie(dataset3))
      .enter()
      .append("g")
      .attr("class", "arc3")
      .append("path")
      .attr("d", arc3)
      .attr("class", "arc")
      .attr("fill", function (d, i) {
        return d3.schemeSet3[i];
      })
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        tooltip
          .html(`City: ${d.data.place} <br> No. of Hospital: ${d.data.count}`)
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

    d3.selectAll(".arc3")
      .append("text")
      .text(function (d) {
        return `${d.data.place}`;
      })
      .attr("transform", function (d) {
        return "translate(" + arc3.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("fill", "black")
      .style("pointer-events", "none");
  }

  return (
    <>
      <div
        id={`${chartId}`}
        className="card"
        ref={eleRef}
        style={{
          width: "300px",
          height: "fit-content",
          background: "transparent",
          border: "none",
        }}
      ></div>
    </>
  );
}

export default DonutChart;
