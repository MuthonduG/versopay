// import React, { type ReactElement } from 'react'
import NavbarComponent from '../../components/layout/navigation/navbar/NavbarComponent'
import FeaturesPage from './features/features'
import HeaderComponent from './header/HeaderComponent'


const HomePage = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full">

      <NavbarComponent/>
      <HeaderComponent/>
      <FeaturesPage/>

    </section>
  )
}

export default HomePage
