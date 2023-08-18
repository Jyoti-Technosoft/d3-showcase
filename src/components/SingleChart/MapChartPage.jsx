import { useContext } from "react";
import IndiaMapChart from "../Chart/MapChart/IndiaMap/IndiaMapChart";
import ViewDataMap from "../ChartCrud/IndiaMapChartCrud/ViewDataMap";
import { CustomContext } from "../CustomContext";
import { CrudMapChartModal } from "../ChartModal/ChartModal";

const MapChartPage = () =>{

    const { addDataCrud, setaddDataCrud } = useContext(CustomContext)

    return (
        <>
            <h2>Map Chart</h2>
            <p className='mb-3'>Map chart shades regions by data values, offering spatial insight. Visualizes distributions, patterns, and variations across geography. Interactive for detailed exploration, conveying valuable geographic insights effectively.</p>

            <div className="card chart-page-card d-flex justify-content-center align-items-center">
            <IndiaMapChart
                  chartId="indiamap4"
                  toolTipShow={true}
                  parentWidth="380"
                  parentHeight="380"
                  isModal={true}
                />
            </div>

            <h4 className='mt-5 mb-2'>Map Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6>India Map with Population (In Millions)</h6>
            </div>
            <ViewDataMap/>

            {addDataCrud ? (
                <CrudMapChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}
        </>
    )
}

export default MapChartPage;