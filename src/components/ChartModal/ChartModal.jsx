import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useContext } from "react";
import ViewDataGroup from "../ChartCrud/GroupChartCrud/ViewDataGroup";
import { CustomContext } from "../CustomContext";
import AddDataGroup from "../ChartCrud/GroupChartCrud/AddDataGroup";
import ViewDataStacked from "../ChartCrud/StackedChartCrud/ViewDataStacked";
import AddDataStacked from "../ChartCrud/StackedChartCrud/AddDataStacked";
import AddDataPie from "../ChartCrud/PieChartCrud/AddDataPie";
import ViewDataPie from "../ChartCrud/PieChartCrud/ViewDataPie";
import ViewDataCandle from "../ChartCrud/CandleStickChartCrud/ViewDataCandle";
import AddDataCandle from "../ChartCrud/CandleStickChartCrud/AddDataCandle";
import AddDataMap from "../ChartCrud/IndiaMapChartCrud/AddDataMap";
import ViewDataMap from "../ChartCrud/IndiaMapChartCrud/ViewDataMap";
import ViewDataSunBrust from "../ChartCrud/SunBrustChartCrud/ViewDataSunBrust";
import AddDataSunBrust from "../ChartCrud/SunBrustChartCrud/AddDataSunBrust";
import closeIcon from "../../Images/Icon/closeicon.svg"

import "./ChartModal.scss";

export const OpenChartModal = ({
  show,
  onHide,
  chartTitle,
  chartType,
  crudModalType,
}) => {
  const {
    setOpenGroupCrudModal,
    setOpenCandleCrudModal,
    setOpenStackedCrudModal,
    setOpenDonutCrudModal,
    setOpenPieCrudModal,
    setOpenCrudModal,
    stateMap, setStateMap
  } = useContext(CustomContext);

  const openCrud = () => {
    switch (crudModalType) {
      case "candleStickChart":
        setOpenCandleCrudModal(true);
        break;
      case "groupChart":
        setOpenGroupCrudModal(true);
        break;
      case "stackedChart":
        setOpenStackedCrudModal(true);
        break;
      case "pieChart":
        setOpenPieCrudModal(true);
        break;
      case "donutChart":
        setOpenDonutCrudModal(true);
        break;
      case "sunBrustChart":
        setOpenCrudModal(true);
        break;
      case "mapChart":
        setStateMap({
          ...stateMap,
          openMapCrudModal: true,
        });
      default:
        null;
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="first-modal my-crud-modal"
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="d-flex align-items-center flex-column justify-content-between">
          <div className="w-100 mb-2 modal-heading" id="contained-modal-title-vcenter">
            <div className="d-flex justify-content-between">
              <h5> {chartTitle} </h5>
              <div
                className="add-btn text-secondary ms-5"
                role="button"
                onClick={openCrud}
              >
                {crudModalType ? (
                  <h5 className="me-3 text-dark">
                    <span className="edit-text">Edit Data{" "}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="black"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </h5>
                ) : null}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center b-1">{chartType}</div>
          <div>
            <Button className="mt-3" onClick={onHide}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const CrudGroupChartModal = (props) => {
  const { setaddDataCrud, setOpenGroupCrudModal,
  } = useContext(CustomContext);

  const closeBtn = () => {
    setaddDataCrud(false);
    setOpenGroupCrudModal(false);
  }

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      // fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Petrol v/s Diesel (In $USD)</h4>
          <img src={closeIcon} role="button" onClick={closeBtn}  alt="" />
        </div>
        <div className="w-100 body-crud my-2">
            <AddDataGroup />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export function CrudStackedChartModal(props) {
  const { addDataCrud, setaddDataCrud, setOpenStackedCrudModal,
  } = useContext(CustomContext);

  const closeBtn = () => {
    setaddDataCrud(false);
    setOpenStackedCrudModal(false);
  }

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      // fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Oil Consumption By Country (In Barrels)</h4>
          <img src={closeIcon} role="button" onClick={closeBtn}  alt="" />
        </div>
        <div className="w-100 body-crud my-2">
            <AddDataStacked/>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export function CrudSunBrustChartModal(props) {
  const { setaddDataCrud, setOpenCrudModal } = useContext(CustomContext);

  const closeBtn = () => {
    setaddDataCrud(false);
    setOpenCrudModal(false);
  }

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      // fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>World Population (In Millions)</h4>
          <img src={closeIcon} role="button" onClick={closeBtn}  alt="" />
        </div>
        <div className="w-100 body-crud my-2">
            <AddDataSunBrust />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export function CrudCandleChartModal(props) {
  const { addDataCrud, setaddDataCrud, setOpenCandleCrudModal } = useContext(CustomContext);

  const closeBtn = () => {
    setaddDataCrud(false);
    setOpenCandleCrudModal(false);
  }

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      // fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>CandleStick Chart of ITC </h4>
          <img src={closeIcon} role="button" onClick={closeBtn}  alt="" />
        </div>
        <div className="w-100 body-crud my-2">
          {addDataCrud ? (
            <AddDataCandle />
          ) : (
            <ViewDataCandle hide={props.onHide} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export function CrudMapChartModal(props) {
  const {
    addDataCrud,
    setaddDataCrud,
    setStateMap,
    stateMap
  } = useContext(CustomContext);

  const backToView = () => {
    setaddDataCrud(false);
  };

  const closeBtn = () => {
    setaddDataCrud(false);
    setStateMap({ ...stateMap, openMapCrudModal: false, });
  }

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      // fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>India Map with Population (In Millions)</h4>
          <img src={closeIcon} role="button" onClick={closeBtn}  alt="" />
        </div>
        <div className="w-100 body-crud my-2">
          {addDataCrud ? (
            <AddDataMap />
          ) : (
            <ViewDataMap hide={props.onHide} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export function CrudPieChartModal(props) {
  const { addDataCrud, setaddDataCrud, setOpenPieCrudModal } =
    useContext(CustomContext);

  const closeBtn = () => {
    setaddDataCrud(false);
    setOpenPieCrudModal(false);
  }

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      // fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Countries With Population (in Millions)</h4>
          <img src={closeIcon} role="button" onClick={closeBtn}  alt="" />
        </div>
        <div className="w-100 body-crud my-2">
            <AddDataPie />
        </div>
      </Modal.Body>
    </Modal>
  );
}
