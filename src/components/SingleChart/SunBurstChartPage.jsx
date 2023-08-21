import { useContext } from "react";
import SunBrustChart from "../Chart/DonutChart/SunBrustChart";
import ViewDataSunBrust from "../ChartCrud/SunBrustChartCrud/ViewDataSunBrust";
import { CrudSunBrustChartModal } from "../ChartModal/ChartModal";
import { CustomContext } from "../CustomContext";
import CustomToast from "../ToastComponent/CustomToast";

const SunBurstChartPage = () =>{

    const { addDataCrud, setaddDataCrud, showToast } = useContext(CustomContext)

    return (
        <>
            <h2>SunBurst Chart</h2>
            <p className='mb-3'>Map chart shades regions by data values, offering spatial insight. Visualizes distributions, patterns, and variations across geography. Interactive for detailed exploration, conveying valuable geographic insights effectively.</p>
            <p>sunburst chart, adding depth to your project. The chart's layers progressively unveil global information, from the world in Layer 0, to countries like India, China, USA, and Australia in Layer 1, states in Layer 2, and cities in Layer 3. Clicking on any level reveals detailed charts with additional information. Hovering over elements provides instant insights. Below the chart, tabular data reinforces the visual representation. Users can edit data, immediately impacting the visualization. This integration empowers seamless exploration, enabling a comprehensive grasp of global demographics at varying scales.</p>

            <div className="card chart-page-card d-flex justify-content-between align-items-center">
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

            {showToast ? <CustomToast /> : null}
        </>
    )
}

export default SunBurstChartPage;