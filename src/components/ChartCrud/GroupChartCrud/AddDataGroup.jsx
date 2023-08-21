import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CustomContext } from "src/components/CustomContext";
import "../AddData.scss";

const addSchema = Yup.object({
  month: Yup.string()
    .min(2, "Atleast 2 Character")
    .max(25, "Character less then 25")
    .required("Please Enter month"),
  petrolprice: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required()
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
  dieselprice: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required()
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
});

const AddDataGroup = () => {
  const {
    setShowToast,
    isEdit,
    updateValue,
    groupDataSet,
    setGroupDataSet,
    setUpdateDataGroup,
    setaddDataCrud
  } = useContext(CustomContext);

  let upd_obj;
  if(isEdit){
    upd_obj = groupDataSet?.findIndex((ele) => ele?.id === updateValue?.id);
  }

  const addInitialValues = {
    month: groupDataSet[upd_obj]?.month || "",
    petrolprice: groupDataSet[upd_obj]?.petrolprice || "",
    dieselprice: groupDataSet[upd_obj]?.dieselprice || "",
    id: groupDataSet[upd_obj]?.id || "",
  };

  const addDataFormik = useFormik({
    initialValues: addInitialValues,
    validationSchema: addSchema,
    onSubmit: (value, action) => {
      action.resetForm();
      if (isEdit) {
        let updatedArray = groupDataSet.map((obj) =>
          obj?.id == value.id ? value : obj
        );
        setGroupDataSet(updatedArray);
        setShowToast({
          show: true,
          msg: "Record Updated Successfully",
          type: "success",
        });
        setUpdateDataGroup(true);
      } else {
        const newId = groupDataSet.length + 1;
        setGroupDataSet((previous) => [
          ...previous,
          {
            id: newId,
            month: value.month,
            petrolprice: value.petrolprice,
            dieselprice: value.dieselprice,
          },
        ]);
        setShowToast({
          show: true,
          msg: "Record Added Successfully",
          type: "success",
        });
        setUpdateDataGroup(true);
      }
      setaddDataCrud(false);
    },
  });

  return (
    <>
      <form className="px-3 h-100 overflow-hidden" onSubmit={addDataFormik.handleSubmit}>
        <div className="overflow-auto form-div">
          <label className="form-label" htmlFor="month">
            Month
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="text"
            id="month"
            name="month"
            value={addDataFormik.values.month}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter month"
            autoComplete="off"
          />
          {addDataFormik.errors.month && addDataFormik.touched.month ? (
            <p className="text-danger text-center mt-2">
              {addDataFormik.errors.month}
            </p>
          ) : null}

          <label className="form-label" htmlFor="petrolprice">
            Petrol Price
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="petrolprice"
            name="petrolprice"
            value={addDataFormik.values.petrolprice}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter petrolprice Value"
            autoComplete="off"
          />
          {addDataFormik.errors.petrolprice &&
            addDataFormik.touched.petrolprice ? (
            <p className="text-danger text-center mt-2">
              {addDataFormik.errors.petrolprice}
            </p>
          ) : null}

          <label className="form-label" htmlFor="dieselprice">
            Diesel Price
          </label>
          <input
            className="input-style p-2 w-100 border-0 my-2"
            type="number"
            id="dieselprice"
            name="dieselprice"
            value={addDataFormik.values.dieselprice}
            onChange={addDataFormik.handleChange}
            onBlur={addDataFormik.handleBlur}
            placeholder="Enter dieselprice Value"
            autoComplete="off"
          />
          {addDataFormik.errors.dieselprice &&
            addDataFormik.touched.dieselprice ? (
            <p className="text-danger text-center mt-2">
              {addDataFormik.errors.dieselprice}
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

export default AddDataGroup;
