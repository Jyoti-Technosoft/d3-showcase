import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomContext } from "src/components/CustomContext";

import "../AddData.scss";

const addSchema = Yup.object({
  country: Yup.string()
    .min(2, "Atleast 2 Character")
    .max(25, "Character less then 25")
    .required("Please Enter Country"),
  value: Yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required("Please enter Value")
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
    setaddDataCrud,
  } = useContext(CustomContext);

  const addInitialValues = {
    country: isEdit ? updateValue.country : "",
    value: isEdit ? updateValue.value : "",
    id: isEdit ? updateValue.id : "",
    state1: isEdit ? updateValue?.subState[0]?.country : "",
    value1: isEdit ? updateValue?.subState[0]?.value : "",
    state2: isEdit ? updateValue?.subState[1]?.country : "",
    value2: isEdit ? updateValue?.subState[1]?.value : "",
    state3: isEdit ? updateValue?.subState[2]?.country : "",
    value3: isEdit ? updateValue?.subState[2]?.value : "",
    state4: isEdit ? updateValue?.subState[3]?.country : "",
    value4: isEdit ? updateValue?.subState[3]?.value : "",
    state5: isEdit ? updateValue?.subState[4]?.country : "",
    value5: isEdit ? updateValue?.subState[4]?.value : "",
  };

  const addDataFormik = useFormik({
    initialValues: addInitialValues,
    validationSchema: addSchema,
    onSubmit: (value, action) => {
      if (isEdit) {
        let newObj = {
          id: value.id,
          country: value.country,
          value: value.value,
          subState: [
            { id: value.id * 100 + 1, country: value.state1, value: value.value1 },
            { id: value.id * 100 + 2, country: value.state2, value: value.value2 },
            { id: value.id * 100 + 3, country: value.state3, value: value.value3 },
            { id: value.id * 100 + 4, country: value.state4, value: value.value4 },
            { id: value.id * 100 + 5, country: value.state5, value: value.value5 },
          ],
        }
        function replaceObjectById(id, newObject) {
          const index = pieDataSet.findIndex((data) => data.id === id);
          if (index !== -1) {
            pieDataSet[index] = { ...newObject };
          }
          return pieDataSet;
        }

        const updatedData = replaceObjectById(value.id, newObj);
        setShowToast({
          show: true,
          msg: "Record Updated Successfully",
          type: "success",
        });
        setPieDataSet(updatedData);
        setUpdateDataPie(true);

      } else {
        const length = pieDataSet.length + 1;
        pieDataSet.push({
          id: length,
          country: value.country,
          value: value.value,
          subState: [
            { id: length * 100 + 1, country: value.state1, value: value.value1 },
            { id: length * 100 + 2, country: value.state2, value: value.value2 },
            { id: length * 100 + 3, country: value.state3, value: value.value3 },
            { id: length * 100 + 4, country: value.state4, value: value.value4 },
            { id: length * 100 + 5, country: value.state5, value: value.value5 },
          ],
        },)
        setShowToast({
          show: true,
          msg: "Record Added Successfully",
          type: "success",
        });
        setUpdateDataPie(true);
      }
      action.resetForm();
      setaddDataCrud(false);
    },
  });

  return (
    <>
      <form className="px-3 h-100 overflow-hidden" onSubmit={addDataFormik.handleSubmit}>
        <div className="overflow-auto form-div">
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
            <p className="text-danger mt-2">
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
            <p className="text-danger mt-2">
              {addDataFormik.errors.value}
            </p>
          ) : null}

          <div className="">
            <div className="my-2">
              <label>State1</label>
              <input className="input-style input-state-width p-2 ms-2 border-0" type="text" name="state1" id="state1" placeholder="state1" value={addDataFormik.values.state1} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
              <input className="input-style input-state-width p-2 ms-2 border-0" type="number" name="value1" id="value1" placeholder="Value" value={addDataFormik.values.value1} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
            </div>
            <div className="my-2">
              <label>State2</label>
              <input className="input-style input-state-width p-2 ms-2 border-0" type="text" name="state2" id="state2" placeholder="state2" value={addDataFormik.values.state2} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
              <input className="input-style input-state-width p-2 ms-2 border-0" type="number" name="value2" id="value2" placeholder="Value" value={addDataFormik.values.value2} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
            </div>
            <div className="my-2">
              <label>State3</label>
              <input className="input-style input-state-width p-2 ms-2 border-0" type="text" name="state3" id="state3" placeholder="state3" value={addDataFormik.values.state3} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
              <input className="input-style input-state-width p-2 ms-2 border-0" type="number" name="value3" id="value3" placeholder="Value" value={addDataFormik.values.value3} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
            </div>
            <div className="my-2">
              <label>State4</label>
              <input className="input-style input-state-width p-2 ms-2 border-0" type="text" name="state4" id="state4" placeholder="state4" value={addDataFormik.values.state4} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
              <input className="input-style input-state-width p-2 ms-2 border-0" type="number" name="value4" id="value4" placeholder="Value" value={addDataFormik.values.value4} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
            </div>
            <div className="my-2">
              <label>State5</label>
              <input className="input-style input-state-width p-2 ms-2 border-0" type="text" name="state5" id="state5" placeholder="state5" value={addDataFormik.values.state5} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
              <input className="input-style input-state-width p-2 ms-2 border-0" type="number" name="value5" id="value5" placeholder="Value" value={addDataFormik.values.value5} onChange={addDataFormik.handleChange} onBlur={addDataFormik.handleBlur} required />
            </div>
          </div>
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

export default AddDataPie;
