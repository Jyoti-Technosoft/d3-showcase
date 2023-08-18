import { useContext } from 'react';
import CandleStickChart from '../Chart/CandleStickChart/CandleStickChart';
import ViewDataCandle from '../ChartCrud/CandleStickChartCrud/ViewDataCandle';
import './ChartPage.scss'
import { CustomContext } from '../CustomContext';
import { CrudCandleChartModal } from '../ChartModal/ChartModal';

const CandleStickChartPage = () =>{

    const { addDataCrud, setaddDataCrud } = useContext(CustomContext)

    return (
        <>
            <h2>CandleStick Chart</h2>
            <p className='mb-3'>Candlestick chart aids financial analysis, displaying open, high, low, close prices over time. Rectangular body shows range, wicks indicate highs and lows. Valuable for trend and pattern recognition.</p>

            <div className="card chart-page-card">
            <CandleStickChart
                  chartId="candle4"
                  parentWidth="100%"
                  parentHeight="100%"
                  borderSize="0"
                  isModal={true}
                  showlabels={true}
                />
            </div>

            <h4 className='mt-5 mb-2'>Candle Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6>CandleStick Chart of ITC (Demo Data)</h6>
                <button className='data-add-btn' onClick={() => setaddDataCrud(true)}>Add</button>
            </div>
            <ViewDataCandle/>

            {addDataCrud ? (
                <CrudCandleChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}
        </>
    )
}

export default CandleStickChartPage;