import { useContext } from "react";
import PieChart from "../Chart/PieChart/PieChart";
import ViewDataPie from "../ChartCrud/PieChartCrud/ViewDataPie";
import { CustomContext } from "../CustomContext";
import { CrudPieChartModal } from "../ChartModal/ChartModal";
import CustomToast from "../ToastComponent/CustomToast";

const PieChartPage = () => {

    const { addDataCrud, setaddDataCrud, setIsEdit, showToast } = useContext(CustomContext)

    return (
        <>
            <h2>Pie Chart</h2>
            <p className='mb-3'>Map chart shades regions by data values, offering spatial insight. Visualizes distributions, patterns, and variations across geography. Interactive for detailed exploration, conveying valuable geographic insights effectively.</p>
            <p>The Pie chart visualizes the world's most populous country, and clicking on it unveils the states within that nation with the highest populations. The chart's surrounding area features connecting paths to other countries, enabling users to navigate back to the top 5 countries by population. Hovering over elements provides instant population information. Underneath the chart, present data in a tabular format. Users gain the ability to edit, delete, and add data, with modifications dynamically reflected in the chart. This interactive integration empowers users to explore, analyze, and manipulate population data seamlessly, fostering a deeper understanding of global demographics.</p>

            <div className="card chart-page-card d-flex justify-content-between align-items-center">
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
                <h6>Countries with highest Population (In Millions)</h6>
                <button className='data-add-btn' onClick={() => {setaddDataCrud(true); setIsEdit(false)}}>Add</button>
            </div>
            <ViewDataPie />

            {addDataCrud ? (
                <CrudPieChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}

            {showToast ? <CustomToast /> : null}
        </>
    )
}

export default PieChartPage;