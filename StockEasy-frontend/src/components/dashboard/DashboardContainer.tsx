import DashboardSummary from "./DashboardSummary";
import ExpiringList from "./ExpiringList";
import LowStockList from "./LowStockList";
import ExpiredStockCard from "./ExpiredStockCard";
import SalesChart from "./charts/SalesChart";
import StockChart from "./charts/StockChart";

const DashboardContainer = () => {
  return (
    <div className="space-y-8">
      <DashboardSummary />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LowStockList threshold={10} />
        <ExpiredStockCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesChart />
        <StockChart />
      </div>

      <ExpiringList />
    </div>
  );
};

export default DashboardContainer;
