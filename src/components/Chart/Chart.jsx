import GroupChart from "./GroupChart/GroupChart";
import PieChart from "./PieChart/PieChart";
import StackedChart from "./StackedChart/StackedChart";
import CandleStickChart from "./CandleStickChart/CandleStickChart";
import IndiaMapChart from "./MapChart/IndiaMap/IndiaMapChart";
import SunBrustChart from "./DonutChart/SunBrustChart";
import { useNavigate } from "react-router";

import "./Chart.scss";

import titles from '../../pageTitle';
import { useEffect } from "react";
import CandleStickChart2 from "./CandleStickChart/CandleStickChart2";

function Chart() {
  const navigate = useNavigate();

  useEffect(()=>{
    document.title = titles.home;
  },[])

  return (
    <>
      <div className="container">

        <p className="mb-4 charts-description">D3 Showcase is an interactive data visualization web application that seamlessly integrates React.js and D3.js. With a variety of six dynamic charts, users can delve into data insights, perform CRUD operations, and observe real-time updates. This fusion of technologies empowers efficient data analysis within a user-friendly interface.</p>

        <div className="row">
          <div className="col-sm my-card mb-4">
            <div className="chart-box">
              <div className="charts-card d-flex justify-content-center" onClick={() => {
                navigate('/charts/groupchart');
              }}>
                <GroupChart
                  chartId="group1"
                  parentWidth="350px"
                  parentHeight="250px"
                  borderSize="0"
                  isModal={false}
                  tooltipShow={false}
                  showLabels={false}
                />
              </div>
              <div className="chart-description">
                <h5 className="mb-2">Group Chart</h5>
                <p>
                  Group chart (grouped bar) visually compares data values across categories. Bars represent categories, divided into segments for subcategories. Useful for inter-group data comparison and trend identification.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm my-card mb-4">
            <div className="chart-box">
              <div className="charts-card d-flex justify-content-center" onClick={() => {
                navigate('/charts/stackedchart');
              }}>
                <StackedChart
                  chartId="stacked1"
                  parentWidth="350px"
                  parentHeight="250px"
                  borderSize="0"
                  isModal={false}
                  tooltipShow={false}
                  showLegend={true}
                  showLables={false}
                />
              </div>
              <div className="chart-description">
                <h5 className="mb-2">Stacked Chart</h5>
                <p>
                  Stacked chart (stacked bar) shows category-wise data composition. Stacked bars represent values, segments depict portions. Useful for visualizing individual values and overall distribution in diverse groups.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm my-card mb-4">
            <div className="chart-box">
              <div className="charts-card d-flex justify-content-center" onClick={() => {
                navigate('/charts/candlestickchart');
              }}>
                <CandleStickChart2
                  chartId="candle1"
                  parentWidth="350px"
                  parentHeight="250px"
                  borderSize="0"
                  isModal={false}
                  showlabels={false}
                />
              </div>
              <div className="chart-description">
                <h5 className="mb-2">Candlestick chart</h5>
                <p>
                  Candlestick chart aids financial analysis, displaying open, high, low, close prices over time. Rectangular body shows range, wicks indicate highs and lows. Valuable for trend and pattern recognition.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm my-card mb-4">
            <div className="chart-box">
              <div className="charts-card d-flex justify-content-center" onClick={() => {
                navigate('/charts/mapchart');
              }}>
                <IndiaMapChart
                  chartId="indiamap1"
                  toolTipShow={false}
                  parentWidth="240"
                  parentHeight="240"
                  isModal={false}
                />
              </div>
              <div className="chart-description">
                <h5 className="mb-2">Map Chart</h5>
                <p>
                  Map chart shades regions by data values, offering spatial insight. Visualizes distributions, patterns, and variations across geography. Interactive for detailed exploration, conveying valuable geographic insights effectively.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm my-card mb-4">
            <div className="chart-box">
              <div className="charts2-card d-flex justify-content-center" onClick={() => {
                navigate('/charts/piechart');
              }}>
                <PieChart
                  chartId="pie1"
                  parentWidth="20em"
                  tooltipShow={false}
                  onClickOpenInside={false}
                />
              </div>
              <div className="chart-description">
                <h5 className="mb-2">Pie Chart</h5>
                <p>
                  A multilevel pie chart, represents data in a circular format where each level of the chart corresponds to a different category. The outer rings of the pie chart show broader categories, while the inner rings show subcategories or detailed data.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm my-card mb-4">
            <div className="chart-box">
              <div className="charts-card d-flex justify-content-center" onClick={() => {
                navigate('/charts/sunburstchart');
              }}>
                <SunBrustChart
                  chartId="donutchart1"
                  cardwidth="15em"
                  tooltipShow={false}
                  zoomOn={false}
                  isModal={false}
                  drillOn={false}
                />
              </div>
              <div className="chart-description">
                <h5 className="mb-2">SunBurst Chart</h5>
                <p>
                  A D3.js Sunburst chart is a hierarchical, multi-layered pie chart with angular sectors representing data distribution across categories, offering interactive exploration of nested relationships and values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
