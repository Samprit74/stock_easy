import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomersContainer from "@/components/customers/CustomersContainer";

const CustomersPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Customers</h1>
        <CustomersContainer />
      </main>

      <Footer />
    </div>
  );
};

export default CustomersPage;
