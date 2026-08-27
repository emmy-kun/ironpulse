import Hero from "../components/hero/Hero";
import Programs from "../components/programs/Programs";
import PerformanceDashboard from "../components/dashboard/PerformanceDashboard";
import Schedule from "../components/schedule/Schedule";
import Coaches from "../components/coaches/Coaches";
import Recovery from "../components/recovery/Recovery";
import Membership from "../components/membership/Membership";
import FAQ from "../components/faq/FAQ";

function Home() {
  return (
    <>
      <Hero />
      <Programs />
      <PerformanceDashboard />
      <Schedule />
      <Coaches />
      <Recovery />
      <Membership />
      <FAQ />
    </>
  );
}

export default Home;
