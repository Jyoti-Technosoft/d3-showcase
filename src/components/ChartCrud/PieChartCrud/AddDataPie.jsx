import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomContext } from "src/components/CustomContext";

import "./AddDataPie.scss";

const addSchema = Yup.object({
  country: Yup.string()
    .min(2, "Atleast 2 Character")
    .max(25, "Character less then 25")
    .required("Please Enter month"),
  value: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required()
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
});

const AddDataPie = () => {
  const {
    setShowToast,
    isEdit,
    updateValue,
    pieDataSet,
    setPieDataSet,
    setUpdateDataPie,
    setAddPieCrudModal,
  } = useContext(CustomContext);

  const upd_obj = pieDataSet?.findIndex((ele) => ele?.id === updateValue?.id);

  const addInitialValues = {
    country: pieDataSet[upd_obj]?.country || "",
    value: pieDataSet[upd_obj]?.value || "",
    id: pieDataSet[upd_obj]?.id || "",
  };

  const addDataFormik = useFormik({
    initialValues: addInitialValues,
    validationSchema: addSchema,
    onSubmit: (value, action) => {
      if (isEdit) {
        let updatedArray = pieDataSet.map((obj) =>
          obj?.id == value.id ? value : obj
        );
        setPieDataSet(updatedArray);
        setShowToast({
          show: true,
          msg: "Record Updated Successfully",
          type: "success",
        });
        setUpdateDataPie(true);
      } else {
        const newId = pieDataSet.length + 1;
        setPieDataSet((previous) => [
          ...previous,
          { id: newId, country: value.country, value: value.value },
        ]);
        setShowToast({
          show: true,
          msg: "Record Added Successfully",
          type: "success",
        });
        setUpdateDataPie(true);
      }
      action.resetForm();
      setAddPieCrudModal(false);
    },
  });

  return (
    <>
      <form className="px-3" onSubmit={addDataFormik.handleSubmit}>
        <label className="form-label" htmlFor="value">
          Country
        </label>
        <input
          className="input-style p-2 w-100 border-0 my-2"
          type="text"
          id="country"
          name="country"
          value={addDataFormik.values.country}
          onChange={addDataFormik.handleChange}
          onBlur={addDataFormik.handleBlur}
          placeholder="Enter Country"
          autoComplete="off"
        />
        {addDataFormik.errors.country && addDataFormik.touched.country ? (
          <p className="text-danger text-center mt-2">
            {addDataFormik.errors.country}
          </p>
        ) : null}

        <label className="form-label" htmlFor="value">
          Value
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
          <p className="text-danger text-center mt-2">
            {addDataFormik.errors.value}
          </p>
        ) : null}

        {isEdit ? (
          <input
            type="submit"
            value="Update"
            className="btn-sub px-3 py-2 border-0 my-2"
          />
        ) : (
          <input type="submit" className="btn-sub px-3 py-2 border-0 my-2" />
        )}
      </form>
    </>
  );
};

export default AddDataPie;
