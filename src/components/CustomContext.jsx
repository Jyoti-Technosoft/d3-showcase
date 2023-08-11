import React, { createContext, useEffect, useState } from "react"

import { groupData, stackedData, pieData, candleData, sunBrustData } from "./Chart/ChartsData/ChartData";
import Axios from 'axios';

export const CustomContext = createContext();

export const ContextProvider = (props) => {

    const [crudData, setCrudData] = useState([]);
    const [deleteId, setDeleteId] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [updateValue, setUpdateValue] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [addDataCrud, setaddDataCrud] = useState(false);

    const [groupDataSet, setGroupDataSet] = useState(groupData);
    const [openGroupCrudModal, setOpenGroupCrudModal] = useState(false);
    const [updateDataGroup, setUpdateDataGroup] = useState(false);

    const [stackedObj, setStackedObj] = useState(stackedData);
    const [openStackedCrudModal, setOpenStackedCrudModal] = useState(false);
    const [updateDataStacked, setUpdateDataStacked] = useState(false);

    const [pieDataSet, setPieDataSet] = useState(pieData);
    const [openPieCrudModal, setOpenPieCrudModal] = useState(false);
    const [updateDataPie, setUpdateDataPie] = useState(false);

    const [sunBrustDataSet, setSunBrustDataSet] = useState(sunBrustData);
    const [openCrudModal, setOpenCrudModal] = useState(false);
    const [updateDataSunBrust, setUpdateDataSunBrust] = useState(false);

    const [candleDataSet, setCandleDataSet] = useState(candleData);
    const [openCandleCrudModal, setOpenCandleCrudModal] = useState(false);
    const [updateDataCandle, setUpdateDataCandle] = useState(false);

    const initialStateMap = {
        mapDataSet: '/assets/states.json',
        openMapCrudModal: false,
        addMapCrudModal: false,
        updateDataMap: false,
      };
      
    const [stateMap, setStateMap] = useState(initialStateMap); 

    const [mapDataArr, setMapDataArr] = useState();
    const [updateMapData, setUpdateMapData] = useState(true);

    useEffect(() => {
      Axios.get('/assets/states.json')
        .then(response => {
          setMapDataArr(response.data);
        })
        .catch(error => {
          console.error('Error fetching states data:', error);
        });
    }, []);

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
            <CustomContext.Provider value={{ crudData, setCrudData, deleteId, setDeleteId, showToast, setShowToast, updateValue, setUpdateValue, isEdit, setIsEdit, stackedObj, setStackedObj, groupDataSet, setGroupDataSet, openGroupCrudModal, setOpenGroupCrudModal, updateDataGroup, setUpdateDataGroup, openStackedCrudModal, setOpenStackedCrudModal, updateDataStacked, setUpdateDataStacked, openPieCrudModal, setOpenPieCrudModal, pieDataSet, setPieDataSet, updateDataPie, setUpdateDataPie, openCandleCrudModal, setOpenCandleCrudModal, updateDataCandle, setUpdateDataCandle, candleDataSet, setCandleDataSet, stateMap, setStateMap, mapDataArr, setMapDataArr, sunBrustDataSet, setSunBrustDataSet, addDataCrud, setaddDataCrud, openCrudModal, setOpenCrudModal, updateDataSunBrust, setUpdateDataSunBrust, updateMapData, setUpdateMapData}}>
                {props.children}
            </CustomContext.Provider>
        </>
    )
}
