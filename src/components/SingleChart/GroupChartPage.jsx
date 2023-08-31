import { useContext, useEffect } from 'react';
import GroupChart from '../Chart/GroupChart/GroupChart';
import ViewDataGroup from '../ChartCrud/GroupChartCrud/ViewDataGroup';
import './ChartPage.scss'
import { CustomContext } from '../CustomContext';
import { CrudGroupChartModal } from '../ChartModal/ChartModal';
import CustomToast from '../ToastComponent/CustomToast';
import titles from '../../pageTitle';

const GroupChartPage = () => {

    const { addDataCrud, setaddDataCrud, setIsEdit, showToast } = useContext(CustomContext)

    useEffect(()=>{
        document.title = titles.groupChart;
    },[])

    return (
        <>
            <h2>Group Chart</h2>
            <p className='mb-3'>Group chart (grouped bar) visually compares data values across categories. Bars represent categories, divided into segments for subcategories. Useful for inter-group data comparison and trend identification.</p>
            <p>The chart illustrates monthly price comparisons between diesel and petrol per liter from January to December. Beneath the chart, a tabular representation of the data is provided. Enhance user insights by enabling tooltips on bar hover, revealing supplementary data. Users can seamlessly edit, delete, or add data points in the table, observing real-time adjustments in the chart. To make changes, simply click on the respective data entry and select the desired action, with all modifications dynamically reflected in the charts, ensuring a real-time visualization of changes.</p>
            <div className="card chart-page-card chart-page-card1">
                <GroupChart
                    chartId="group4"
                    parentWidth="100%"
                    parentHeight="100%"
                    borderSize="0"
                    data-testid="test-chart"
                    isModal={true}
                    tooltipShow={true}
                    showLabels={true}
                />
            </div>
            <h4 className='mt-5 mb-2'>Group Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6>Petrol v/s Diesel (In $USD)</h6>
                <button className='data-add-btn' onClick={() => { setaddDataCrud(true); setIsEdit(false)}}>Add</button>
            </div>
            <ViewDataGroup />

            {addDataCrud ? (
                <CrudGroupChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}

            {showToast ? <CustomToast /> : null}
        </>
    )
}

export default GroupChartPage;