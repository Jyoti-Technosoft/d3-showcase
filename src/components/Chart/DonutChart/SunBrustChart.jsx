import * as d3 from "d3";
import { useContext, useEffect, useRef } from "react";
import { CustomContext } from "src/components/CustomContext";

import './SunBrustChart.scss';

function SunBrustChart({
    chartId,
    cardwidth,
    tooltipShow,
    zoomOn,
    isModal,
    drillOn
}) {
    const eleRef = useRef();

    const { sunBrustDataSet, updateDataSunBrust } = useContext(CustomContext);

    useEffect(() => {
        createChart(sunBrustDataSet);
        initZoom();
    }, []);

    if(updateDataSunBrust){
        d3.select(`#${chartId} svg`).remove();
        d3.select(`#${chartId} .tooltip`).remove();
        createChart(sunBrustDataSet);
    }

    function findParentByName(data, targetName) {
        function findParent(node, parent = null) {
            if (node.name === targetName) {
                return parent;
            } else if (node.children) {
                for (const child of node.children) {
                    const result = findParent(child, node);
                    if (result) {
                        return result;
                    }
                }
            }
            return null;
        }
        return findParent(data);
    }

    const updateChart = (newData) => {
        d3.select(`#${chartId} svg`).remove();
        d3.select(`#${chartId} .tooltip`).remove();
        createChart(newData.data);
    }

    const updateChartLayer0 = (countryName) => {
        if (countryName != "World") {
            const foundCountry = findParentByName(sunBrustDataSet, countryName);
            d3.select(`#${chartId} svg`).remove();
            d3.select(`#${chartId} .tooltip`).remove();
            createChart(foundCountry);
        }
    }

    function createChart(data) {
        const width = 700;
        const height = 700;
        const radius = (Math.min(width, height) / 2) - 50;
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
            .innerRadius(d => {
                if (d.depth === 0) {
                    return Math.sqrt(d.y0);
                }
                if (d.depth === 1) {
                    return Math.sqrt(d.y0) - 50 + padding;
                }
                if (d.depth === 2) {
                    return Math.sqrt(d.y0) - 30 + padding;
                }
                if (d.depth === 3) {
                    return Math.sqrt(d.y0) + padding;
                }
                return Math.sqrt(d.y0) + padding;
            })
            .outerRadius(d => {
                if (d.depth === 0) {
                    return Math.sqrt(d.y1) - 50;
                }
                if (d.depth === 1) {
                    return Math.sqrt(d.y1) - 30;
                }
                if (d.depth === 2) {
                    return Math.sqrt(d.y1);
                }
                if (d.depth === 3) {
                    return Math.sqrt(d.y1) + 30;
                }
                return Math.sqrt(d.y1) - padding;
            });

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
                if (d.depth === 1) {
                    return color(d.data.name);
                }
                if (d.depth === 2) {
                    return color(d.parent.data.name);
                }
                if (d.depth === 3) {
                    return color(d.parent.parent.data.name);
                }
                return color(d.data.name);
            })
            .attr("opacity", d => {
                if (d.depth === 1) {
                    return 0.9;
                }
                if (d.depth === 2) {
                    return 0.8;
                }
                if (d.depth === 3) {
                    return 0.7;
                }
                return 1;
            })
            .attr("class", d => {
                if (d.depth === 0) {
                    return "layer0";
                } else if (d.depth === 1) {
                    return "layer1";
                } else if (d.depth === 2) {
                    return "layer2";
                } else if (d.depth === 3) {
                    return "layer3";
                }
            })
            .style("cursor", "pointer")
            .style("box-shadow","rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;");

            if(drillOn){
                paths.on('click', (event, d) => {
                    if (d.depth === 0) {
                        updateChartLayer0(d.data.name);
                    }
                    else {
                        updateChart(d);
                    }
                })
            }

        if (tooltipShow) {
            paths
                .on("mouseover", function (event, d) {
                    if (d.depth === 0) {
                        tooltip
                            .html(`<h6>${d.data.name}</h6> Population: ${d.value} M`)
                            .style("opacity", 1);
                    }
                    if (d.depth === 1) {
                        tooltip
                            .html(`<h6>${d.data.name}</h6> Population: ${d.value} M`)
                            .style("opacity", 1);
                    }
                    if (d.depth === 2) {
                        tooltip
                            .html(`<h6>${d.data.name}</h6> Country: ${d.parent.data.name}<br> Population: ${d.value} M`)
                            .style("opacity", 1);
                    }
                    if (d.depth === 3) {
                        tooltip
                            .html(`<h6>${d.data.name}</h6> Country: ${d.parent.parent.data.name}<br> State: ${d.parent.data.name}<br> Population: ${d.value} M`)
                            .style("opacity", 1);
                    }
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

        const labelArc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => {
                if (d.depth === 0) {
                    return Math.sqrt(d.y0);
                }
                if (d.depth === 1) {
                    return Math.sqrt(d.y0) - 50 + padding;
                }
                if (d.depth === 2) {
                    return Math.sqrt(d.y0) - 30 + padding;
                }
                if (d.depth === 3) {
                    return Math.sqrt(d.y0) + padding;
                }
                return Math.sqrt(d.y0) + padding;
            })
            .outerRadius(d => {
                if (d.depth === 0) {
                    return Math.sqrt(d.y1) - 50;
                }
                if (d.depth === 1) {
                    return Math.sqrt(d.y1) - 30;
                }
                if (d.depth === 2) {
                    return Math.sqrt(d.y1);
                }
                if (d.depth === 3) {
                    return Math.sqrt(d.y1) + 30;
                }
                return Math.sqrt(d.y1) - padding;
            });

        svg.selectAll("text")
            .data(root.descendants())
            .enter().append("text")
            .filter(d => d.depth <= 3)
            .attr("transform", d => `translate(${labelArc.centroid(d)})`)
            .attr("dy", d => {
                if (d.data.name == "World") {
                    return "-1.8em";
                } else if (d.depth === 0 && d.data.name == "India" || d.depth === 0 && d.data.name == "USA" || d.depth === 0 && d.data.name == "Australia" || d.depth === 0 && d.data.name == "China") {
                    return "-2.8em";
                } else if (d.depth === 0) {
                    return "-3.8em";
                }
                return "0";
            })
            .attr("text-anchor", "middle")
            .style("font-size", d => {
                if (d.depth === 0) {
                    return "24px";
                }
                if (d.depth === 1) {
                    return "18px";
                }
                if (d.depth === 2) {
                    return "15px";
                }
                return "14px";
            })
            .style("pointer-events", "none")
            .text(d => {
                if (d.depth === 0) {
                    return d.data.name;
                }
                return d?.data?.labelName;
            });

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
            {
                isModal ?
                    <h5 className="text-center">World Population (In Millions)</h5>
                    : null
            }
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