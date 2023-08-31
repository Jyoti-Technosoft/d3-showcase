import { useContext, useEffect } from 'react';
import CandleStickChart from '../Chart/CandleStickChart/CandleStickChart';
import ViewDataCandle from '../ChartCrud/CandleStickChartCrud/ViewDataCandle';
import './ChartPage.scss'
import { CustomContext } from '../CustomContext';
import { CrudCandleChartModal } from '../ChartModal/ChartModal';
import CustomToast from '../ToastComponent/CustomToast';

import titles from '../../pageTitle';
import CandleStickChart2 from '../Chart/CandleStickChart/CandleStickChart2';

const CandleStickChartPage = () => {

    const { addDataCrud, setaddDataCrud, setIsEdit, showToast, candleDataSet } = useContext(CustomContext)

    useEffect(() => {
        document.title = titles.candleChart;
    }, [])

    function getFirstAndLastDates(dataArray) {
        const firstDate = dataArray[0].date;
        const lastDate = dataArray[dataArray.length - 1].date;
        return { firstDate, lastDate };
    }

    return (
        <>
            <h2>CandleStick Chart</h2>
            <p className='mb-3'>Candlestick chart aids financial analysis, displaying open, high, low, close prices over time. Rectangular body shows range, wicks indicate highs and lows. Valuable for trend and pattern recognition.</p>
            <p>The chart showcases simulated daily price data for Tata Motors, represented by candlesticks formed with open, high, low, and close values. Adjacent to the chart, a tabular data format is presented. Users can seamlessly edit, delete, or add data points in the table, observing real-time adjustments in the chart. To make changes, simply click on the respective data entry and select the desired action, with all modifications dynamically reflected in the charts, ensuring a real-time visualization of changes.</p>

            <div className="card chart-page-card chart-page-card1">
            <CandleStickChart2
                  chartId="candle4"
                  parentWidth="100%"
                  parentHeight="100%"
                  borderSize="0"
                  isModal={true}
                  showlabels={true}
                  tooltipShow={true}
                />
            </div>

            <h4 className='mt-5 mb-2'>Candle Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6 className="text-center">CandleStick Chart of Tata Motors ({getFirstAndLastDates(candleDataSet).firstDate} to {getFirstAndLastDates(candleDataSet).lastDate})</h6>
                <button className='data-add-btn' onClick={() => { setaddDataCrud(true); setIsEdit(false) }}>Add</button>
            </div>
            <ViewDataCandle />

            {addDataCrud ? (
                <CrudCandleChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}

            {showToast ? <CustomToast /> : null}
        </>
    )
}

export default CandleStickChartPage;