import { useContext, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
import { CustomContext } from "src/components/CustomContext";

import "./GroupChart.scss";

function GroupChart({ chartId, parentWidth, parentHeight, isModal, borderSize, tooltipShow, showLabels }) {
  const chartDiv = useRef();

  const { groupDataSet, updateDataGroup } = useContext(CustomContext);

  const dataArr = groupDataSet;

  const colorArr = [
    { fill: "#fc8d62", stroke: "#db450b" },
    { fill: "#66c2a5", stroke: "#089166" },
  ];

  useLayoutEffect(() => {
    createChart(dataArr);
    onresize();
  }, []);

  if (updateDataGroup) {
    d3.select(`#${chartId} svg`).remove();
    d3.select(`#${chartId} .tooltip`).remove();
    createChart(dataArr);
  }

  function onresize() {
    window.addEventListener("resize", function () {
      const cardWidth = chartDiv?.current?.offsetWidth;
      const cardHeight = chartDiv?.current?.offsetHeight;
      updatedChartFunction(cardWidth, cardHeight);
    });
  }

  function updatedChartFunction(cardWidth, cardHeight) {
    const margin = { top: 50, right: 20, bottom: 20, left: 30 },
      width = cardWidth - 50,
      height = cardHeight - 80;

    const xScale = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(
        dataArr.map(function (d) {
          return d.month;
        })
      ),
      yScale = d3
        .scaleLinear()
        .rangeRound([height, 0])
        .domain([
          0,
          d3.max(dataArr, function (d) {
            return Math.max(d.petrolprice, d.dieselprice);
          }),
        ]);

    const updatedchart = d3
      .selectAll(`#${chartId} svg`)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    updatedchart
      .selectAll("g rect")
      .attr("width", xScale.bandwidth())
      .attr("x", function (d) {
        return xScale(d.month);
      });

    const line1 = d3
      .line()
      .x(function (d) {
        return xScale(d.month) + xScale.bandwidth() / 2;
      })
      .y(function (d) {
        return yScale(d.petrolprice);
      })
      .curve(d3.curveMonotoneX);

    updatedchart.selectAll("g .line1").attr("d", line1(dataArr));

    const line2 = d3
      .line()
      .x(function (d, i) {
        return xScale(d.month) + xScale.bandwidth() / 2;
      })
      .y(function (d) {
        return yScale(d.dieselprice);
      })
      .curve(d3.curveMonotoneX);

    updatedchart.selectAll("g .line1").attr("d", line1(dataArr));

    updatedchart.selectAll("g .line2").attr("d", line2(dataArr));

    updatedchart
      .selectAll("g .axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    updatedchart.selectAll("g .axis--y").call(d3.axisLeft(yScale).ticks(8));

    updatedchart
      .selectAll(".bar1")
      .attr("x", function (d) {
        return xScale(d.month);
      })
      .attr("y", function (d) {
        return yScale(d.petrolprice);
      })
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", function (d) {
        return height - yScale(d.petrolprice);
      });

    updatedchart
      .selectAll(".bar2")
      .attr("x", function (d) {
        return xScale(d.month) + xScale.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return yScale(d.dieselprice);
      })
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", function (d) {
        return height - yScale(d.dieselprice);
      });

    updatedchart
      .select(".x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 12);
    updatedchart
      .select(".y-axis-label")
      .attr("x", -height / 2 - 20)
      .attr("y", margin.left - 10)
      .attr("transform", "rotate(-90)");

    d3.selectAll(`#${chartId} svg`)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    d3.selectAll(".label1").attr("transform", `translate(${width - 130},0)`);

    d3.selectAll(".color-box").attr("transform", `translate(${width - 130},0)`);

    d3.selectAll(".label2").attr("transform", `translate(${width - 130},0)`);

    d3.selectAll(".color-box2").attr(
      "transform",
      `translate(${width - 130},0)`
    );
  }

  function createChart(dataSet) {
    let cardHeight = chartDiv?.current?.offsetHeight;
    let cardWidth = chartDiv?.current?.offsetWidth;

    if (cardHeight && cardWidth) {
      const margin = { top: 50, right: 20, bottom: 20, left: 30 },
        width = cardWidth - 50,
        height = cardHeight - 80;

      const xScale = d3
        .scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .domain(
          dataSet.map(function (d) {
            return d.month;
          })
        ),
        yScale = d3
          .scaleLinear()
          .rangeRound([height, 0])
          .domain([
            0,
            d3.max(dataSet, function (d) {
              return Math.max(d.petrolprice, d.dieselprice);
            }),
          ]);

      const svg = d3
        .selectAll(`#${chartId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      const g = svg
        .append("g")
      if (showLabels) {
        g.attr("transform", "translate(" + (margin.left + 15) + "," + (margin.top - 20) + ")");
      } else {
        g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

      svg
        .append("text")
        .attr("transform", `translate(${width - 130},0)`)
        .attr("x", 50)
        .attr("y", 20)
        .attr("class", "label1")
        .attr("font-size", "12px")
        .text("Petrol");

      svg
        .append("rect")
        .attr("transform", `translate(${width - 130},0)`)
        .attr("x", 86)
        .attr("y", 8)
        .attr("class", "color-box")
        .attr("fill", colorArr[0].fill)
        .style("width", "15px")
        .style("height", "15px")
        .style("display", "inline-block")
        .style("cursor", "pointer");

      svg
        .append("text")
        .attr("transform", `translate(${width - 130},0)`)
        .attr("x", 110)
        .attr("y", 20)
        .attr("class", "label2")
        .attr("font-size", "12px")
        .text("Diesel");

      svg
        .append("rect")
        .attr("transform", `translate(${width - 130},0)`)
        .attr("x", 145)
        .attr("y", 8)
        .attr("class", "color-box2")
        .attr("fill", colorArr[1].fill)
        .style("width", "15px")
        .style("height", "15px")
        .style("display", "inline-block")
        .style("cursor", "pointer");

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(yScale).ticks(8));

      if (showLabels) {
        svg
          .append("text")
          .attr("class", "x-axis-label")
          .attr("x", width / 2 + 20)
          .attr("y", height + margin.top + 20)
          .style("text-anchor", "middle")
          .text("Months");

        svg
          .append("text")
          .attr("class", "y-axis-label")
          .attr("x", -height / 2 - 20)
          .attr("y", margin.left - 10)
          .attr("transform", "rotate(-90)")
          .style("text-anchor", "middle")
          .text("Price In USD");
      }

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

      const bar1 = g.selectAll("rect").data(dataSet).enter().append("g");

      const bar2 = g.selectAll("rect").data(dataSet).enter().append("g");

      bar1
        .append("rect")
        .attr("x", function (d) {
          return xScale(d.month);
        })
        .attr("y", function (d) {
          return yScale(d.petrolprice);
        })
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", function (d) {
          return height - yScale(d.petrolprice);
        })
        .attr("class", "bar1")
        .attr("fill", colorArr[0].fill)
        .style("cursor", "pointer");

      bar2
        .append("rect")
        .attr("x", function (d) {
          return xScale(d.month) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
          return yScale(d.dieselprice);
        })
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", function (d) {
          return height - yScale(d.dieselprice);
        })
        .attr("class", "bar2")
        .attr("fill", colorArr[1].fill)
        .style("cursor", "pointer");

      if (tooltipShow) {
        bar1
          .on("mouseover", function (event, d) {
            tooltip
              .html(
                `<b>${d.month}</b> <br> <span id="petrollegend"></span> Petrol: $${d.petrolprice} <br>`
              )
              .style("opacity", 1);
          })
          .on("mousemove", function (event) {
            tooltip
              .style("left", d3.pointer(event)[0] + 80 + "px")
              .style("top", d3.pointer(event)[1] + 20 + "px");
          })
          .on("mouseleave", function () {
            tooltip.style("opacity", 0);
          });

        bar2
          .on("mouseover", function (event, d) {
            tooltip
              .html(
                `<b>${d.month}</b> <br><span id="diesellegend"></span> Diesel: $${d.dieselprice}`
              )
              .style("opacity", 1);
          })
          .on("mousemove", function (event) {
            tooltip
              .style("left", d3.pointer(event)[0] + 80 + "px")
              .style("top", d3.pointer(event)[1] + 20 + "px");
          })
          .on("mouseleave", function () {
            tooltip.style("opacity", 0);
          });
      }

      const appendLine = (
        bar,
        lineclass,
        linedata,
        strokecolor,
        strokedashed
      ) => {
        bar
          .append("path")
          .attr("class", lineclass)
          .attr("d", linedata)
          .style("fill", "none")
          .style("stroke", `${strokecolor}`)
          .style("stroke-width", "1")
          .style("stroke-dasharray", `${strokedashed}`);
      };

      const line1 = d3
        .line()
        .x(function (d) {
          return xScale(d.month) + xScale.bandwidth() / 2;
        })
        .y(function (d) {
          return yScale(d.petrolprice);
        })
        .curve(d3.curveMonotoneX);

      const line2 = d3
        .line()
        .x(function (d) {
          return xScale(d.month) + xScale.bandwidth() / 2;
        })
        .y(function (d) {
          return yScale(d.dieselprice);
        })
        .curve(d3.curveMonotoneX);

      appendLine(bar1, "line1", line1(dataSet), colorArr[0].stroke, "10,10");
      appendLine(bar2, "line2", line2(dataSet), colorArr[1].stroke, "0,0");
    }
  }

  return (
    <>
      {
        isModal ?
          <h5 className="text-center">Petrol v/s Diesel (In $USD)</h5>
          : null
      }
      <div
        className={`card ${isModal ? 'my-d3-chart' : ''}`}
        id={`${chartId}`}
        ref={chartDiv}
        data-testid="test-chart"
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

export default GroupChart;
