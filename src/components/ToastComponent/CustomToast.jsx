import React, { useContext } from "react";
import { ToastContainer } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { CustomContext } from "../CustomContext";
import "./CustomToast.scss";

function CustomToast() {
  const { showToast, setShowToast } = useContext(CustomContext);
  const status = showToast.type;

  return (
    <>
      <div>
        {(() => {
          switch (status) {
            case "success":
              return (
                <Row>
                  <Col xs={6}>
                    <ToastContainer
                      position="top-end"
                      className="m-2 toast-container-design"
                    >
                      <Toast
                        className="toast-design"
                        animation={true}
                        onClose={() =>
                          setShowToast((showToast) => ({
                            show: false,
                            msg: "",
                          }))
                        }
                        show={showToast.show}
                        delay={3000}
                        autohide
                      >
                        <Toast.Body className="toast-body-success p-0">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center align-items-center px-2 ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-check-lg"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                              </svg>
                            </div>
                            <div className="p-1">
                              <h4>Success</h4>
                              <p className="toast-message">{showToast.msg}</p>
                            </div>
                          </div>
                        </Toast.Body>
                      </Toast>
                    </ToastContainer>
                  </Col>
                </Row>
              );
            case "error":
              return (
                <Row>
                  <Col xs={6}>
                    <ToastContainer
                      position="top-end"
                      className="m-2 toast-container-design"
                    >
                      <Toast
                        className="toast-design"
                        animation={true}
                        onClose={() =>
                          setShowToast(() => ({
                            show: false,
                            msg: "",
                          }))
                        }
                        show={showToast.show}
                        delay={3000}
                        autohide
                      >
                        <Toast.Body className="toast-body-error p-0">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center align-items-center px-2 ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-x"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                              </svg>
                            </div>
                            <div className="p-1">
                              <h4>Error</h4>
                              <p className="toast-message">{showToast.msg}</p>
                            </div>
                          </div>
                        </Toast.Body>
                      </Toast>
                    </ToastContainer>
                  </Col>
                </Row>
              );
            case "warning":
              return (
                <Row>
                  <Col xs={6}>
                    <ToastContainer
                      position="top-end"
                      className="m-2 toast-container-design"
                    >
                      <Toast
                        className="toast-design"
                        animation={true}
                        onClose={() =>
                          setShowToast((showToast) => ({
                            show: false,
                            msg: "",
                          }))
                        }
                        show={showToast.show}
                        delay={3000}
                        autohide
                      >
                        <Toast.Body className="toast-body-warning p-0">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center align-items-center px-2 ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-x"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                              </svg>
                            </div>
                            <div className="p-1">
                              <h4>Error</h4>
                              <p className="toast-message">{showToast.msg}</p>
                            </div>
                          </div>
                        </Toast.Body>
                      </Toast>
                    </ToastContainer>
                  </Col>
                </Row>
              );
            default:
              return null;
          }
        })()}
      </div>
    </>
  );
}

export default CustomToast;
