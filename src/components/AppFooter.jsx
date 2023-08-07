import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {

  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <CFooter className="d-flex justify-content-center">
      <div className='text-center'>
        <span className="ms-1">&copy; {currentYear}</span>
        <span> Jyoti Technosoft LLP. All Rights Reserved by </span>
        <a href='https://www.jyotitechnosoft.com' target='_blank' className='text-dark' style={{textDecoration: "none"}}>https://www.jyotitechnosoft.com</a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
