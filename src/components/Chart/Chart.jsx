import MultiLevelDonutChart from "./DonutChart/MultiLevelDonutChart";
import GroupChart from "./GroupChart/GroupChart";
import PieChart from "./PieChart/PieChart";
import StackedChart from "./StackedChart/StackedChart";

import "./Chart.scss";

import { useContext, useState } from "react";
import {
  CrudCandleChartModal,
  CrudDonutChartModal,
  CrudGroupChartModal,
  CrudMapChartModal,
  CrudPieChartModal,
  CrudStackedChartModal,
  DonutChartModal,
  MapChartModal,
  OpenChartModal,
  PieChartModal,
} from "../ChartModal/ChartModal";
import { CustomContext } from "../CustomContext";
import CandleStickChart from "./CandleStickChart/CandleStickChart";
import CustomToast from "../ToastComponent/CustomToast";
import IndiaMapChart from "./MapChart/IndiaMap/IndiaMapChart";

function Chart() {
  const [groupModel, setGroupModel] = useState(false);
  const [donutModel, setDonutModel] = useState(false);
  const [pieModel, setPieModel] = useState(false);
  const [stackedModel, setStackedModel] = useState(false);
  const [mapModel, setMapModel] = useState(false);
  const [candleModel, setCandleModel] = useState(false);

  const {
    showToast,
    openGroupCrudModal,
    setOpenGroupCrudModal,
    openStackedCrudModal,
    setOpenStackedCrudModal,
    openPieCrudModal,
    setOpenPieCrudModal,
    openDonutCrudModal,
    setOpenDonutCrudModal,
    openCandleCrudModal,
    setOpenCandleCrudModal,
    stateMap, setStateMap
  } = useContext(CustomContext);

  const openDonutModel = () => {
    setDonutModel(true);
  };

  const openGroupModel = () => {
    setGroupModel(true);
  };

  const openPieModel = () => {
    setPieModel(true);
  };

  const openStackedModel = () => {
    setStackedModel(true);
  };

  const openMapModel = () => {
    setMapModel(true);
  };

  const openCandleModel = () => {
    setCandleModel(true);
  };

  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col my-2 d-flex justify-content-center my-card"
            onClick={openPieModel}
          >
            <PieChart
              chartId="pie1"
              parentWidth="20em"
              tooltipShow={false}
              onClickOpenInside={false}
            />
          </div>
          <div
            className="col my-2 d-flex justify-content-center my-card"
            onClick={openGroupModel}
          >
            <GroupChart
              chartId="group1"
              parentWidth="350px"
              parentHeight="250px"
              tooltipShow={false}
            />
          </div>
        </div>
        <div className="row align-items-center">
          <div
            className="col my-2 d-flex justify-content-center my-card"
            onClick={openDonutModel}
          >
            <MultiLevelDonutChart
              chartId="donutchart1"
              cardwidth="15em"
              tooltipShow={false}
              zoomOn={false}
              isModal={false}
            />
          </div>
          <div
            className="col my-2 d-flex justify-content-center my-card"
            onClick={openStackedModel}
          >
            <StackedChart
              chartId="stacked1"
              parentWidth="350px"
              parentHeight="250px"
              tooltipShow={false}
            />
          </div>
        </div>
        <div className="row align-items-center">
          <div
            className="col my-2 d-flex justify-content-center my-card"
            onClick={openMapModel}
          >
            <IndiaMapChart
              chartId="indiamap1"
              toolTipShow={false}
              parentWidth="300"
              parentHeight="300"
              isModal={false}
            />
          </div>
          <div
            className="col my-2 d-flex justify-content-center my-card"
            onClick={openCandleModel}
          >
            <CandleStickChart
              chartId="candle1"
              parentWidth="350px"
              parentHeight="250px"
            />
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
              tooltipShow={true}
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
              tooltipShow={true}
            />
          }
        />
      ) : null}

      {candleModel ? (
        <OpenChartModal
          show={candleModel}
          onHide={() => setCandleModel(false)}
          chartTitle="CandleStick Chart"
          crudModalType="candleStickChart"
          chartType={
            <CandleStickChart
              chartId="candle2"
              parentWidth="75vw"
              parentHeight="65vh"
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

      {donutModel ? (
        <OpenChartModal
          show={donutModel}
          onHide={() => setDonutModel(false)}
          chartTitle="Indian Cities With Population (In Millions)"
          chartText2=""
          crudModalType="donutChart"
          chartType={
            <MultiLevelDonutChart
              chartId="donutchart2"
              cardwidth="30vw"
              tooltipShow={true}
              zoomOn={true}
              isModal={true}
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
          onHide={() => setOpenGroupCrudModal(false)}
        />
      ) : null}

      {openStackedCrudModal ? (
        <CrudStackedChartModal
          show={openStackedCrudModal}
          onHide={() => setOpenStackedCrudModal(false)}
        />
      ) : null}

      {openPieCrudModal ? (
        <CrudPieChartModal
          show={openPieCrudModal}
          onHide={() => setOpenPieCrudModal(false)}
        />
      ) : null}

      {openDonutCrudModal ? (
        <CrudDonutChartModal
          show={openDonutCrudModal}
          onHide={() => setOpenDonutCrudModal(false)}
        />
      ) : null}

      {openCandleCrudModal ? (
        <CrudCandleChartModal
          show={openCandleCrudModal}
          onHide={() => setOpenCandleCrudModal(false)}
        />
      ) : null}

      {stateMap.openMapCrudModal ? (
        <CrudMapChartModal
          show={stateMap.openMapCrudModal}
          onHide={() => setStateMap({ ...stateMap, openMapCrudModal: false, })}
        />
      ) : null}

      {showToast ? <CustomToast /> : null}
    </>
  );
}

export default Chart;
