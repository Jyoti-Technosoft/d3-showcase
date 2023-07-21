import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {

  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <CFooter className="d-flex justify-content-center">
      <div>
        <span className="ms-1">&copy; {currentYear}</span>
        <a rel="noopener noreferrer"> D3 Showcase</a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
