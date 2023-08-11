import React, { useContext } from "react";
import { CustomContext } from "src/components/CustomContext";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../AddData.scss";

const addSchema = Yup.object({
  total: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required("Population is Required")
    .min(0)
    .moreThan(-1, "Negative values not accepted"),
});

const AddDataMap = () => {
  const {
    isEdit,
    updateValue,
    mapDataArr,
    setMapDataArr,
    setUpdateMapData,
    setaddDataCrud
  } = useContext(CustomContext);

  const upd_obj = mapDataArr?.features?.findIndex(
    (ele) => ele?.id === updateValue?.id
  );

  const addInitialValues = {
    total: mapDataArr?.features[upd_obj]?.total || "",
    id: mapDataArr?.features[upd_obj]?.id || "",
  };

  const addDataFormik = useFormik({
    initialValues: addInitialValues,
    validationSchema: addSchema,
    onSubmit: (values) => {
      const updatedMapDataArr = [...mapDataArr.features];
      const featureIndex = updatedMapDataArr.findIndex(
        (ele) => ele.id === updateValue.id
      );
      updatedMapDataArr[featureIndex].total = values.total;
      const updatedDataJSON = JSON.stringify({
        ...mapDataArr,
        features: updatedMapDataArr,
      });
      let updateMapDataJson = JSON.parse(updatedDataJSON);
      console.log("update",updateMapDataJson)
      setMapDataArr({ ...mapDataArr, features: updatedMapDataArr });


      setUpdateMapData(true);
      setaddDataCrud(false);
    },
  });


  return (
    <>
      <form className="px-3" onSubmit={addDataFormik.handleSubmit}>
        <label className="form-label" htmlFor="date">
          Country
        </label>
        <input
          className="input-style p-2 w-100 border-0 my-2"
          type="text"
          id="id"
          name="id"
          value={addDataFormik.values.id}
          onChange={addDataFormik.handleChange}
          onBlur={addDataFormik.handleBlur}
          readOnly
        />

        <label className="form-label" htmlFor="open">
          Population (In Millions)
        </label>
        <input
          className="input-style p-2 w-100 border-0 my-2"
          type="number"
          id="total"
          name="total"
          value={addDataFormik.values.total}
          onChange={addDataFormik.handleChange}
          onBlur={addDataFormik.handleBlur}
          placeholder="Enter Population"
          autoComplete="off"
        />
        {addDataFormik.errors.total && addDataFormik.touched.total ? (
          <p className="text-danger text-center mt-2">
            {addDataFormik.errors.total}
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

export default AddDataMap;
