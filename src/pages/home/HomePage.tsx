import { useState } from 'react';
import NavbarComponent from '../../components/layout/navigation/navbar/NavbarComponent'
import BannerComponent from './banner/BannerComponent'
import FeaturesPage from './features/features'
import HeaderComponent from './header/HeaderComponent'
import AboutComponent from './about/AboutComponent'
import SecurityTransactionsComponent from './security/SecurityTransactionsComponent'
import TargetOrganisation from './target_org/TargetOrganisation'
import WhyUsComponent from './whyus/WhyUsComponent'
import FooterComponent from '../../components/layout/footer/FooterComponent'
import JoinWaitlistModal from '../../components/common/modals/JoinWaitlistModal';
import TestimonialsComponent from './testimonials/TestimonialsComponent';

const HomePage = () => {
  const [isJoinWaitlistOpen, setIsJoinWaitlistOpen] = useState(false);

  return (
    <section className="flex flex-col justify-center items-center w-full">

      <NavbarComponent/>
      <HeaderComponent onJoinWaitlist={() => setIsJoinWaitlistOpen(true)} />
      <JoinWaitlistModal
        isOpen={isJoinWaitlistOpen}
        onClose={() => setIsJoinWaitlistOpen(false)}
      />
      <FeaturesPage/>
      <WhyUsComponent/>
      <AboutComponent/>
      <TargetOrganisation/>
      <SecurityTransactionsComponent/>
      <TestimonialsComponent/>
      <BannerComponent/>
      <FooterComponent/>
    </section>
  )
}

export default HomePage
