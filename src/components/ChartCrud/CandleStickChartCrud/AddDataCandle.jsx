import React, { useContext } from "react";
import { CustomContext } from "src/components/CustomContext";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../AddData.scss";

function convertToFormattedDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const AddDataCandle = () => {

  const addSchema = Yup.object({
    date: Yup.date()
      .required("Please enter a date")
      .test("unique-date", "Date already exists in the dataset", function (value) {
        const existingDates = newCandle.map((data) => data.date);
        return !existingDates.includes(convertToFormattedDate(value));
      }),
    open: Yup.number()
      .typeError("Please enter a number value only")
      .nullable()
      .required()
      .min(0)
      .moreThan(-1, "Negative values not accepted"),
    high: Yup.number()
      .typeError("Please enter a number value only")
      .nullable()
      .required()
      .min(0)
      .moreThan(-1, "Negative values not accepted")
      .min(
        Yup.ref("open"),
        "High value must be More than or Equal to Open value"
      ),
    low: Yup.number()
      .typeError("Please enter a number value only")
      .nullable()
      .required()
      .min(0)
      .moreThan(-1, "Negative values not accepted")
      .max(Yup.ref("high"), "Low value must be less than High value"),
    close: Yup.number()
      .typeError("Please enter a number value only")
      .nullable()
      .required()
      .min(0)
      .moreThan(-1, "Negative values not accepted")
      .min(Yup.ref("low"), "Close value must be More than or Equal Close value"),
  });
  
  const addSchema2 = Yup.object({
    open: Yup.number()
      .typeError("Please enter a number value only")
      .nullable()
      .required()
      .min(0)
      .moreThan(-1, "Negative values not accepted"),
    high: Yup.number()
      .typeError("Please enter a number value only")
      .nullable()
      .required()
      .min(0)
      .moreThan(-1, "Negative values not accepted")
      .min(
        Yup.ref("open"),
        "High value must be More than or Equal to Open value"
      ),
    low: Yup.number()
      .typeError("Please enter a number value only")
      .nullable()
      .required()
      .min(0)
      .moreThan(-1, "Negative values not accepted")
      .max(Yup.ref("high"), "Low value must be less than High value"),
    close: Yup.number()
      .typeError("Please enter a number value only")
      .nullable()
      .required()
      .min(0)
      .moreThan(-1, "Negative values not accepted")
      .min(Yup.ref("low"), "Close value must be More than or Equal Close value"),
  });

  const {
    setShowToast,
    isEdit,
    updateValue,
    newCandle,
    setNewCandle,
    setaddDataCrud,
    setUpdateDataCandle,
  } = useContext(CustomContext);

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  let upd_obj;
  if (isEdit) {
    upd_obj = newCandle?.findIndex((ele) => ele?.id === updateValue?.id);
  }

  const addInitialValues = {
    date: newCandle[upd_obj]?.date || "",
    open: newCandle[upd_obj]?.open || "",
    high: newCandle[upd_obj]?.high || "",
    low: newCandle[upd_obj]?.low || "",
    close: newCandle[upd_obj]?.close || "",
    id: newCandle[upd_obj]?.id || "",
  };

  const addDataFormik = useFormik({
    initialValues: addInitialValues,
    validationSchema: isEdit ? addSchema2 : addSchema,
    onSubmit: (value, action) => {
      action.resetForm();
      if (isEdit) {
        let updatedArray = newCandle.map((obj) =>
          obj?.id == value.id ? value : obj
        );
        setNewCandle(updatedArray);
        setShowToast({
          show: true,
          msg: "Record Updated Successfully",
          type: "success",
        });
        setUpdateDataCandle(true);
      } else {
        const newId = newCandle.length + 1;
        setNewCandle((previous) => [
          ...previous,
          {
            id: newId,
            date: new Date(value.date),
            open: value.open,
            high: value.high,
            low: value.low,
            close: value.close,
          },
        ]);
        setShowToast({
          show: true,
          msg: "Record Added Successfully",
          type: "success",
        });
        setUpdateDataCandle(true);
      }
      setaddDataCrud(false);
    },
  });

  return (
    <>
      <form className="px-3 h-100 overflow-hidden" onSubmit={addDataFormik.handleSubmit}>
        <div className="overflow-auto form-div">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          {
            isEdit ?
              null
              :
              <input
                className="input-style p-2 w-100 border-0 my-2"
                type="date"
                id="date"
                name="date"
                max={maxDate}
                value={addDataFormik.values.date}
                onChange={addDataFormik.handleChange}
                onBlur={addDataFormik.handleBlur}
                placeholder="Enter date"
                autoComplete="off"
              />
          }
          {addDataFormik.errors.date && addDataFormik.touched.date ? (
            <p className="text-danger mt-2">
              {addDataFormik.errors.date}
            </p>
          ) : null}

          <label className="form-label" htmlFor="open">
            Open
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="open"
            name="open"
            value={addDataFormik.values.open}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter open Value"
            autoComplete="off"
          />
          {addDataFormik.errors.open && addDataFormik.touched.open ? (
            <p className="text-danger mt-2">
              {addDataFormik.errors.open}
            </p>
          ) : null}

          <label className="form-label" htmlFor="high">
            High
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="high"
            name="high"
            value={addDataFormik.values.high}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter high Value"
            autoComplete="off"
          />
          {addDataFormik.errors.high && addDataFormik.touched.high ? (
            <p className="text-danger mt-2">
              {addDataFormik.errors.high}
            </p>
          ) : null}

          <label className="form-label" htmlFor="low">
            Low
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="low"
            name="low"
            value={addDataFormik.values.low}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter Low Value"
            autoComplete="off"
          />
          {addDataFormik.errors.low && addDataFormik.touched.low ? (
            <p className="text-danger mt-2">
              {addDataFormik.errors.low}
            </p>
          ) : null}

          <label className="form-label" htmlFor="close">
            Close
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="close"
            name="close"
            value={addDataFormik.values.close}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter Close Value"
            autoComplete="off"
          />
          {addDataFormik.errors.close && addDataFormik.touched.close ? (
            <p className="text-danger mt-2">
              {addDataFormik.errors.close}
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

export default AddDataCandle;
