import { useContext, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";

import { CustomContext } from "src/components/CustomContext";
import "./StackedChart.scss";

function StackedChart({ chartId, parentWidth, parentHeight, isModal, tooltipShow, borderSize, showLegend, showLables }) {
  const chartDiv = useRef();

  const { stackedObj, updateDataStacked } = useContext(CustomContext);

  const dataset = stackedObj;

  useLayoutEffect(() => {
    createChart();
    onresize();
  }, []);

  if (updateDataStacked) {
    d3.select(`#${chartId} svg`).remove();
    d3.select(`#${chartId} .tooltip`).remove();
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
        .domain([0, 70000])
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

      updatedChart
        .select(".x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10);

      updatedChart
        .select(".y-axis-label")
        .attr("x", -height / 2)
        .attr("y", -margin.left)
        .attr("transform", "rotate(-90)");
    }
  }

  function createChart() {
    const cardWidth = chartDiv?.current?.offsetWidth;
    const cardHeight = chartDiv?.current?.offsetHeight;

    const margin = { top: 30, right: 20, bottom: 50, left: showLables ? 75 : 50 },
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
      .domain([0, 70000])
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

    if (showLables) {
      svg
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 13)
        .style("text-anchor", "middle")
        .text("Months");

      svg
        .append("text")
        .attr("class", "y-axis-label")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("In Barrels");
    }

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
            .style("left", d3.pointer(event)[0] + 100 + "px")
            .style("top", d3.pointer(event)[1] + 20 + "px");
        })
        .on("mouseleave", function () {
          tooltip.style("opacity", 0);
        });
    }

    if (showLegend) {

      var legend = d3
        .select(`#${chartId} svg`)
        .append("g")
        .attr("class", "legend")

      {
        isModal ?
          legend.attr("transform", `translate(40,${height + margin.bottom})`)
          :
          legend.attr("transform", `translate(0,${height + margin.bottom})`)
      }

      legend
        .append("rect")
        .attr("x", width - 240)
        .attr("y", 8)
        .attr("width", 14)
        .attr("height", 14)
        .style("fill", "#66c2a5");

      legend
        .append("text")
        .attr("x", width - 220)
        .attr("y", 16)
        .attr("dy", ".35em")
        .text("US")
        .style("font-size", "13px");

      legend
        .append("rect")
        .attr("x", width - 190)
        .attr("y", 8)
        .attr("width", 14)
        .attr("height", 14)
        .style("fill", "#fc8d62");

      legend
        .append("text")
        .attr("x", width - 170)
        .attr("y", 16)
        .attr("dy", ".35em")
        .text("Europe")
        .style("font-size", "13px");

      legend
        .append("rect")
        .attr("x", width - 120)
        .attr("y", 8)
        .attr("width", 14)
        .attr("height", 14)
        .style("fill", "#8da0cb");

      legend
        .append("text")
        .attr("x", width - 100)
        .attr("y", 16)
        .attr("dy", ".35em")
        .text("Asia")
        .style("font-size", "13px");

      legend
        .append("rect")
        .attr("x", width - 70)
        .attr("y", 8)
        .attr("width", 14)
        .attr("height", 14)
        .style("fill", "#e78ac3");

      legend
        .append("text")
        .attr("x", width - 50)
        .attr("y", 16)
        .attr("dy", ".35em")
        .text("South America")
        .style("font-size", "13px");

    }
  }

  return (
    <>
      {
        isModal ?
          <h5 className="text-center">Oil Consumption By Country (In Barrels)</h5>
          : null
      }
      <div
        id={chartId}
        className={`card ${isModal ? 'my-d3-chart' : ''}`}
        ref={chartDiv}
        style={{
          width: parentWidth,
          height: parentHeight,
          border: borderSize,
          background: 'transparent'
        }}
      ></div>
    </>
  );
}

export default StackedChart;
