import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomContext } from "src/components/CustomContext";

import "./AddDataDonut.scss";

const addSchema = Yup.object({
  place: Yup.string()
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

const AddDataDonut = () => {
  const {
    setShowToast,
    isEdit,
    updateValue,
    donutDataSet,
    setDonutDataSet,
    setUpdateDataDonut,
    setAddDonutCrudModal,
  } = useContext(CustomContext);

  const addInitialValues = {
    count: updateValue?.count || "",
    place: updateValue?.place || "",
    id: updateValue?.id || "",
    layer: "",
  };

  const addDataFormik = useFormik({
    initialValues: addInitialValues,
    // validationSchema: addSchema,
    onSubmit: (value, action) => {
      if (isEdit) {
        let updatedArray = donutDataSet.map((val) => val.map((obj) =>
          obj?.id == value.id ? value : obj
        ));
        setDonutDataSet(updatedArray);
        setShowToast({
          show: true,
          msg: "Record Updated Successfully",
          type: "success",
        });
        setUpdateDataDonut(true);
      } else {
        let indexVal = Number(value.layer);
        const newId = donutDataSet[indexVal].length + 1;
        donutDataSet[indexVal].push({id: newId, count: value.count, place: value.place});
        setShowToast({
          show: true,
          msg: "Record Added Successfully",
          type: "success",
        });
        setUpdateDataDonut(true);
      }
      action.resetForm();
      setAddDonutCrudModal(false);
    },
  });

  return (
    <>
      <form className="px-3" onSubmit={addDataFormik.handleSubmit}>

        {
          isEdit ? null
            : 
            <div className="mb-3">
              <label className="form-label" htmlFor="layer">
                Layer
              </label>
              <select id="layer" name="layer" className="ms-3 px-3 py-1 text-dark"
                value={addDataFormik.values.layer}
                onChange={addDataFormik.handleChange}
              >
                <option value="nooption">-----</option>
                <option value="0">Layer 1</option>
                <option value="1">Layer 2</option>
                <option value="2">Layer 3</option>
              </select>
              <br />
              {addDataFormik.errors.place && addDataFormik.touched.place ? (
                <p className="text-danger text-center mt-2">
                  {addDataFormik.errors.place}
                </p>
              ) : null}
            </div>
        }

        <label className="form-label" htmlFor="value">
          City
        </label>
        <input
          className="input-style p-2 w-100 border-0 my-2"
          type="text"
          id="place"
          name="place"
          value={addDataFormik.values.place}
          onChange={addDataFormik.handleChange}
          onBlur={addDataFormik.handleBlur}
          placeholder="Enter Country"
          autoComplete="off"
        />
        {addDataFormik.errors.place && addDataFormik.touched.place ? (
          <p className="text-danger text-center mt-2">
            {addDataFormik.errors.place}
          </p>
        ) : null}

        <label className="form-label" htmlFor="value">
          Count
        </label>
        <input
          className="input-style p-2 w-100 border-0 my-2"
          type="number"
          id="count"
          name="count"
          value={addDataFormik.values.count}
          onChange={addDataFormik.handleChange}
          onBlur={addDataFormik.handleBlur}
          placeholder="Enter Value"
          autoComplete="off"
        />
        {addDataFormik.errors.count && addDataFormik.touched.count ? (
          <p className="text-danger text-center mt-2">
            {addDataFormik.errors.count}
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

export default AddDataDonut;
