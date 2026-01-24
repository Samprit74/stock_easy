import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReportsContainer from "@/components/reports/ReportsContainer";

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
        <ReportsContainer />
      </main>

      <Footer />
    </div>
  );
};

export default ReportsPage;
