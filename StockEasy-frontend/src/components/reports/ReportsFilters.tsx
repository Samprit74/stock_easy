type FilterType = "all" | "last7" | "last30" | "last60";

type ReportsFiltersProps = {
  value: FilterType;
  onChange: (value: FilterType) => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Last 60 Days", value: "last60" },
  { label: "Last 30 Days", value: "last30" },
  { label: "Last 7 Days", value: "last7" },
];

const ReportsFilters = ({ value, onChange }: ReportsFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            value === filter.value
              ? "bg-orange-500 text-white"
              : "bg-white border border-orange-300 text-orange-500 hover:bg-orange-100"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default ReportsFilters;
