import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomContext } from "src/components/CustomContext";

import "../AddData.scss";

const addSchema = Yup.object({
  Month: Yup.string()
    .min(2, "Atleast 2 Character")
    .max(25, "Character less then 25")
    .required("Please Enter Month"),
  US: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required()
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
  Europe: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required()
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
  Asia: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required()
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
  SouthAmerica: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required()
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
});

const AddDataStacked = () => {
  const {
    setShowToast,
    isEdit,
    updateValue,
    stackedObj,
    setStackedObj,
    setaddDataCrud,
    setUpdateDataStacked,
  } = useContext(CustomContext);

  let upd_obj;
  if(isEdit){
    upd_obj = stackedObj?.findIndex((ele) => ele?.id === updateValue?.id);
  }

  const addInitialValues = {
    Month: stackedObj[upd_obj]?.Month || "",
    US: stackedObj[upd_obj]?.US || "",
    Europe: stackedObj[upd_obj]?.Europe || "",
    Asia: stackedObj[upd_obj]?.Asia || "",
    SouthAmerica: stackedObj[upd_obj]?.SouthAmerica || "",
    id: stackedObj[upd_obj]?.id || "",
  };

  const addDataFormik = useFormik({
    initialValues: addInitialValues,
    validationSchema: addSchema,
    onSubmit: (value, action) => {
      action.resetForm();
      if (isEdit) {
        let updatedArray = stackedObj.map((obj) =>
          obj?.id == value.id ? value : obj
        );
        setStackedObj(updatedArray);
        setShowToast({
          show: true,
          msg: "Record Updated Successfully",
          type: "success",
        });
        setUpdateDataStacked(true);
      } else {
        const newId = stackedObj.length + 1;
        setStackedObj((previous) => [
          ...previous,
          {
            id: newId,
            Month: value.Month,
            US: value.US,
            Europe: value.Europe,
            Asia: value.Asia,
            SouthAmerica: value.SouthAmerica,
          },
        ]);
        setShowToast({
          show: true,
          msg: "Record Added Successfully",
          type: "success",
        });
        setUpdateDataStacked(true);
      }
      setaddDataCrud(false);
    },
  });

  return (
    <>
      <form className="px-3 h-100 overflow-hidden" onSubmit={addDataFormik.handleSubmit}>
        <div className="overflow-auto form-div">
          <label className="form-label" htmlFor="Month">
            Month
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="text"
            id="Month"
            name="Month"
            value={addDataFormik.values.Month}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter Month"
            autoComplete="off"
          />
          {addDataFormik.errors.Month && addDataFormik.touched.Month ? (
            <p className="text-danger text-center mt-2">
              {addDataFormik.errors.Month}
            </p>
          ) : null}

          <label className="form-label" htmlFor="US">
            US
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="US"
            name="US"
            value={addDataFormik.values.US}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter US Value"
            autoComplete="off"
          />
          {addDataFormik.errors.US && addDataFormik.touched.US ? (
            <p className="text-danger text-center mt-2">
              {addDataFormik.errors.US}
            </p>
          ) : null}

          <label className="form-label" htmlFor="Europe">
            Europe
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="Europe"
            name="Europe"
            value={addDataFormik.values.Europe}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter Europe Value"
            autoComplete="off"
          />
          {addDataFormik.errors.Europe && addDataFormik.touched.Europe ? (
            <p className="text-danger text-center mt-2">
              {addDataFormik.errors.Europe}
            </p>
          ) : null}

          <label className="form-label" htmlFor="Asia">
            Asia
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="Asia"
            name="Asia"
            value={addDataFormik.values.Asia}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter Asia Value"
            autoComplete="off"
          />
          {addDataFormik.errors.Asia && addDataFormik.touched.Asia ? (
            <p className="text-danger text-center mt-2">
              {addDataFormik.errors.Asia}
            </p>
          ) : null}

          <label className="form-label" htmlFor="SouthAmerica">
            SouthAmerica
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="SouthAmerica"
            name="SouthAmerica"
            value={addDataFormik.values.SouthAmerica}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter SouthAmeica Value"
            autoComplete="off"
          />
          {addDataFormik.errors.SouthAmerica &&
            addDataFormik.touched.SouthAmerica ? (
            <p className="text-danger text-center mt-2">
              {addDataFormik.errors.SouthAmerica}
            </p>
          ) : null}
        </div>

        <div className="d-flex flex-row-reverse">
        {isEdit ? (
          <input
            type="submit"
            value="Update"
            className="btn-sub px-3 py-2 border-0 my-2"
          />
        ) : (
          <input type="submit" className="btn-sub px-3 py-2 border-0 my-2" />
        )}
        <p role="button" className="px-3 py-2 border-0 my-2" onClick={() => setaddDataCrud(false)}>Cancel</p>
        </div>
      </form>
    </>
  );
};

export default AddDataStacked;
