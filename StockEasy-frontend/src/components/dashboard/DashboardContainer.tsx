import DashboardSummary from "./DashboardSummary";
import ExpiringList from "./ExpiringList";
import SalesChart from "./charts/SalesChart";
import StockChart from "./charts/StockChart";

const DashboardContainer = () => {
  return (
    <div className="space-y-8">
      <DashboardSummary />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesChart />
        <StockChart />
      </div>

      <ExpiringList />
    </div>
  );
};

export default DashboardContainer;
