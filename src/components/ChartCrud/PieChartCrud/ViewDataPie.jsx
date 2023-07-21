import React, { useContext, useEffect, useRef, useState } from "react";
import { CustomContext } from "src/components/CustomContext";
import DeleteModalPie from "./DeleteModalPie";

import "./ViewDataPie.scss";

const ViewDataPie = () => {
  const [show, setShow] = useState(false);
  const {
    crudData,
    setDeleteId,
    showToast,
    setUpdateValue,
    setIsEdit,
    pieDataSet,
    setAddPieCrudModal,
  } = useContext(CustomContext);

  const elementRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editData = (val) => {
    setUpdateValue(val);
    setIsEdit(true);
    setAddPieCrudModal(true);
  };

  const [arrowDisableLeft, setArrowDisableLeft] = useState(true);
  const [arrowDisableRight, setArrowDisableRight] = useState(false);

  useEffect(() => {
    toggleArrowBtn(0);
  }, [crudData]);

  window.addEventListener(
    "resize",
    function () {
      toggleArrowBtn(0);
    },
    true
  );

  const handleHorizantalScroll = (step) => {
    toggleArrowBtn(step);
  };

  const toggleArrowBtn = (step) => {
    let element = elementRef?.current;
    if (elementRef?.current) {
      if (element?.scrollLeft === 0) {
        setArrowDisableLeft(true);
      } else {
        setArrowDisableLeft(false);
        element["scrollLeft"] += step;
      }
      if (element?.scrollLeft + element?.clientWidth == element?.scrollWidth) {
        setArrowDisableRight(true);
      } else {
        setArrowDisableRight(false);
        element["scrollLeft"] += step;
      }
    }
  };

  return (
    <>
      <div className="custom-arrow-scroll-div d-flex justify-content-center">
        <button
          onClick={() => {
            handleHorizantalScroll(-40);
          }}
          className={`side-arrow-btn left-btn border-0 ${
            arrowDisableLeft ? "d-none" : "d-block"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
        </button>
        <div className="table-container w-100" ref={elementRef}>
          <table className="w-100 table table-hover">
            <thead>
              <tr className="table-header">
                <th className="p-2 text-center">No.</th>
                <th className="p-2 text-center">Country</th>
                <th className="p-2 text-center">Value</th>
                <th colSpan="2" className="p-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pieDataSet?.map((val, index) => {
                return (
                  <tr key={index}>
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2 text-center">{val.country}</td>
                    <td className="p-2 text-center">{val.value}</td>
                    <td className="p-2 text-center text-info">
                      <p role="button" onClick={() => editData(val)}>
                        Edit
                      </p>
                    </td>
                    <td className="p-2 text-center text-danger">
                      <p
                        role="button"
                        onClick={() => {
                          setDeleteId(val.id);
                          handleShow();
                        }}
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => {
            handleHorizantalScroll(40);
          }}
          className={`side-arrow-btn right-btn border-0 ${
            arrowDisableRight ? "d-none" : "d-block"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-right-fill"
            viewBox="0 0 16 16"
          >
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </button>
      </div>
      {
        <DeleteModalPie
          show={show}
          setShow={setShow}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default ViewDataPie;
