import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BuyStockContainer from "@/components/stock/BuyStockContainer";

const BuyStockPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Buy Stock</h1>
        <BuyStockContainer />
      </main>

      <Footer />
    </div>
  );
};

export default BuyStockPage;
