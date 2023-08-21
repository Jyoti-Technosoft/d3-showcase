import React, { useContext, useEffect, useRef, useState } from "react";
import { CustomContext } from "src/components/CustomContext";
import DeleteModalSunBrust from "./DeleteModalSunBrust";

import "../ViewData.scss";

const ViewDataSunBrust = () => {
  const [show, setShow] = useState(false);
  const {
    crudData,
    setDeleteId,
    showToast,
    setUpdateValue,
    setIsEdit,
    sunBrustDataSet,
    setaddDataCrud,
  } = useContext(CustomContext);

  const elementRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editData = (val) => {
    setUpdateValue(val);
    setIsEdit(true);
    setaddDataCrud(true);
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
          className={`side-arrow-btn left-btn border-0 ${arrowDisableLeft ? "d-none" : "d-block"
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
          <table className="w-100 table charts-data-table">
            <thead>

            </thead>
            <tbody>
              {sunBrustDataSet.children.map(region => (
                <React.Fragment key={region.name}>
                  <tr>
                    <th colSpan="12" className="region-cell" style={{background: "#303c54", color: "#ffffff"}}>{region.name}</th>
                  </tr>
                  {region.children.map(subregion => (
                    <React.Fragment key={subregion.name}>
                      <tr>
                        <td className="subregion-cell ps-2">{subregion.name}</td>
                        {subregion.children.map(city => (
                          <React.Fragment key={city.name}>
                            <td>{city.name}</td>
                            <td>{city.value}</td>
                            <td>
                              <button className="bg-transparent border-0 text-info" onClick={() => editData({city,region,subregion})}>Edit</button>
                            </td>
                          </React.Fragment>
                        ))}
                      </tr>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </tbody>

          </table>
        </div>
        <button
          onClick={() => {
            handleHorizantalScroll(40);
          }}
          className={`side-arrow-btn right-btn border-0 ${arrowDisableRight ? "d-none" : "d-block"
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
        <DeleteModalSunBrust
          show={show}
          setShow={setShow}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default ViewDataSunBrust;
