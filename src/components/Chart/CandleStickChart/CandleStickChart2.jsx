import * as d3 from "d3";
import { useContext, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { CustomContext } from "src/components/CustomContext";
import { zoom } from "d3-zoom";

import "./CandleStickChart.scss";

const CandleStickChart2 = ({
    chartId,
    parentWidth,
    isModal,
    parentHeight,
    borderSize,
    showlabels,
    tooltipShow,
}) => {
    const chartDiv = useRef();
    const { candleDataSet, updateDataCandle, newCandle } = useContext(CustomContext);

    function getFirstAndLastDates(dataArray) {
        const firstDate = dataArray[0].date;
        const lastDate = dataArray[dataArray.length - 1].date;
        return { firstDate, lastDate };
    }

    function parseAndFormatDate(dateString) {
        const originalDate = new Date(dateString);
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');
        return `${day}`;
      }

    const data = newCandle;
    
    useEffect(() => {
        createChart(newCandle);
        onresize();
    }, []);

    if (updateDataCandle) {
        d3.select(`#${chartId} svg`).remove();
        d3.select(`#${chartId} .tooltip`).remove();
        createChart();
    }

    function onresize() {
        window.addEventListener("resize", () => {
            const cardWidth = chartDiv?.current?.offsetWidth;
            const cardHeight = chartDiv?.current?.offsetHeight;
            updatedChart(cardWidth, cardHeight, newCandle);
        });
    }

    function updatedChart(cardWidth, cardHeight) {
        const width = cardWidth - 70;
        const height = cardHeight - 50;
        const margin = { top: 20, right: 30, bottom: 50, left: 40 + 5 };

        var nonWeekendData = [];
        if (data) {
            nonWeekendData = data?.filter(d => d?.date?.getDay() !== 0 && d?.date?.getDay() !== 6);
        }

        d3.selectAll(`#${chartId} svg`)
            .attr("width", width)
            .attr("height", height)

        const xScale = d3
            .scaleTime()
            .domain(d3.extent(nonWeekendData, d => d?.date))
            .range([margin.left, width - margin.right]);

        const yScale = d3
            .scaleLinear()
            .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        d3.select(`.x-axis`)
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        d3.select(`.y-axis`)
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        // candlewidth
        (xScale(data[1].date) - xScale(data[0].date)) * 0.8;

        d3.select('#chart-area rect')
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom);

        d3.selectAll('.candlestick')
            .attr("transform", (d) => `translate(${xScale(d.date)}, 0)`)

        if (showlabels) {
            d3.select(".x-axis-label")
                .attr("x", width / 2)
                .attr("y", height);

            d3.select(".y-axis-label")
                .attr("x", -height / 2)
                .attr("y", 11);
        }

    }

    function createChart() {
        const width = chartDiv?.current?.offsetWidth;
        const height = chartDiv?.current?.offsetHeight;
        const margin = { top: 20, right: 30, bottom: 50, left: 40 + 5 };

        const svg = d3
            .select(`#${chartId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var nonWeekendData = [];
        if (data) {
            nonWeekendData = data?.filter(d => d?.date?.getDay() !== 0 && d?.date?.getDay() !== 6);
        }

        const xScale = d3
            .scaleTime()
            .domain(d3.extent(nonWeekendData, d => d?.date))
            .range([margin.left, width - margin.right]);

        const yScale = d3
            .scaleLinear()
            .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = svg
            .append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .attr("class", "x-axis")

        isModal ? xAxis.call(d3.axisBottom(xScale)) : 
        xAxis.call(d3.axisBottom(xScale).tickFormat((d, i) => parseAndFormatDate(d)))

        const yAxis = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale));

        const candleWidth = (xScale(data[1]?.date) - xScale(data[0]?.date)) * 0.8;

        // Create a clip path
        svg
            .append("defs")
            .append("clipPath")
            .attr("id", "chart-area")
            .append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom);

        // Create candlestick container
        const candlestickContainer = svg
            .append("g")
            .attr("clip-path", "url(#chart-area)");

        // Create candlestick elements
        const candlesticks = candlestickContainer
            .selectAll(".candlestick")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "candlestick")
            .attr("transform", (d) => `translate(${xScale(d.date)}, 0)`)

        candlesticks
            .append("line")
            .attr("class", "wick")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", (d) => yScale(d.high))
            .attr("y2", (d) => yScale(d.low))
            .attr("stroke", "black");

        candlesticks
            .append("rect")
            .attr("class", "body")
            .attr("x", -candleWidth / 2)
            .attr("y", (d) => yScale(Math.max(d.open, d.close)))
            .attr("width", candleWidth)
            .attr("height", (d) => Math.abs(yScale(d.open) - yScale(d.close)))
            .attr("fill", (d) => (d.open > d.close ? "red" : "green"));

        // Add zoom functionality
        const zoomBehavior = zoom()
            .scaleExtent([1, 8])
            .translateExtent([
                [margin.left, -Infinity],
                [width - margin.right, Infinity],
            ])
            .extent([
                [margin.left, margin.top],
                [width - margin.right, height - margin.bottom],
            ])
            .on("zoom", zoomed);

        if(isModal){
            svg.call(zoomBehavior);
        }

        function zoomed(event) {
            const new_xScale = event.transform.rescaleX(xScale);

            candlesticks.attr("transform", (d) => `translate(${new_xScale(d.date)}, 0)`);

            xAxis.call(d3.axisBottom(new_xScale));

            const new_candleWidth =
                (new_xScale(data[1].date) - new_xScale(data[0].date)) * 0.8;

            candlesticks
                .selectAll(".wick")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", (d) => yScale(d.high))
                .attr("y2", (d) => yScale(d.low));

            candlesticks
                .selectAll(".body")
                .attr("x", -new_candleWidth / 2)
                .attr("width", new_candleWidth)
                .attr("y", (d) => yScale(Math.max(d.open, d.close)))
                .attr("height", (d) => Math.abs(yScale(d.open) - yScale(d.close)));
        }

        const tooltip = d3
            .select(`#${chartId}`)
            .append("div")
            .style("opacity", 1)
            .attr("class", "tooltip")
            .style("position", "absolute")

        if (tooltipShow) {
            candlesticks
                .on("mouseover", function (event, d) {
                    tooltip
                        .html(
                            `O: ${d.open} H: ${d.high} L: ${d.low} C: ${d.close}`
                        )
                        .style("opacity", 1);
                })
                .on("mousemove", function (event) {
                    tooltip
                        .style("left", 65 + "px");
                })
                .on("mouseleave", function () {
                    tooltip.style("opacity", 0);
                });
        }

        if (showlabels) {
            svg
                .append("text")
                .attr("class", "x-axis-label")
                .attr("x", width / 2)
                .attr("y", height - 5)
                .style("text-anchor", "middle")
                .text("Date");
            svg
                .append("text")
                .attr("class", "y-axis-label")
                .attr("x", -height / 2)
                .attr("y", 11)
                .attr("transform", "rotate(-90)")
                .style("text-anchor", "middle")
                .text("Price");
        }

        // Initial zoom
        // svg.call(zoom.scaleTo, 2, [xScale(data[0].date), 0]);
    }

    return (
        <>

            {isModal ? (
                <h5 className="text-center">CandleStick Chart of Tata Motors ({getFirstAndLastDates(candleDataSet).firstDate} to {getFirstAndLastDates(candleDataSet).lastDate})</h5>
            ) : null}
            <div
                className={`card ${isModal ? "my-d3-chart" : ""}`}
                id={chartId}
                ref={chartDiv}
                style={{
                    width: parentWidth,
                    height: parentHeight,
                    border: borderSize,
                    background: "transparent",
                    position: "relative",
                }}
            ></div>
        </>
    );
};

export default CandleStickChart2;
