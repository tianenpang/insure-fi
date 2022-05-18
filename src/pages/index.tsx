import { Fragment } from 'react';
import { HowItWorksSection, IndexHero, PartnerSection, WhyChooseUsSection } from '@components';
import type { NextPage } from 'next';

const IndexPage: NextPage = () => {
  return (
    <Fragment>
      <IndexHero />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <PartnerSection />
    </Fragment>
  );
};

export default IndexPage;
