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
  const { updateDataPie } = useContext(CustomContext);

  const pieEle = useRef();

  const pieDataSet = [
    {
      id: "1",
      country: "US",
      value: "332.0",
      subState: [
        { id: "1", state: "California", value: "39.5" },
        { id: "2", state: "Texas", value: "29.1" },
        { id: "3", state: "Florida", value: "21.5" },
        { id: "4", state: "New York", value: "20.2" },
        { id: "5", state: "Ohio", value: "11.7" },
      ],
    },
    {
      id: "2",
      country: "China",
      value: "1425.7",
      subState: [
        { id: "1", state: "Guangdong", value: "115" },
        { id: "2", state: "Shandong", value: "110" },
        { id: "3", state: "Henan", value: "95" },
        { id: "4", state: "Sichuan", value: "83" },
        { id: "5", state: "Jiangsu", value: "80" },
      ],
    },
    {
      id: "3",
      country: "Indonesia",
      value: "273.8",
      subState: [
        { id: "1", state: "Jawa Barat", value: "48" },
        { id: "2", state: "Jawa Timur", value: "40" },
        { id: "3", state: "Jawa Tengah", value: "34" },
        { id: "4", state: "Sumatera", value: "14" },
        { id: "5", state: "Banten", value: "12" },
      ],
    },
    {
      id: "4",
      country: "Brazil",
      value: "213.4",
      subState: [
        { id: "1", state: "São Paulo", value: "46" },
        { id: "2", state: "Minas Gerais", value: "21" },
        { id: "3", state: "Rio de Janeiro", value: "17" },
        { id: "4", state: "Bahia", value: "15" },
        { id: "5", state: "Paraná", value: "11" },
      ],
    },
    {
      id: "5",
      country: "India",
      value: "1425.8",
      subState: [
        { id: "1", state: "Gujarat", value: "63" },
        { id: "2", state: "Rajasthan", value: "78" },
        { id: "3", state: "Uttar Pradesh", value: "230" },
        { id: "4", state: "Tamil Nadu", value: "78" },
        { id: "5", state: "Maharastra", value: "120" },
      ],
    },
  ];

  useEffect(() => {
    createPieChart(pieDataSet);
  }, [null]);

  if (updateDataPie) {
    d3.select(`#${chartId} svg`).remove();
    createPieChart(pieDataSet);
  }

  function myFunc(country) {
    d3.select(`#${chartId} svg`).remove();
    d3.select(`#${chartId} .tooltip`).remove();

    switch (country) {
      case "US":
        createInsidePieChart(
          [{ id: "1", scountry: "US", value: "25" }],
          pieDataSet[0].subState
        );
        break;
      case "China":
        createInsidePieChart(
          [{ id: "1", scountry: "China", value: "25" }],
          pieDataSet[1].subState
        );
        break;
      case "Indonesia":
        createInsidePieChart(
          [{ id: "1", scountry: "Indonesia", value: "25" }],
          pieDataSet[2].subState
        );
        break;
      case "Brazil":
        createInsidePieChart(
          [{ id: "1", scountry: "Brazil", value: "25" }],
          pieDataSet[3].subState
        );
        break;
      case "India":
        createInsidePieChart(
          [{ id: "1", scountry: "India", value: "25" }],
          pieDataSet[4].subState
        );
        break;
      default:
        createPieChart(pieDataSet);
    }
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
      .attr("transform", `translate(${width / 2}, ${height / 2 - 10})`);

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
        myFunc(d.data.country);
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
            .html(`States: ${d.data.state} <br> Population: ${d.data.value} M`)
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
      .text((d) => d.data.state)
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

    arcs2.on("click", function (event, d) {
      myFunc(d.data.country);
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
