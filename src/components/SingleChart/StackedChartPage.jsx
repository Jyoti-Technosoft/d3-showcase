import { useContext } from "react";
import StackedChart from "../Chart/StackedChart/StackedChart";
import ViewDataStacked from "../ChartCrud/StackedChartCrud/ViewDataStacked";
import { CrudStackedChartModal } from "../ChartModal/ChartModal";
import { CustomContext } from "../CustomContext";
import CustomToast from "../ToastComponent/CustomToast";

const StackedChartPage = () => {

    const { addDataCrud, setaddDataCrud, setIsEdit, showToast } = useContext(CustomContext);

    return (
        <>
            <h2>Stacked Chart</h2>
            <p className='mb-3'>Stacked chart (stacked bar) shows category-wise data composition. Stacked bars represent values, segments depict portions. Useful for visualizing individual values and overall distribution in diverse groups.</p>
            <p>The chart visually represents monthly oil consumption comparisons among four regions: US, Europe, Asia, and South America, spanning January to December. Beneath the graphical representation, a tabular data view is provided. Enhance user insights by enabling tooltips on bar hover, revealing supplementary data.  Users can seamlessly edit, delete, or add data points in the table, observing real-time adjustments in the chart. To make changes, simply click on the respective data entry and select the desired action, with all modifications dynamically reflected in the charts, ensuring a real-time visualization of changes.</p>

            <div className="card chart-page-card chart-page-card1">
                <StackedChart
                    chartId="stacked4"
                    parentWidth="100%"
                    parentHeight="100%"
                    borderSize="0"
                    isModal={true}
                    tooltipShow={true}
                    showLegend={true}
                    showLables={true}
                />
            </div>

            <h4 className='mt-5 mb-2'>Stacked Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6>Oil Consumption By Country (In Barrels)</h6>
                <button className='data-add-btn' onClick={() => { setaddDataCrud(true); setIsEdit(false) }}>Add</button>
            </div>
            <ViewDataStacked />

            {addDataCrud ? (
                <CrudStackedChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}

            {showToast ? <CustomToast /> : null}

        </>
    )
}

export default StackedChartPage;