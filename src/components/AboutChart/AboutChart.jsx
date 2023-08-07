import DonutImg from '../../Images/About-us/Donutchart.png';
import PieImg from '../../Images/About-us/Piechart.png';
import CandleImg from '../../Images/About-us/Candlestickchart.png';
import GroupImg from '../../Images/About-us/Groupchart.png';
import MapImg from '../../Images/About-us/Mapchart.png';
import StackedImg from '../../Images/About-us/Stackedchart.png';

import './AboutChart.scss';
import GroupChart from '../Chart/GroupChart/GroupChart';
import CandleStickChart from '../Chart/CandleStickChart/CandleStickChart';
import MultiLevelDonutChart from '../Chart/DonutChart/MultiLevelDonutChart';
import StackedChart from '../Chart/StackedChart/StackedChart';

const AboutChart = () => {
    return (
        <>
            <h2 className="text-center mb-3">About Chart</h2>
            <p style={{margin: "20px auto"}} className='text-center w-75'><span style={{color : "#2980b9", fontSize: "1.2em"}}>D3 Showcase</span> project features six interactive charts crafted using D3.js, a powerful data visualization library. Seamlessly combining React's dynamic UI with D3's robust charting capabilities, the project delivers insightful data representation for enhanced user understanding and engagement.</p>
            <div class="container">
                <div class="row">
                    <div class="col-sm col-md-6 col-lg-4 mb-3 d-flex justify-content-center">
                        <div className="card d-flex justify-content-between about-chart-card">
                            <div className="d-flex justify-content-center pt-2">
                            <GroupChart
                                    chartId="group4"
                                    parentWidth="350px"
                                    parentHeight="250px"
                                    borderSize="0"
                                    tooltipShow={false}
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Group Chart</h5>
                                <p className="card-text">
                                    Group chart (grouped bar) visually compares data values across categories. Bars represent categories, divided into segments for subcategories. Useful for inter-group data comparison and trend identification.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm col-md-6 col-lg-4 mb-3 d-flex justify-content-center  ">
                        <div className="card d-flex justify-content-between about-chart-card">
                            <div className="d-flex justify-content-center pt-2">
                            <StackedChart
                                    chartId="stacked4"
                                    parentWidth="350px"
                                    parentHeight="250px"
                                    borderSize="0"
                                    tooltipShow={false}
                                    showLegend={true}
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Stacked Chart</h5>
                                <p className="card-text">
                                    Stacked chart (stacked bar) shows category-wise data composition. Stacked bars represent values, segments depict portions. Useful for visualizing individual values and overall distribution in diverse groups.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm col-md-6 col-lg-4 mb-3 d-flex justify-content-center  ">
                        <div className="card d-flex justify-content-between about-chart-card">
                            <div className="d-flex justify-content-center pt-2">
                            <CandleStickChart
                                    chartId="candle1"
                                    parentWidth="350px"
                                    parentHeight="250px"
                                    borderSize="0"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Candlestick chart</h5>
                                <p className="card-text">
                                    Candlestick chart aids financial analysis, displaying open, high, low, close prices over time. Rectangular body shows range, wicks indicate highs and lows. Valuable for trend and pattern recognition.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm col-md-6 col-lg-4 mb-3 d-flex justify-content-center  ">
                        <div className="card d-flex justify-content-between about-chart-card">
                            <div className="d-flex justify-content-center pt-2">
                            <MultiLevelDonutChart
                                    chartId="donutchart4"
                                    cardwidth="12em"
                                    tooltipShow={false}
                                    zoomOn={false}
                                    isModal={false}
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Donut Chart</h5>
                                <p className="card-text">
                                    Donut chart is a pie chart variant, center hole resembling a donut. Sectors represent categories/values. Illustrates whole composition, highlights categories by adjusting hole size or ring thickness.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm col-md-6 col-lg-4 mb-3 d-flex justify-content-center  ">
                        <div className="card d-flex justify-content-between about-chart-card">
                            <div className="d-flex justify-content-center pt-2">
                            <img src={PieImg} alt="" width="200px" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Pie Chart</h5>
                                <p className="card-text">
                                A multilevel pie chart, represents data in a circular format where each level of the chart corresponds to a different category. The outer rings of the pie chart show broader categories, while the inner rings show subcategories or detailed data.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm col-md-6 col-lg-4 mb-3 d-flex justify-content-center  ">
                        <div className="card d-flex justify-content-between about-chart-card">
                            <div className="d-flex justify-content-center pt-2">
                            <img src={MapImg} alt="" width="200px" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Map Chart</h5>
                                <p className="card-text">
                                    Map chart shades regions by data values, offering spatial insight. Visualizes distributions, patterns, and variations across geography. Interactive for detailed exploration, conveying valuable geographic insights effectively.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutChart;
