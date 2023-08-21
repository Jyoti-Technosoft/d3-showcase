import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import routes from '../routes'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const navigate = useNavigate();

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          // active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <div>
      <span role='button' className='mb-0 bread-crumb-item' onClick={() => navigate('/')}>Dashboard</span>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <span
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index} role='button'
          >
            { breadcrumb.name === "Dashboard" ? null : ' / ' + breadcrumb.name }
          </span>
        )
      })}
    </div>
  )
}

export default React.memo(AppBreadcrumb)
