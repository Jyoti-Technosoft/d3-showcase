import Chart from './components/Chart/Chart';
import AboutChart from './components/AboutChart/AboutChart';
import AboutUs from './components/AboutUS/AboutUS';

const routes = [
  { path: '/dashboard', name: 'Chart', element: Chart },
  { path: '/aboutchart', name: 'About Chart', element: AboutChart },
  { path: '/aboutus', name: 'About Us', element: AboutUs },
]

export default routes;