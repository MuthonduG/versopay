// import React, { type ReactElement } from 'react'
import NavbarComponent from '../../components/layout/navigation/navbar/NavbarComponent'
import BannerComponent from './banner/BannerComponent'
import FeaturesPage from './features/features'
import HeaderComponent from './header/HeaderComponent'
import SecurityTransactionsComponent from './security/SecurityTransactionsComponent'
import TargetOrganisation from './target_org/TargetOrganisation'
import WhyUsComponent from './whyus/WhyUsComponent'
import FooterComponent from '../../components/layout/footer/FooterComponent'

const HomePage = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full">

      <NavbarComponent/>
      <HeaderComponent/>
      <FeaturesPage/>
      <WhyUsComponent/>
      <TargetOrganisation/>
      <SecurityTransactionsComponent/>
      <BannerComponent/>
      <FooterComponent/>
      
    </section>
  )
}

export default HomePage
