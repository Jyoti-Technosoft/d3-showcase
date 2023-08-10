import { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { CustomContext } from "src/components/CustomContext";
import "./PieChart.scss";

function PieChart({
  chartId,
  parentWidth,
  parentHeight,
  tooltipShow,
  isModal,
  onClickOpenInside,
}) {
  const { updateDataPie, pieDataSet } = useContext(CustomContext);

  const pieEle = useRef();

  useEffect(() => {
    createPieChart(pieDataSet);
  }, [null]);

  if (updateDataPie) {
    d3.select(`#${chartId} svg`).remove();
    d3.select(`#${chartId} .tooltip`).remove();
    createPieChart(pieDataSet);
  }

  function createLayer2(data) {
    d3.select(`#${chartId} svg`).remove();
    d3.select(`#${chartId} .tooltip`).remove();

    createInsidePieChart(
      [{ id: data.id, scountry: data.country, value: data.value }],
      data.subState
    );
  }

  function backToLayer1() {
    d3.select(`#${chartId} svg`).remove();
    d3.select(`#${chartId} .tooltip`).remove();
    createPieChart(pieDataSet)
  }

  function createPieChart(chartData) {
    const data = chartData;

    const margin = 40,
      height = pieEle?.current?.offsetHeight,
      width = pieEle?.current?.offsetWidth;

    const radius = Math.max(width / 2, height / 2) - margin;

    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .range(["#2da1f9", "#30e8aa", "#febf44", "#fc657b", "#8e78d6"]);

    const colorScale = d3.scaleOrdinal(d3.schemeSet2);

    const pie = d3.pie().value(function (d) {
      return parseInt(d.value);
    });
    const data_ready = pie(data);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

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

    const slices = svg
      .selectAll("mySlices")
      .data(data_ready)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", function (d) {
        return colorScale(d.data.country);
      })
      .style("cursor", "pointer")
      .attr("class", "slices")
      .attr("id", function (d, i) {
        return i + 1;
      });

    if (onClickOpenInside) {
      slices.on("click", function (event, d) {
        createLayer2(d.data);
      });
    }

    if (tooltipShow) {
      slices
        .on("mouseover", function (event, d) {
          tooltip
            .html(`Country: ${d.data.country} <br> Population: ${d.data.value} M`)
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

    svg
      .selectAll("mySlices")
      .data(data_ready)
      .join("text")
      .text(function (d) {
        return d.data.country;
      })
      .style("pointer-events", "none")
      .attr("class", "slice-text")
      .attr("transform", function (d) {
        return `translate(${arcGenerator.centroid(d)})`;
      })
      .style("text-anchor", "middle")
      .style("font-size", 12);
  }

  function createInsidePieChart(data2, data1) {
    const height = pieEle?.current?.offsetHeight,
      width = pieEle?.current?.offsetWidth;

    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeSet2);

    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - 50);

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

    const arcs = svg
      .selectAll(".arc")
      .data(pie(data1))
      .enter()
      .append("g")
      .attr("class", "arc")
      .style("cursor", "pointer");

    const slice1 = arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    if (tooltipShow) {
      slice1
        .on("mouseover", function (event, d) {
          tooltip
            .html(`States: ${d.data.country} <br> Population: ${d.data.value} M`)
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

    arcs
      .append("text")
      .attr("transform", function (d) {
        return `translate(${arc.centroid(d)})`;
      })
      .text((d) => d.data.country)
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .style("font-size", 12);

    const innerRadius = radius - 50;
    const arc2 = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + 30);

    const arcs2 = svg
      .selectAll(".arc2")
      .data(pie(data2))
      .enter()
      .append("g")
      .attr("class", "arc2");

    arcs2
      .append("path")
      .attr("d", arc2)
      .attr("fill", (d, i) => color(i + 5));

    arcs2
      .append("text")
      .attr("transform", function (d) {
        return `translate(${arc2.centroid(d)})`;
      })
      .text((d) => d.data.scountry)
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .style("font-size", 12);

    arcs2.on("click", function () {
      backToLayer1();
    });
  }

  return (
    <>
      <div
        id={`${chartId}`}
        className={`card ${isModal ? "pieChart" : ""}`}
        ref={pieEle}
        style={{
          width: parentWidth,
          height: parentHeight,
          background: "transparent",
          border: "none",
        }}
      ></div>
    </>
  );
}

export default PieChart;
