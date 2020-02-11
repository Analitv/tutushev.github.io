import React, { FunctionComponent } from 'react'

import { Header } from './components/Header'
import './_index.css'

export const MainLayout: FunctionComponent = (props) => {
  return (
    <div className='main-layout'>
      <Header />
      <div className="dashboard">
        {props.children}
      </div>
    </div>
  );
}