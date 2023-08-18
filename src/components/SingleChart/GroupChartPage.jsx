import { useContext } from 'react';
import GroupChart from '../Chart/GroupChart/GroupChart';
import ViewDataGroup from '../ChartCrud/GroupChartCrud/ViewDataGroup';
import './ChartPage.scss'
import { CustomContext } from '../CustomContext';
import { CrudGroupChartModal } from '../ChartModal/ChartModal';

const GroupChartPage = () => {

    const { addDataCrud, setaddDataCrud } = useContext(CustomContext)

    return (
        <>
            <h2>Group Chart</h2>
            <p className='mb-3'>Group chart (grouped bar) visually compares data values across categories. Bars represent categories, divided into segments for subcategories. Useful for inter-group data comparison and trend identification.</p>
            <div className="card chart-page-card">
                <GroupChart
                    chartId="group4"
                    parentWidth="100%"
                    parentHeight="100%"
                    borderSize="0"
                    isModal={true}
                    tooltipShow={true}
                    showLabels={true}
                />
            </div>
            <h4 className='mt-5 mb-2'>Group Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6>Petrol v/s Diesel (In $USD)</h6>
                <button className='data-add-btn' onClick={() => setaddDataCrud(true)}>Add</button>
            </div>
            <ViewDataGroup />

            {addDataCrud ? (
                <CrudGroupChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}
        </>
    )
}

export default GroupChartPage;