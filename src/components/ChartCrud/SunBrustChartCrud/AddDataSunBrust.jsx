import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomContext } from "src/components/CustomContext";

import "../AddData.scss";

const addSchema = Yup.object({
  name: Yup.string()
    .min(2, "Atleast 2 Character")
    .max(25, "Character less then 25")
    .required("Please Enter month"),
  value: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required("Please Enter Value")
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
});

const AddDataSunBrust = () => {
  const {
    setShowToast,
    isEdit,
    updateValue,
    sunBrustDataSet,
    setaddDataCrud,
    setUpdateDataSunBrust,
    setUpdateDataDonut,
  } = useContext(CustomContext);

  const addInitialValues = {
    name: updateValue?.city.name || "",
    value: updateValue?.city.value || "",
  };

  const addDataFormik = useFormik({
    initialValues: addInitialValues,
    validationSchema: addSchema,
    onSubmit: (values, action) => {
      if (isEdit) {
        for (const country of sunBrustDataSet.children) {
          for (const state of country.children) {
            for (const city of state.children) {
              if (city.name === values.name) {
                city.value = values.value;
              }
            }
          }
        }

      } else {
        // Handle adding new data
      }

      setShowToast({
        show: true,
        msg: "Record Updated Successfully",
        type: "success",
      });

      setUpdateDataSunBrust(true);
      setaddDataCrud(false);
      action.resetForm();
    },
  });

  return (
    <>
      <form className="px-3" onSubmit={addDataFormik.handleSubmit}>
        <label className="form-label" htmlFor="value">
          City
        </label>
        <input
          className="input-style p-2 w-100 border-0 my-2"
          type="text"
          id="name"
          name="name"
          readOnly
          value={addDataFormik.values.name}
          onChange={addDataFormik.handleChange}
          onBlur={addDataFormik.handleBlur}
          placeholder="Enter Country"
          autoComplete="off"
        />
        {addDataFormik.errors.name && addDataFormik.touched.name ? (
          <p className="text-danger text-center mt-2">
            {addDataFormik.errors.name}
          </p>
        ) : null}

        <label className="form-label" htmlFor="value">
          Count
        </label>
        <input
          className="input-style p-2 w-100 border-0 my-2"
          type="number"
          id="value"
          name="value"
          value={addDataFormik.values.value}
          onChange={addDataFormik.handleChange}
          onBlur={addDataFormik.handleBlur}
          placeholder="Enter Value"
          autoComplete="off"
        />
        {addDataFormik.errors.value && addDataFormik.touched.value ? (
          <p className="text-danger mt-2">
            {addDataFormik.errors.value}
          </p>
        ) : null}

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

export default AddDataSunBrust;
