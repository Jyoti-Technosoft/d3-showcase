import { useContext } from "react";
import StackedChart from "../Chart/StackedChart/StackedChart";
import ViewDataStacked from "../ChartCrud/StackedChartCrud/ViewDataStacked";
import { CrudStackedChartModal } from "../ChartModal/ChartModal";
import { CustomContext } from "../CustomContext";

const StackedChartPage = () =>{

    const { addDataCrud, setaddDataCrud } = useContext(CustomContext);

    return (
        <>
            <h2>Stacked Chart</h2>
            <p className='mb-3'>Stacked chart (stacked bar) shows category-wise data composition. Stacked bars represent values, segments depict portions. Useful for visualizing individual values and overall distribution in diverse groups.</p>

            <div className="card chart-page-card">
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
                <button className='data-add-btn' onClick={() => setaddDataCrud(true)}>Add</button>
            </div>
            <ViewDataStacked/>

            {addDataCrud ? (
                <CrudStackedChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null}

        </>
    )
}

export default StackedChartPage;