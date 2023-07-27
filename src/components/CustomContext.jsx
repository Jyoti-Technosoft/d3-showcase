import React, { createContext, useEffect, useState } from "react"

import { groupData, stackedData, pieData, donutData, candleData } from "./Chart/ChartsData/ChartData";

export const CustomContext = createContext();

export const ContextProvider = (props) => {

    const [crudData, setCrudData] = useState();
    const [deleteId, setDeleteId] = useState();
    const [showToast, setShowToast] = useState(false);
    const [updateValue, setUpdateValue] = useState();
    const [isEdit, setIsEdit] = useState(false);

    const [groupDataSet, setGroupDataSet] = useState(groupData);
    const [openGroupCrudModal, setOpenGroupCrudModal] = useState(false);
    const [addGroupCrudModal, setAddGroupCrudModal] = useState(false);
    const [updateDataGroup, setUpdateDataGroup] = useState(false);

    const [stackedObj, setStackedObj] = useState(stackedData);
    const [openStackedCrudModal, setOpenStackedCrudModal] = useState(false);
    const [addStackedCrudModal, setAddStackedCrudModal] = useState(false);
    const [updateDataStacked, setUpdateDataStacked] = useState(false);

    const [pieDataSet, setPieDataSet] = useState(pieData);
    const [openPieCrudModal, setOpenPieCrudModal] = useState(false);
    const [addPieCrudModal, setAddPieCrudModal] = useState(false);
    const [updateDataPie, setUpdateDataPie] = useState(false);

    const [donutDataSet, setDonutDataSet] = useState(donutData);
    const [openDonutCrudModal, setOpenDonutCrudModal] = useState(false);
    const [addDonutCrudModal, setAddDonutCrudModal] = useState(false);
    const [updateDataDonut, setUpdateDataDonut] = useState(false);

    const [candleDataSet, setCandleDataSet] = useState(candleData);
    const [openCandleCrudModal, setOpenCandleCrudModal] = useState(false);
    const [addCandleCrudModal, setAddCandleCrudModal] = useState(false);
    const [updateDataCandle, setUpdateDataCandle] = useState(false);

    const initialStateMap = {
        mapDataSet: '/assets/states.json',
        openMapCrudModal: false,
        addMapCrudModal: false,
        updateDataMap: false,
      };
      
    const [stateMap, setStateMap] = useState(initialStateMap); 

    const [mapDataArr, setMapDataArr] = useState();
    
    useEffect(() => {
        fetch(stateMap.mapDataSet)
          .then((response) => response.json())
          .then((data) => {
            // data will contain the content of states.json
            // Use the data as needed
          })
          .catch((error) => {
            console.error('Error fetching states data:', error);
          });
      }, [stateMap.mapDataSet]);
      

    return (
        <>
            <CustomContext.Provider value={{ crudData, setCrudData, deleteId, setDeleteId, showToast, setShowToast, updateValue, setUpdateValue, isEdit, setIsEdit, stackedObj, setStackedObj, groupDataSet, setGroupDataSet, openGroupCrudModal, setOpenGroupCrudModal, addGroupCrudModal, setAddGroupCrudModal, updateDataGroup, setUpdateDataGroup, openStackedCrudModal, setOpenStackedCrudModal, addStackedCrudModal, setAddStackedCrudModal, updateDataStacked, setUpdateDataStacked, openPieCrudModal, setOpenPieCrudModal, pieDataSet, setPieDataSet, addPieCrudModal, setAddPieCrudModal, updateDataPie, setUpdateDataPie, openDonutCrudModal, setOpenDonutCrudModal, addDonutCrudModal, setAddDonutCrudModal, updateDataDonut, setUpdateDataDonut, donutDataSet, setDonutDataSet, openCandleCrudModal, setOpenCandleCrudModal, addCandleCrudModal, setAddCandleCrudModal, updateDataCandle, setUpdateDataCandle, candleDataSet, setCandleDataSet, stateMap, setStateMap, mapDataArr, setMapDataArr }}>
                {props.children}
            </CustomContext.Provider>
        </>
    )
}
