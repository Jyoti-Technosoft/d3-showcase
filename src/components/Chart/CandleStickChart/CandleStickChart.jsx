import * as d3 from "d3";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { CustomContext } from "src/components/CustomContext";

const CandleStickChart = ({ chartId, parentWidth, parentHeight, borderSize, showlabels }) => {
  const chartDiv = useRef();
  const { candleDataSet, updateDataCandle } = useContext(CustomContext);

  const data = candleDataSet;

  useEffect(() => {
    createChart();
    initZoom();
    onresize();
  }, []);

  if (updateDataCandle) {
    d3.select(`#${chartId} svg`).remove();
    createChart(data);
  }

  function onresize() {
    window.addEventListener("resize", () => {
      const cardWidth = chartDiv?.current?.offsetWidth;
      const cardHeight = chartDiv?.current?.offsetHeight;
      updatedChart(cardWidth, cardHeight);
    });
  }

  function updatedChart(cardWidth, cardHeight) {
    const width = cardWidth - 70;
    const height = cardHeight - 50;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const updatedchart = d3
      .select(`#${chartId} svg`)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.2);

    const xAxis = d3.axisBottom(xScale).tickFormat((d) => {
      return d.split("-")[2];
    });

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
      .range([height, 0]);

    updatedchart
      .selectAll("rect")
      .attr("x", (d) => xScale(d.date))
      .attr("y", (d) => yScale(Math.max(d.open, d.close)))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => Math.abs(yScale(d.open) - yScale(d.close)));

    updatedchart
      .selectAll("line")
      .attr("x1", (d) => xScale(d.date) + xScale.bandwidth() / 2)
      .attr("y1", (d) => yScale(d.high))
      .attr("x2", (d) => xScale(d.date) + xScale.bandwidth() / 2)
      .attr("y2", (d) => yScale(d.low));

    updatedchart
      .selectAll("line")
      .attr("x1", (d) => {
        return xScale(d.date) + xScale.bandwidth() / 2;
      })
      .attr("y1", (d) => yScale(d.high))
      .attr("x2", (d) => {
        return xScale(d.date) + xScale.bandwidth() / 2;
      })
      .attr("y2", (d) => yScale(d.low));

    updatedchart
      .select(".x-axis-candle")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    updatedchart.select(".y-axis-candle").call(d3.axisLeft(yScale));
  }

  function createChart() {
    data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    const width = chartDiv?.current?.offsetWidth - 70;
    const height = chartDiv?.current?.offsetHeight - 50;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 + 5 };

    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top - (showlabels ? 10 : 0)})`);

    const xScale = d3
      .scaleBand()
      .domain(
        data.map((d) => {
          return d.date;
        })
      )
      .range([0, width])
      .padding(0.2);

    const xAxis = d3.axisBottom(xScale).tickFormat((d) => {
      return d.split("-")[2];
    });

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.date))
      .attr("y", (d) => yScale(Math.max(d.open, d.close)))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => Math.abs(yScale(d.open) - yScale(d.close)))
      .attr("fill", (d) => (d.open > d.close ? "red" : "green"));

    svg
      .selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", (d) => {
        return xScale(d.date) + xScale.bandwidth() / 2;
      })
      .attr("y1", (d) => yScale(d.high))
      .attr("x2", (d) => {
        return xScale(d.date) + xScale.bandwidth() / 2;
      })
      .attr("y2", (d) => yScale(d.low))
      .attr("stroke", (d) => (d.open > d.close ? "red" : "green"));

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .attr("class", "x-axis-candle")
      .call(xAxis);

    svg.append("g").attr("class", "y-axis-candle").call(d3.axisLeft(yScale));

    if(showlabels){
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 12)
      .style("text-anchor", "middle")
      .text("Date");
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Price");
    }
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
        className="card"
        id={chartId}
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
};

export default CandleStickChart;
