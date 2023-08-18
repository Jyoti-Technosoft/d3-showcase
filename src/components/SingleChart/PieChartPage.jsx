import { useContext } from "react";
import PieChart from "../Chart/PieChart/PieChart";
import ViewDataPie from "../ChartCrud/PieChartCrud/ViewDataPie";
import { CustomContext } from "../CustomContext";
import { CrudPieChartModal } from "../ChartModal/ChartModal";

const PieChartPage = () => {

    const { addDataCrud, setaddDataCrud } = useContext(CustomContext)

    return (
        <>
            <h2>Pie Chart</h2>
            <p className='mb-3'>Map chart shades regions by data values, offering spatial insight. Visualizes distributions, patterns, and variations across geography. Interactive for detailed exploration, conveying valuable geographic insights effectively.</p>

            <div className="card chart-page-card d-flex justify-content-center align-items-center">
                <PieChart
                    className="d-flex justify-content-center pie-size"
                    chartId="pie2"
                    parentWidth="30vw"
                    parentHeight="30vw"
                    tooltipShow={true}
                    isModal={true}
                    onClickOpenInside={true}
                />
            </div>

            <h4 className='mt-5 mb-2'>Pie Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6>Petrol v/s Diesel (In $USD)</h6>
                <button className='data-add-btn' onClick={() => setaddDataCrud(true)}>Add</button>
            </div>
            <ViewDataPie />

            {addDataCrud ? (
                <CrudPieChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}
        </>
    )
}

export default PieChartPage;