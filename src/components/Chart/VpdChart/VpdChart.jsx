import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import {
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { crops } from "./Constants";
import "./VpdChart.scss";

function VpdChart({
  chartId,
  parentWidth,
  parentHeight,
  borderSize,
  isModal,
  tooltipShow,
  showLabels,
  parentIsViewable,
}) {
  const [airRh, setAirRh] = useState(50);
  const [airT, setAirT] = useState(25);
  const [leafT, setLeafT] = useState(23);
  const [tempUnit, setTempUnit] = useState("C");
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [crop, setCropValue] = useState(crops[0]);
  const [cropI, setCropI] = useState(0);
  const [isViewable, setIsViewable] = useState(parentIsViewable);

  useEffect(() => {
    setIsViewable(parentIsViewable);
  }, [parentIsViewable]);

  let leafTDiff = 2;
  let vpdMatrix = null;
  let airRhRaw = 50;
  let airTRaw = 25;
  let leafTRaw = 23;
  let xScale = null;
  let margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  let width = 500;
  let height = 400;
  let chart = null;
  const domainCelsius = [50, 0, 0.5];
  let yScaleCelsius = null;
  let yAxis = null;
  let colWidth = null,
    rowWidth = null;
  let labelCorrs = {};
  // let ticks = 10;
  let chartInner = null;
  let options = {};
  let ha = options.ha ? options.ha : 0;
  let showTooltip = 0;
  let vpdTargetState = !1;
  let tooltipDot = null;
  let tooltipTarget = null;
  let tooltip = null;
  let embed = 0;
  let rendered = 0;

  const _calculateDP = (t, e) => {
    0 === t && (t = 1e-7);
    let i = 243.12,
      r = Math.log(t / 100) + (17.62 * e) / (i + e);
    return (i * r) / (17.62 - r);
  };

  const _calculateVPD = (t, e, i) => {
    let r;
    return (
      (r =
        (610.7 * Math.pow(10, (7.5 * i) / (237.3 + i))) / 1e3 -
        (((610.7 * Math.pow(10, (7.5 * e) / (237.3 + e))) / 1e3) * t) / 100),
      (r = Math.round(100 * (r + Number.EPSILON)) / 100),
      r
    );
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setCropI(value);
    setCropValue(crops[value]);
  };

  const handleSwitchChange = (e) => {
    let temp = e.target.checked ? "F" : "C";
    setTempUnit(temp);

    d3.selectAll(".y-axis .tick text").text(function (t, i) {
      let value3 = CtoF(t);
      return e.target.checked ? value3 + " °" + temp : t + " °" + temp;
    });
  };

  const _initVpdMatrix = () => {
    let t, e, i, r;
    vpdMatrix = [];
    leafTDiff = airT - leafT;
    for (let a = 0; a <= 100; a++) {
      e = (100 - a) / 2;
      i = e - leafTDiff;
      t = [];
      for (let a = 0; a <= 100; a++) {
        r = 100 - a;
        const o = _calculateVPD(r, e, i);
        t.push(o);
      }
      vpdMatrix.push(t);
    }
  };

  const _getVpdMatrixData = (t, e, i, r, a, o, s, n) => {
    let l = (100 - t) / 2;
    let h = 100 - e;
    let d = {};

    try {
      d = {
        airT: l,
        leafT: l - leafTDiff,
        rh: h,
        vpd: vpdMatrix[t][e],
        dp: _calculateDP(h, l),
        onchart: 1,
      };
    } catch (error) {
      console.error(error);
    }

    if (i && d.vpd >= i) d.onchart = 0;
    if (r && d.vpd < r) d.onchart = 0;
    if (a && d.airT > a) d.onchart = 0;
    if (o && d.airT < o) d.onchart = 0;
    if (s && d.rh > s) d.onchart = 0;
    if (n && d.rh < n) d.onchart = 0;

    return d;
  };

  let data = {};

  const initChartData = () => {
    data = {
      under_dp: [],
    };

    let r = [],
      a = [];

    for (let o = 0; o <= 100; o++) {
      const t = (100 - o) / 2;
      const e = t - leafTDiff;

      for (let t = 0; t <= 100; t++) {
        let i = _getVpdMatrixData(o, t);
        const s = o > 0 ? _getVpdMatrixData(o - 1, t) : null;

        if (e <= i.dp && ((o > 0 && s && s.leafT > s.dp) || o === 1)) {
          data.under_dp.push(_getVpdMatrixData(o, t));
        }

        for (let e = crop.intervals.length - 1; e >= 0; e--) {
          const interval = crop.intervals[e];
          const { upper, lower, temp_upper, temp_lower, rh_upper, rh_lower } =
            interval;

          if (!data[e]) data[e] = [];
          i = _getVpdMatrixData(
            o,
            t,
            upper,
            lower,
            temp_upper,
            temp_lower,
            rh_upper,
            rh_lower
          );

          let p = null,
            m = null;
          if (o < 100)
            p = _getVpdMatrixData(
              o + 1,
              t,
              upper,
              lower,
              temp_upper,
              temp_lower,
              rh_upper,
              rh_lower
            );
          if (o > 0)
            m = _getVpdMatrixData(
              o - 1,
              t,
              upper,
              lower,
              temp_upper,
              temp_lower,
              rh_upper,
              rh_lower
            );

          if (i.onchart && ((m && !m.onchart) || o === 0)) {
            if (!a[e]) a[e] = [];
            a[e][t] = i;
          }

          if (i.onchart && ((p && !p.onchart) || o === 100)) {
            if (!r[e]) r[e] = [];
            r[e][t] = i;
          }
        }
      }
    }

    for (const [t, e] of a.entries()) {
      if (e) {
        for (const [i, a] of e.entries()) {
          if (a) {
            if (r[t] && r[t][i]) {
              a.airT0 = a.airT === a.airT0 ? r[t][i].airT - 25 : r[t][i].airT;
            } else {
              a.airT0 = 0;
            }
            data[t].push(a);
          }
        }
      }
    }
  };

  const setLabelCorrections = () => {
    if (width < 576 || (width >= 576 && width < 768)) {
      labelCorrs = { xLeft: 1.25, xTop: 0.35, yLeft: 1, yTop: 0.45 };
      // ticks = 10;
    } else if (width >= 768 && width < 992) {
      labelCorrs = { xLeft: 0.9, xTop: 0.1, yLeft: 0.4, yTop: 0.45 };
      // ticks = 10;
    } else if (width >= 992 && width < 1200) {
      labelCorrs = { xLeft: 0.75, xTop: 0.15, yLeft: 0.4, yTop: 0.45 };
      // ticks = 20;
    } else if (width >= 1200) {
      labelCorrs = { xLeft: 0.65, xTop: 0.35, yLeft: 0.45, yTop: 0.45 };
      // ticks = 20;
    }
  };

  const _createTooltip = () => {
    const t = chart
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("pointer-events", "none")
      .style("position", "absolute")
      .style("z-index", 1)
      .attr("id", "tooltip-dots-layer");
    tooltipDot = t
      .append("rect")
      .attr("x", -colWidth)
      .attr("y", -rowWidth)
      .attr("width", colWidth)
      .attr("height", rowWidth)
      .attr("class", "tooltip-dot");
    tooltipTarget = t
      .append("svg")
      .attr("x", -3 * colWidth)
      .attr("y", -3 * rowWidth)
      .attr("width", 3 * colWidth)
      .attr("height", 3 * rowWidth);
    tooltipTarget
      .append("rect")
      .attr("x", colWidth)
      .attr("y", rowWidth)
      .attr("width", colWidth)
      .attr("height", rowWidth)
      .attr("class", "target-rect");
    tooltipTarget
      .append("line")
      .attr("x1", rowWidth + rowWidth / 2)
      .attr("y1", 0)
      .attr("x2", rowWidth + rowWidth / 2)
      .attr("y2", 3 * colWidth)
      .style("stroke-width", "1px")
      .attr("class", "target-line");
    tooltipTarget
      .append("line")
      .attr("x1", 0)
      .attr("y1", rowWidth + rowWidth / 2)
      .attr("x2", 3 * colWidth)
      .attr("y2", rowWidth + rowWidth / 2)
      .style("stroke-width", "1px")
      .attr("class", "target-line");
    tooltip = chart
      .append("div")
      .style("opacity", 0.85)
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("position", "absolute")
      .style("z-index", 2)
      .attr("id", "letooltip")
      .style("box-shadow", "0 0 20px 0 rgba(0,0,0,.15)");
    if (!1 === isTouchDevice()) tooltip.style("pointer-events", "none");
    showTooltip = 0;
  };

  const _showTooltip = (t) => {
    if (showTooltip === 0) {
      if (vpdTargetState) {
        tooltipTarget.style.visibility = "visible";
      } else {
        tooltipDot.style("visibility", "visible");
      }

      if (!vpdTargetState) {
        tooltip.style("visibility", "visible");
        showTooltip = 1;
      }
    }
  };

  const _hideTooltip = (t) => {
    const isMouseLeave =
      !t ||
      !t.relatedTarget ||
      (t.relatedTarget.id !== "letooltip" && t.relatedTarget.localName !== "a");

    if (showTooltip === 1 || (showTooltip === 1 && isMouseLeave)) {
      if (vpdTargetState) {
        tooltipTarget.style.visibility = "hidden";
      } else {
        tooltipDot.style("visibility", "hidden");
      }
      tooltip.style("visibility", "hidden");
      showTooltip = 0;
    }
  };

  const CtoF = (celsiusValue) => {
    if (celsiusValue === "" || isNaN(celsiusValue)) {
      return "";
    }
    return ((celsiusValue * 9) / 5 + 32).toFixed(2);
  };

  const FtoC = (fahrenheitValue) => {
    if (fahrenheitValue === "" || isNaN(fahrenheitValue)) {
      return "";
    }
    return (((fahrenheitValue - 32) * 5) / 9).toFixed(2);
  };

  const isTouchDevice = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  const _animateTooltip = (t) => {
    const e = t.layerX - margin.left;
    const i = t.layerY - margin.top;
    const r = Math.trunc(e / colWidth);
    const a = Math.trunc(i / rowWidth);

    const o = _getVpdMatrixData(100 - a, r);

    if (vpdTargetState) {
      tooltipTarget
        .attr("x", r * colWidth - colWidth)
        .attr("y", a * rowWidth - rowWidth);
    } else {
      tooltipDot.attr("x", r * colWidth).attr("y", a * rowWidth);
    }

    let s = o.airT;
    // let n = o.airT;
    let l = o.airT - leafTDiff;
    // let h = l;
    let d = false;

    if (o.rh === airRh && s === airT && l === leafT) {
      d = true;
    }

    if (tempUnit === "F") {
      s = Math.round(10 * CtoF(s)) / 10;
      l = Math.round(10 * CtoF(l)) / 10;
    }

    let c, p;
    let m = "";

    if (vpdTargetState) {
      m += `<strong>Set VPD target</strong> = ${o.vpd} kPa`;
    } else {
      m += d
        ? `VPD = ${_calculateVPD(airRhRaw, airTRaw, leafTRaw)} kPa`
        : `VPD = ${o.vpd} kPa`;
    }

    if (d) {
      let t = airRhRaw;
      let e = airTRaw;
      let i = leafTRaw;

      if (tempUnit === "F") {
        e = Math.round(10 * CtoF(e)) / 10;
        i = Math.round(10 * CtoF(i)) / 10;
      }

      m += `<br />Air RH = ${t} %<br />Air Temp = ${e} °${tempUnit}<br />Leaf Temp = ${i} °${tempUnit}`;
    } else {
      m += `<br />Air RH = ${o.rh} %<br />Air Temp = ${s} °${tempUnit}<br />Leaf Temp = ${l} °${tempUnit}`;
    }

    if (isTouchDevice()) {
      if (embed === 1) {
        m += `<br /><br /><a href="https://vpdchart.com/#${[
          tempUnit,
          o.rh,
          s,
          l,
          cropI,
        ].join(",")}" target="_blank">Discover more<br />on vpdchart.com</a>`;
      } else if (!vpdTargetState) {
      }
    }

    tooltip.html(m);

    if (e < width / 2) {
      c = r * colWidth + colWidth + margin.left;
    } else {
      const t = tooltip.node().getBoundingClientRect().width;
      c = r * colWidth + margin.left - t;
    }

    if (i < height / 2) {
      p = a * rowWidth + rowWidth + margin.top;
    } else {
      const t = tooltip.node().getBoundingClientRect().height;
      p = a * rowWidth + margin.top - t;
    }

    tooltip.style("left", `${c}px`).style("top", `${p}px`);
  };

  const _createAxes = () => {
    let t = tempUnit;
    let e = chart
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("pointer-events", "none")
      .style("position", "absolute")
      .style("z-index", 1)
      .attr("class", "axes");
    e.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -width / 10)
      .attr("dx", 0)
      .attr("y", 0)
      .attr("dy", "2.5em")
      .attr("class", "axis-title")
      .style("text-anchor", "end")
      .text("← Air Temp");
    e.append("text")
      .attr("x", width - width / 10 + colWidth)
      .attr("dx", 0)
      .attr("y", 0)
      .attr("dy", "2.5em")
      .attr("class", "axis-title")
      .style("text-anchor", "end")
      .text("← Air RH");
    xScale = d3.scaleLinear().range([0, width]).domain([100, 0]).clamp(!0);
    let i = e
      .append("g")
      .attr("class", "x-axis")
      .attr("color", "#ffffff")
      .call(
        d3
          .axisTop(xScale)
          .tickSize(0)
          .tickFormat(function (t) {
            return t + " %";
          })
      );
    i.selectAll(".tick:last-child").remove();
    i.selectAll(".tick text")
      .attr("y", 0)
      .attr("x", 0)
      .attr(
        "transform",
        "translate(" +
          rowWidth * labelCorrs.xLeft +
          "," +
          colWidth * labelCorrs.xTop +
          ") rotate(-90)"
      )
      .style("text-anchor", "end");
    yScaleCelsius = d3
      .scaleLinear()
      .range([height, 0])
      .domain(domainCelsius)
      .clamp(!0);
    yAxis = d3
      .axisLeft(yScaleCelsius)
      .tickSize(0)
      .tickFormat(function (e) {
        return t === "F" ? CtoF(e) + " °" + t : e + " °" + t;
      });
    let r = e
      .append("g")
      .attr("class", "y-axis")
      .attr("color", "#ffffff")
      .call(yAxis);
    r.selectAll(".tick text")
      .style("text-anchor", "start")
      .attr(
        "transform",
        "translate(" +
          colWidth * labelCorrs.yLeft +
          "," +
          rowWidth * labelCorrs.yTop +
          ")"
      );
    d3.selectAll(".domain").remove();
    r.select(".tick:first-child").remove();
  };

  yAxis = d3
    .axisLeft(yScaleCelsius)
    .tickSize(0)
    .tickFormat(function (e) {
      return e + " °" + tempUnit;
    });

  function getViewportWidth() {
    return document.getElementById("chart-card").offsetWidth;
  }
  function getViewportHeight() {
    return document.getElementById("chart-card").offsetHeight;
  }
  function showVerticalScroll() {
    let t = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ),
      e = document.createElement("div");
    e.style.height = 3 * t + "px";
    e.setAttribute("id", "createscroll");
    document.getElementById("chart-card").appendChild(e);
  }
  function hideVerticalScroll() {
    document.getElementById("createscroll").remove();
  }

  const _setupPlayground = () => {
    showVerticalScroll();
    hideVerticalScroll();
    let t = getViewportWidth();
    setViewportWidth(t);
    width = t - margin.left - margin.right;
    height = isViewable ? getViewportHeight() : width;
    colWidth = width / 100;
    rowWidth = height / 100;
  };

  const _renderChart = (t) => {
    const e = xScale,
      i = yScaleCelsius,
      r = rowWidth;

    if (t && rendered) {
    } else {
      rendered = 1;

      for (let t = crop.intervals.length - 1; t >= 0; t--) {
        const a = chartInner
          .append("path")
          .datum(data[t])
          .attr("fill", crop.intervals[t].color)
          .style("opacity", 1)
          .on("mouseover", function () {
            a.style("opacity", 1);
          })
          .on("mouseout", function () {
            a.style("opacity", 1);
          })
          .attr(
            "d",
            d3
              .area()
              .curve(d3.curveStepAfter)
              .x(function (t) {
                return e(t.rh);
              })
              .y0(function (t) {
                return i(t.airT0);
              })
              .y1(function (t) {
                return i(t.airT) + r;
              })
          );
      }

      if (crop.dew !== !1) {
        chartInner
          .append("path")
          .datum(data.under_dp)
          .attr("fill", crop.dewColor)
          .style("opacity", 1)
          .attr(
            "d",
            d3
              .area()
              .curve(d3.curveStepAfter)
              .x(function (t) {
                return e(t.rh);
              })
              .y0(i(0))
              .y1(function (t) {
                return i(t.airT) + r;
              })
          );
      }

      if (embed === 0) {
        const t = chartInner
            .append("text")
            .attr("x", e(0))
            .attr("y", i(50))
            .attr("text-anchor", "end")
            .style("fill", "#181c32")
            .style("opacity", 0.5)
            .style("pointer-events", "none"),
          r = t.node().getBBox();
        t.attr("x", e(0) - r.height / 2);
        t.attr("y", i(50) - r.height / 2);
      }
    }

    const a = Math.round(e(airRh) / colWidth) * colWidth,
      o = Math.round(i(airT) / rowWidth) * rowWidth;
    chartInner
      .append("line")
      .attr("x1", a - colWidth)
      .attr("y1", o + rowWidth / 2)
      .attr("x2", 0)
      .attr("y2", o + rowWidth / 2)
      .style("stroke-dasharray", 2 * colWidth + "," + 2 * rowWidth)
      .style("stroke", crop.crossColor)
      .style("stroke-width", "1px")
      .attr("class", "crossline");
    chartInner
      .append("line")
      .attr("x1", a + 2 * colWidth)
      .attr("y1", o + rowWidth / 2)
      .attr("x2", width)
      .attr("y2", o + rowWidth / 2)
      .style("stroke-dasharray", 2 * colWidth + "," + 2 * rowWidth)
      .style("stroke", crop.crossColor)
      .style("stroke-width", "1px")
      .attr("class", "crossline");
    chartInner
      .append("line")
      .attr("x1", a + colWidth / 2)
      .attr("y1", o - rowWidth)
      .attr("x2", a + colWidth / 2)
      .attr("y2", 0)
      .style("stroke-dasharray", 2 * colWidth + "," + 2 * rowWidth)
      .style("stroke", crop.crossColor)
      .style("stroke-width", "1px")
      .attr("class", "crossline");
    chartInner
      .append("line")
      .attr("x1", a + colWidth / 2)
      .attr("y1", o + 2 * rowWidth)
      .attr("x2", a + colWidth / 2)
      .attr("y2", height)
      .style("stroke-dasharray", 2 * colWidth + "," + 2 * rowWidth)
      .style("stroke", crop.crossColor)
      .style("stroke-width", "1px")
      .attr("class", "crossline");
    chartInner
      .append("rect")
      .attr("x", a)
      .attr("y", o)
      .attr("width", colWidth)
      .attr("height", rowWidth)
      .style("fill", crop.crossColor)
      .attr("class", "crossline");
  };

  const buildLegendHtml = (t) => {
    const convertTemp = (value) => (t.tempUnit === "F" ? CtoF(value) : value);

    return (
      <>
        <h4 className="font-weight-bold" id="legend-title">
          {t.name}
          {/* <button
            rel="tooltip-l"
            title="Change crop"
            className="btn btn-icon btn-sm btn-circle btn-icon-dark-75 btn-hover-light btn-hover-icon-dark ml-2"
            onClick={() =>
              document.querySelector("#kt_quick_panel_toggle").click()
            }
          >
            <i className="ki ki-gear"></i>
          </button> */}
        </h4>
        <table className="table table-sm table-borderless table-legend">
          <tbody>
            {t.dew !== false && (
              <tr>
                <td>
                  <span className="badge dew">&nbsp;</span>
                </td>
                <td>
                  <span className="font-weight-bolder">
                    Leaf Temp under Dew Point:
                  </span>{" "}
                  Danger Zone (Plant Disease)
                </td>
              </tr>
            )}
            {t.intervals.map((interval, i) =>
              interval.legend !== false ? (
                <tr key={i}>
                  <td>
                    <span
                      className="badge"
                      style={{ backgroundColor: interval.color }}
                    >
                      &nbsp;
                    </span>
                  </td>
                  <td>
                    <span className="font-weight-bolder">
                      {interval.lower === undefined
                        ? `VPD under ${interval.upper}`
                        : interval.upper === undefined
                        ? `VPD over ${interval.lower}`
                        : `VPD from ${interval.lower} to ${
                            interval.upper
                          } kPa ${
                            interval.temp_lower && interval.temp_upper
                              ? `, Air Temp from ${convertTemp(
                                  interval.temp_lower
                                )} to ${convertTemp(interval.temp_upper)} °${
                                  t.tempUnit
                                }`
                              : ""
                          }`}
                      :
                    </span>{" "}
                    {interval.name}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </>
    );
  };

  useEffect(() => {
    chart = d3.select("#chart-card");
    if (chart) {
      chart.html("");
    }
    _setupPlayground();
    _initVpdMatrix();
    initChartData();
    setLabelCorrections();
    _createAxes();
    _createTooltip();
    chartInner = chart
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "chart");
    if (0 === ha) {
      chartInner
        .on("mouseover", function (e) {
          _showTooltip(e);
        })
        .on("mouseleave", function (e) {
          _hideTooltip(e);
        })
        .on("mousemove", function (e) {
          _animateTooltip(e);
        })
        .on("click", function (e) {});
    }
    _renderChart();

    const handleResize = () => {
        setViewportWidth(getViewportWidth());
        setViewportHeight(getViewportHeight());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [airT, airRh, leafT, tempUnit, viewportWidth, viewportHeight, crop]);

  return (
    <>
      {isViewable ? (
        <div
          style={{
            width: parentWidth,
            height: parentHeight,
            border: borderSize,
            background: "transparent",
          }}
          id="chart-card"
          className={`card chart-container mt-4 ${
            crop.darkAxis ? "dark-axis" : ""
          }`}
        ></div>
      ) : (
        <>
          <h2>VPD Chart</h2>
          <p className="mb-3">
            Vapour Pressure Deficit (VPD), a metric that combines air
            temperature, leaf temperature, and relative humidity to measure
            moisture stress in plants. Using React and D3.js, the chart
            dynamically displays how VPD fluctuates under different
            environmental conditions.
          </p>
          <p>
            The chart illustrates monthly price comparisons between diesel and
            petrol per liter from January to December. Beneath the chart, a
            tabular representation of the data is provided. Enhance user
            insights by enabling tooltips on bar hover, revealing supplementary
            data. Users can seamlessly edit, delete, or add data points in the
            table, observing real-time adjustments in the chart. To make
            changes, simply click on the respective data entry and select the
            desired action, with all modifications dynamically reflected in the
            charts, ensuring a real-time visualization of changes.
          </p>
          <div className="main-container">
          <div className="container mt-4">
            <div className="slider-wrapper">
              <label>Air RH: {airRh}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={airRh}
                onChange={(e) => setAirRh(Number(e.target.value))}
              />
            </div>
            <div className="slider-wrapper">
              <label>
                Air Temp: {tempUnit === "F" ? CtoF(airT) : airT} °{tempUnit}
              </label>
              <input
                type="range"
                min={tempUnit === "C" ? "-10" : CtoF(0)}
                max={tempUnit === "C" ? "50" : CtoF(50)}
                step="0.5"
                value={tempUnit === "F" ? CtoF(airT) : airT}
                onChange={(e) =>
                  setAirT(
                    tempUnit === "F"
                      ? FtoC(Number(e.target.value))
                      : Number(e.target.value)
                  )
                }
              />
            </div>
            <div className="slider-wrapper">
              <label>
                Leaf Temp: {tempUnit === "F" ? CtoF(leafT) : leafT} °{tempUnit}
              </label>
              <input
                type="range"
                min={tempUnit === "C" ? "-10" : CtoF(0)}
                max={tempUnit === "C" ? "50" : CtoF(50)}
                step="0.5"
                value={tempUnit === "F" ? CtoF(leafT) : leafT}
                onChange={(e) =>
                  setLeafT(
                    tempUnit === "F"
                      ? FtoC(Number(e.target.value))
                      : Number(e.target.value)
                  )
                }
              />
            </div>
          </div>
          <div className="container">
            <div
              className="sub-header mt-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  width: { xs: "200px", sm: "200px", lg: "250px" },
                  marginRight: "40px",
                }}
              >
                <InputLabel id="crop-select-label">Crop</InputLabel>
                <Select
                  labelId="crop-select-label"
                  id="crop-select"
                  value={cropI}
                  onChange={handleChange}
                  label="Crop"
                  sx={{
                    backgroundColor: "none",
                    "& .MuiSelect-select": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <MenuItem value={0}>Cannabis - all growth stages</MenuItem>
                  <MenuItem value={1}>
                    Cannabis - Early Vegetative Growth / Propagation
                  </MenuItem>
                  <MenuItem value={2}>
                    Cannabis - Late Vegetative / Early Flower
                  </MenuItem>
                  <MenuItem value={3}>Cannabis - Mid / Late Flower</MenuItem>
                  <MenuItem value={4}>Tomatoes</MenuItem>
                  <MenuItem value={5}>Leafy Greens</MenuItem>
                  <MenuItem value={6}>Cucumber (Cucumis sativus)</MenuItem>
                </Select>
              </FormControl>
              <div className="slider-wrapper">
                <div className="switch-wrapper">
                  <span style={{ marginTop: "-5px" }}>°C</span>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tempUnit === "F"}
                        onChange={handleSwitchChange}
                        value="tempUnit"
                        color="primary"
                      />
                    }
                    label=""
                  />
                  <span style={{ marginLeft: "-30px", marginTop: "-5px" }}>
                    °F
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="container px-0 px-md-8">
            <div
              id="chart-card"
              className={`card chart-container mt-4 ${
                crop.darkAxis ? "dark-axis" : ""
              }`}
            ></div>
            <div
              id="legend"
              style={{ width: "100%" }}
            >
              {crop && buildLegendHtml(crop)}
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}

export default VpdChart;