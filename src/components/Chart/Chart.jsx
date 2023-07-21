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
              parentHeight="70vh"
            />
          }
        />
      ) : null}

      {pieModel ? (
        <PieChartModal show={pieModel} onHide={() => setPieModel(false)} />
      ) : null}

      {donutModel ? (
        <DonutChartModal
          show={donutModel}
          onHide={() => setDonutModel(false)}
        />
      ) : null}

      {mapModel ? (
        <MapChartModal show={mapModel} onHide={() => setMapModel(false)} />
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

      {showToast ? <CustomToast /> : null}
    </>
  );
}

export default Chart;
