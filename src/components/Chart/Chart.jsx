import GroupChart from "./GroupChart/GroupChart";
import PieChart from "./PieChart/PieChart";
import StackedChart from "./StackedChart/StackedChart";

import "./Chart.scss";

import { useContext, useState } from "react";
import {
  CrudCandleChartModal,
  CrudGroupChartModal,
  CrudMapChartModal,
  CrudPieChartModal,
  CrudStackedChartModal,
  CrudSunBrustChartModal,
  OpenChartModal,
} from "../ChartModal/ChartModal";
import { CustomContext } from "../CustomContext";
import CandleStickChart from "./CandleStickChart/CandleStickChart";
import CustomToast from "../ToastComponent/CustomToast";
import IndiaMapChart from "./MapChart/IndiaMap/IndiaMapChart";
import SunBrustChart from "./DonutChart/SunBrustChart";

function Chart() {
  const [groupModel, setGroupModel] = useState(false);
  const [pieModel, setPieModel] = useState(false);
  const [stackedModel, setStackedModel] = useState(false);
  const [mapModel, setMapModel] = useState(false);
  const [candleModel, setCandleModel] = useState(false);
  const [sunBrustModel, setSunBrustModel] = useState(false);

  const {
    showToast,
    openGroupCrudModal,
    setOpenGroupCrudModal,
    openStackedCrudModal,
    setOpenStackedCrudModal,
    openPieCrudModal,
    setOpenPieCrudModal,
    openCrudModal, setOpenCrudModal,
    openCandleCrudModal,
    setaddDataCrud,
    setOpenCandleCrudModal,
    stateMap, setStateMap
  } = useContext(CustomContext);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm my-card mb-4">
            <div className="chart-box">
              <div className="charts-card d-flex justify-content-center" onClick={() => {
                setGroupModel(true);
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
                setStackedModel(true);
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
                setCandleModel(true);
              }}>
                <CandleStickChart
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
                setMapModel(true);
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
                setPieModel(true);
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
                setSunBrustModel(true);
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

      {groupModel ? (
        <OpenChartModal
          show={groupModel}
          onHide={() => setGroupModel(false)}
          chartTitle="Petrol v/s Diesel (In $USD)"
          crudModalType="groupChart"
          chartType={
            <GroupChart
              chartId="group2"
              parentWidth="75vw"
              parentHeight="70vh"
              isModal={true}
              tooltipShow={true}
              showLabels={true}
            />
          }
        />
      ) : null}

      {stackedModel ? (
        <OpenChartModal
          show={stackedModel}
          onHide={() => setStackedModel(false)}
          chartTitle="Oil Consumption By Country (In Barrels)"
          crudModalType="stackedChart"
          chartType={
            <StackedChart
              chartId="stacked2"
              parentWidth="75vw"
              parentHeight="65vh"
              isModal={true}
              tooltipShow={true}
              showLegend={true}
              showLables={true}
            />
          }
        />
      ) : null}

      {candleModel ? (
        <OpenChartModal
          show={candleModel}
          onHide={() => setCandleModel(false)}
          chartTitle="CandleStick Chart of ITC (Demo Data)"
          crudModalType="candleStickChart"
          chartType={
            <CandleStickChart
              chartId="candle2"
              parentWidth="75vw"
              parentHeight="65vh"
              isModal={true}
              showlabels={true}
            />
          }
        />
      ) : null}

      {pieModel ? (
        <OpenChartModal
          show={pieModel}
          onHide={() => setPieModel(false)}
          chartTitle="Countries With Population (in Millions)"
          chartText2="Click on Country name to view more details"
          crudModalType="pieChart"
          chartType={
            <PieChart
              className="d-flex justify-content-center pie-size"
              chartId="pie2"
              parentWidth="30vw"
              parentHeight="30vw"
              tooltipShow={true}
              isModal={true}
              onClickOpenInside={true}
            />
          }
        />
      ) : null}

      {sunBrustModel ? (
        <OpenChartModal
          show={sunBrustModel}
          onHide={() => setSunBrustModel(false)}
          chartTitle="World Population (In Millions)"
          chartText2=""
          crudModalType="sunBrustChart"
          chartType={
            <SunBrustChart
              chartId="donutchart2"
              cardwidth="30vw"
              tooltipShow={true}
              zoomOn={false}
              isModal={true}
              drillOn={true}
            />
          }
        />
      ) : null}

      {mapModel ? (
        <OpenChartModal
          show={mapModel}
          onHide={() => setMapModel(false)}
          chartTitle="India Map with Population (In Millions)"
          chartText2=""
          crudModalType="mapChart"
          chartType={
            <IndiaMapChart
              chartId="indiamap2"
              toolTipShow={true}
              parentWidth="350"
              parentHeight="350"
              isModal={true}
            />
          }
        />
      ) : null}

      {openGroupCrudModal ? (
        <CrudGroupChartModal
        show={openGroupCrudModal}
          onHide={() => {setOpenGroupCrudModal(false); setaddDataCrud(false);}}
        />
      ) : null}

      {openStackedCrudModal ? (
        <CrudStackedChartModal
          show={openStackedCrudModal}
          onHide={() => {setOpenStackedCrudModal(false); setaddDataCrud(false);}}
        />
      ) : null}

      {openPieCrudModal ? (
        <CrudPieChartModal
          show={openPieCrudModal}
          onHide={() => {setOpenPieCrudModal(false); setaddDataCrud(false);}}
        />
      ) : null}

      {openCrudModal ? (
        <CrudSunBrustChartModal
          show={openCrudModal}
          onHide={() => {setOpenCrudModal(false); setaddDataCrud(false);}}
        />
      ) : null}

      {openCandleCrudModal ? (
        <CrudCandleChartModal
          show={openCandleCrudModal}
          onHide={() => {setOpenCandleCrudModal(false); setaddDataCrud(false);}}
        />
      ) : null}
 
      {stateMap.openMapCrudModal ? (
        <CrudMapChartModal
          show={stateMap.openMapCrudModal}
          onHide={() => {setStateMap({ ...stateMap, openMapCrudModal: false, }), setaddDataCrud(false);}}
        />
      ) : null}

      {showToast ? <CustomToast /> : null}
    </>
  );
}

export default Chart;
