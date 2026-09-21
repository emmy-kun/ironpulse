import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PerformanceDashboard from "../components/dashboard/PerformanceDashboard";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <Navbar />
      <main className="pt-20">
        <PerformanceDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;