import Chart from './components/Chart/Chart';
import AboutUs from './components/AboutUS/AboutUS';

const routes = [
  { path: '/dashboard', name: 'Chart', element: Chart },
  { path: '/aboutus', name: 'About Us', element: AboutUs },
]

export default routes;