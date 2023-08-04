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
import "./ChartModal.scss";
import AddDataMap from "../ChartCrud/IndiaMapChartCrud/AddDataMap";
import ViewDataMap from "../ChartCrud/IndiaMapChartCrud/ViewDataMap";
import ViewDataDonut from "../ChartCrud/DonutChartCrud/ViewDataDonut";
import AddDataDonut from "../ChartCrud/DonutChartCrud/AddDataDonut";

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
        dialogClassName="my-crud-modal"
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="d-flex align-items-center flex-column justify-content-between">
          <div className="w-100 px-5 mb-2" id="contained-modal-title-vcenter">
            <div className="d-flex justify-content-between">
              <h5> {chartTitle} </h5>
              <div
                className="add-btn text-secondary ms-5"
                role="button"
                onClick={openCrud}
              >
                {crudModalType ? (
                  <h5 className="me-3 text-dark">
                    Edit Data{" "}
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

export function CrudGroupChartModal(props) {
  const { addGroupCrudModal, setAddGroupCrudModal, setUpdateValue, setIsEdit } =
    useContext(CustomContext);

  const openAddGroup = () => {
    setAddGroupCrudModal(true);
    setUpdateValue("");
    setIsEdit(false);
  };

  const backToView = () => {
    setAddGroupCrudModal(false);
  };

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Petrol v/s Diesel (In $USD)</h4>
          {addGroupCrudModal ? (
            <div onClick={backToView}>
              <span role="button" className="fs-4">
                Back
              </span>
            </div>
          ) : (
            <div onClick={openAddGroup}>
              <span role="button" className="fs-4">
                Add
              </span>
            </div>
          )}
        </div>
        <div className="w-100 body-crud my-2">
          {addGroupCrudModal ? (
            <AddDataGroup />
          ) : (
            <ViewDataGroup hide={props.onHide} />
          )}
        </div>
        <Button
          className="mt-3"
          style={{ height: "7%" }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export function CrudStackedChartModal(props) {
  const {
    addStackedCrudModal,
    setAddStackedCrudModal,
    setUpdateValue,
    setIsEdit,
  } = useContext(CustomContext);

  const openAddGroup = () => {
    setAddStackedCrudModal(true);
    setUpdateValue("");
    setIsEdit(false);
  };

  const backToView = () => {
    setAddStackedCrudModal(false);
  };

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Oil Consumption By Country (In Barrels)</h4>
          {addStackedCrudModal ? (
            <div onClick={backToView}>
              <span role="button" className="fs-4">
                Back
              </span>
            </div>
          ) : (
            <div onClick={openAddGroup}>
              <span role="button" className="fs-4">
                Add
              </span>
            </div>
          )}
        </div>
        <div className="w-100 body-crud my-2">
          {addStackedCrudModal ? (
            <AddDataStacked />
          ) : (
            <ViewDataStacked hide={props.onHide} />
          )}
        </div>
        <Button
          className="mt-3"
          style={{ height: "7%" }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export function CrudDonutChartModal(props) {
  const { setUpdateValue, setIsEdit, addDonutCrudModal, setAddDonutCrudModal } =
    useContext(CustomContext);

  const openAddGroup = () => {
    setAddDonutCrudModal(true);
    setUpdateValue("");
    setIsEdit(false);
  };

  const backToView = () => {
    setAddDonutCrudModal(false);
  };

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Oil Consumption By Country (In Barrels)</h4>
          {addDonutCrudModal ? (
            <div onClick={backToView}>
              <span role="button" className="fs-4">
                Back
              </span>
            </div>
          ) : (
            <div onClick={openAddGroup} className="d-flex align-items-center"  role="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="fs-4">Add</span>
            </div>
          )}
        </div>
        <div className="w-100 body-crud my-2">
          {addDonutCrudModal ? (
            <AddDataDonut />
          ) : (
            <ViewDataDonut hide={props.onHide} />
          )}
        </div>
        <Button
          className="mt-3"
          style={{ height: "7%" }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export function CrudCandleChartModal(props) {
  const {
    addCandleCrudModal,
    setAddCandleCrudModal,
    setUpdateValue,
    setIsEdit,
  } = useContext(CustomContext);

  const openAddGroup = () => {
    setAddCandleCrudModal(true);
    setUpdateValue("");
    setIsEdit(false);
  };

  const backToView = () => {
    setAddCandleCrudModal(false);
  };

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Crud Candle</h4>
          {addCandleCrudModal ? (
            <div onClick={backToView}>
              <span role="button" className="fs-4">
                Back
              </span>
            </div>
          ) : (
            <div onClick={openAddGroup}>
              <span role="button" className="fs-4">
                Add
              </span>
            </div>
          )}
        </div>
        <div className="w-100 body-crud my-2">
          {addCandleCrudModal ? (
            <AddDataCandle />
          ) : (
            <ViewDataCandle hide={props.onHide} />
          )}
        </div>
        <Button
          className="mt-3"
          style={{ height: "7%" }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export function CrudMapChartModal(props) {
  const {
    addCandleCrudModal,
    setAddCandleCrudModal,
    setUpdateValue,
    setIsEdit,
  } = useContext(CustomContext);

  const openAddGroup = () => {
    setAddCandleCrudModal(true);
    setUpdateValue("");
    setIsEdit(false);
  };

  const backToView = () => {
    setAddCandleCrudModal(false);
  };

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Crud India Map</h4>
          {addCandleCrudModal ? (
            <div onClick={backToView}>
              <span role="button" className="fs-4">
                Back
              </span>
            </div>
          ) : null}
        </div>
        <div className="w-100 body-crud my-2">
          {addCandleCrudModal ? (
            <AddDataMap />
          ) : (
            <ViewDataMap hide={props.onHide} />
          )}
        </div>
        <Button
          className="mt-3"
          style={{ height: "7%" }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export function CrudPieChartModal(props) {
  const { setUpdateValue, setIsEdit, addPieCrudModal, setAddPieCrudModal } =
    useContext(CustomContext);

  const openAddGroup = () => {
    setAddPieCrudModal(true);
    setUpdateValue("");
    setIsEdit(false);
  };

  const backToView = () => {
    setAddPieCrudModal(false);
  };

  return (
    <Modal
      {...props}
      dialogClassName="my-crud-modal"
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex align-items-center flex-column"
        style={{ height: "inherit" }}
      >
        <div className="header-crud w-100 d-flex justify-content-between">
          <h4>Oil Consumption By Country (In Barrels)</h4>
          {addPieCrudModal ? (
            <div onClick={backToView}>
              <span role="button" className="fs-4">
                Back
              </span>
            </div>
          ) : (
            <div onClick={openAddGroup}>
              <span role="button" className="fs-4">
                Add
              </span>
            </div>
          )}
        </div>
        <div className="w-100 body-crud my-2">
          {addPieCrudModal ? (
            <AddDataPie />
          ) : (
            <ViewDataPie hide={props.onHide} />
          )}
        </div>
        <Button
          className="mt-3"
          style={{ height: "7%" }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}
