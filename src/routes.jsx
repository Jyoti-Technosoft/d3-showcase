import Chart from './components/Chart/Chart';
import AboutUs from './components/AboutUS/AboutUS';
import GroupChartPage from './components/SingleChart/GroupChartPage';
import StackedChartPage from './components/SingleChart/StackedChartPage';
import CandleStickChartPage from './components/SingleChart/CandleStickChartPage';
import MapChartPage from './components/SingleChart/MapChartPage';
import PieChartPage from './components/SingleChart/PieChartPage';
import SunBurstChartPage from './components/SingleChart/SunBurstChartPage';

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Chart },
  { path: '/aboutus', name: 'About Us', element: AboutUs },
  { path: '/charts/groupchart', name: 'Charts / Group Chart', element: GroupChartPage },
  { path: '/charts/stackedchart', name: 'Charts / Stacked Chart', element: StackedChartPage },
  { path: '/charts/candlestickchart', name: 'Charts / CandleStick Chart', element: CandleStickChartPage },
  { path: '/charts/mapchart', name: 'Charts / Map Chart', element: MapChartPage },
  { path: '/charts/piechart', name: 'Charts / Pie Chart', element: PieChartPage },
  { path: '/charts/sunburstchart', name: 'Charts / SunBurst Chart', element: SunBurstChartPage },
]

export default routes;