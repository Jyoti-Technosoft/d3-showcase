import * as d3 from "d3";
import { useContext, useEffect, useRef } from "react";
import { CustomContext } from "src/components/CustomContext";

function SunBrustChart({
    chartId,
    cardwidth,
    tooltipShow,
    zoomOn,
    isModal,
}) {
    const eleRef = useRef();

    const { sunBrustDataSet, updateDataSunBrust } = useContext(CustomContext);

    const data = sunBrustDataSet;

    useEffect(() => {
        createChart();
        initZoom();
    }, []);

    if(updateDataSunBrust){
        d3.select(`#${chartId} svg`).remove();
        d3.select(`#${chartId} .tooltip`).remove();
        createChart();
    }

    function createChart() {
        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2;
        const padding = 1;
        const color = d3.scaleOrdinal(d3.schemeSet2);

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
                    .append("g")
                    .attr("transform", `translate(${width / 2},${height / 2})`))
                : (svg = d3
                    .selectAll(`#${chartId}`)
                    .append("svg")
                    .attr("viewBox", `0 0 ${width} ${(height + 15)}`)
                    .append("g"))
                    .attr("transform", `translate(${width / 2},${(height / 2) + 10})`);
        }

        const partition = d3.partition()
            .size([2 * Math.PI, radius * radius]);

        const root = d3.hierarchy(data);
        root.sum(d => d.value);

        partition(root);

        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => Math.sqrt(d.y0) + padding)
            .outerRadius(d => Math.sqrt(d.y1) - padding); 

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

        const paths = svg.selectAll("path")
            .data(root.descendants())
            .enter().append("path")
            .attr("d", arc)
            .attr("fill", d => {
                if (d.depth === 2) {
                    return color(d.parent.data.name);
                } else if (d.depth === 3) {
                    return color(d.parent.parent.data.name);
                }
                return color(d.data.name);
            })
            .style("cursor", "pointer");
        if (tooltipShow) {
            paths
                .on("mouseover", function (event, d) {
                    tooltip
                        .html(
                            `<h6>${d.data.name}</h6> Population: ${d.value} M`
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
        };

        svg.selectAll(".label")
            .data(root.descendants())
            .enter().append("text")
            .attr("class", "label")
            .attr("transform", d => {
                const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                const y = Math.sqrt(d.y0) + padding;
                let rotation = x < 180 ? 0 : 180; 
                if (d.depth === 0 && d.data.name === "World") {
                    rotation = -90;
                }
                return `rotate(${x - 90}) translate(${y},0) rotate(${rotation})`;
            })
            .attr("dy", "0.35em")
            .attr("text-anchor", d => (d.x0 + d.x1) / 2 < Math.PI ? "start" : "end")
            .text(d => d.data.name)
            .style('font-size', d => (d.depth === 0 && d.data.name === "World") ? '16px' : '12px')
            .style("pointer-events", "none");

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

export default SunBrustChart;