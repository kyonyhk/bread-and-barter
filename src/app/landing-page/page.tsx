import FakeLoadingScreen from '@repo/components/landing-page/organisms/fake-loading-screen/FakeLoadingScreen';
import LandingWrapper from '@repo/components/landing-page/organisms/landing-wrapper/LandingWrapper';

const LandingPage = () => {
  return (
    <div>
      <FakeLoadingScreen>
        <LandingWrapper />
      </FakeLoadingScreen>
    </div>
  );
};

export default LandingPage;
