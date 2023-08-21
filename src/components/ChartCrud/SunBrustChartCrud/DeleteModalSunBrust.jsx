import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomContext } from "src/components/CustomContext";

function DeleteModalSunBrust({ show, setShow, handleClose }) {
  const { deleteId, setShowToast, setDonutDataSet, setUpdateDataDonut } =
    useContext(CustomContext);

  const deleteData = () => {
    setDonutDataSet((current) => current.map((val)=> val.filter((ele) => ele.id !== deleteId)));
    setUpdateDataDonut(true);
    setShow(false);
    setShowToast({ show: true, msg: "Delete Successfully", type: "success" });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <p className="mb-2 fs-2">Are you sure?</p>
        <p>Do you really want to delete this Record?</p>
        <div className="w-100 d-flex flex-row-reverse">
        <button className="btn-sub px-3 py-2 border-0 my-2" onClick={deleteData}>Delete</button>
          <Button
            variant="secondary"
            className="bg-transparent border-0"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModalSunBrust;
