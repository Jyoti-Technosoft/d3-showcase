import { useContext } from "react";
import SunBrustChart from "../Chart/DonutChart/SunBrustChart";
import ViewDataSunBrust from "../ChartCrud/SunBrustChartCrud/ViewDataSunBrust";
import { CrudSunBrustChartModal } from "../ChartModal/ChartModal";
import { CustomContext } from "../CustomContext";

const SunBurstChartPage = () =>{

    const { addDataCrud, setaddDataCrud } = useContext(CustomContext)

    return (
        <>
            <h2>SunBurst Chart</h2>
            <p className='mb-3'>Map chart shades regions by data values, offering spatial insight. Visualizes distributions, patterns, and variations across geography. Interactive for detailed exploration, conveying valuable geographic insights effectively.</p>

            <div className="card chart-page-card d-flex justify-content-center align-items-center">
            <SunBrustChart
              chartId="donutchart2"
              cardwidth="30vw"
              tooltipShow={true}
              zoomOn={false}
              isModal={true}
              drillOn={true}
            />
            </div>

            <h4 className='mt-5 mb-2'>SunBrust Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6>World Population (In Millions)</h6>
            </div>
            <ViewDataSunBrust />

            {addDataCrud ? (
                <CrudSunBrustChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}
        </>
    )
}

export default SunBurstChartPage;