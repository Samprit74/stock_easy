import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

type Props = {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
  onApply: () => void;
  loading?: boolean;
};

const todayIso = () => new Date().toISOString().slice(0, 10);
const monthAgoIso = () => {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
};

const ReportsFilters = ({ start, end, onChange, onApply, loading }: Props) => {
  const [localStart, setLocalStart] = useState(start);
  const [localEnd, setLocalEnd] = useState(end);

  useEffect(() => {
    setLocalStart(start);
    setLocalEnd(end);
  }, [start, end]);

  const applyPreset = (days: number) => {
    const end = todayIso();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onChange(start.toISOString().slice(0, 10), end);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-muted-foreground">Start date</label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              className="pl-9"
              value={localStart}
              onChange={(e) => {
                setLocalStart(e.target.value);
                onChange(e.target.value, localEnd);
              }}
            />
          </div>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-muted-foreground">End date</label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              className="pl-9"
              value={localEnd}
              onChange={(e) => {
                setLocalEnd(e.target.value);
                onChange(localStart, e.target.value);
              }}
            />
          </div>
        </div>
        <Button onClick={onApply} disabled={loading}>
          {loading ? "Loading..." : "Apply"}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => applyPreset(7)}>
          Last 7 days
        </Button>
        <Button variant="outline" size="sm" onClick={() => applyPreset(30)}>
          Last 30 days
        </Button>
        <Button variant="outline" size="sm" onClick={() => applyPreset(60)}>
          Last 60 days
        </Button>
        <Button variant="outline" size="sm" onClick={() => applyPreset(90)}>
          Last 90 days
        </Button>
      </div>
    </div>
  );
};

export { todayIso, monthAgoIso };
export default ReportsFilters;
