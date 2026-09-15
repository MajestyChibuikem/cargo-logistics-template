import { useState } from 'react';
import { Search, Package, MapPin, Truck, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { PACKAGES, STAGE_ORDER, STAGE_LABELS } from '../../utils/trackingData';
import type { PackageRecord, TrackingStage } from '../../utils/trackingData';

function ProgressStepper({ currentStatus }: { currentStatus: TrackingStage }) {
  const currentIndex = STAGE_ORDER.indexOf(currentStatus);
  const progressPct = currentIndex === 0 ? 0 : (currentIndex / (STAGE_ORDER.length - 1)) * 100;

  return (
    <div className="relative flex items-start justify-between mt-6 mb-8 px-2">
      {/* Background line */}
      <div className="absolute top-5 left-7 right-7 h-0.5 bg-slate-200 z-0" />
      {/* Progress line */}
      <div
        className="absolute top-5 left-7 h-0.5 bg-[#f97316] z-0 transition-all duration-700"
        style={{ width: `calc(${progressPct}% * (100% - 3.5rem) / 100)` }}
      />

      {STAGE_ORDER.map((stage, index) => {
        const isDone = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={stage} className="relative z-10 flex flex-col items-center flex-1">
            <div
              className={[
                'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
                isDone ? 'bg-[#f97316] border-[#f97316]' : '',
                isActive ? 'bg-[#1a2744] border-[#1a2744]' : '',
                !isDone && !isActive ? 'bg-white border-slate-300' : '',
              ].join(' ')}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {index + 1}
                </span>
              )}
            </div>
            <span
              className={[
                'mt-2 text-xs font-medium text-center max-w-[70px] leading-tight',
                isActive ? 'text-[#1a2744] font-semibold' : '',
                isDone ? 'text-[#f97316]' : '',
                !isDone && !isActive ? 'text-slate-400' : '',
              ].join(' ')}
            >
              {STAGE_LABELS[stage]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PackageDetails({ pkg }: { pkg: PackageRecord }) {
  const statusColors: Record<TrackingStage, string> = {
    order_placed: 'bg-blue-100 text-blue-800',
    at_warehouse: 'bg-yellow-100 text-yellow-800',
    in_transit: 'bg-orange-100 text-orange-800',
    out_for_delivery: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="bg-[#1a2744] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-orange-400" />
          <span className="font-bold text-lg tracking-wide">{pkg.id}</span>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[pkg.status]}`}>
          {STAGE_LABELS[pkg.status]}
        </span>
      </div>

      {/* Stepper */}
      <div className="px-6 pt-4">
        <ProgressStepper currentStatus={pkg.status} />
      </div>

      {/* Last update */}
      <div className="px-6 pb-4">
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
          <Clock className="w-4 h-4 mt-0.5 shrink-0" />
          <span><strong>Latest:</strong> {pkg.lastUpdate}</span>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-slate-100">
        <div className="px-6 py-4 border-b sm:border-b-0 sm:border-r border-slate-100">
          <p className="flex items-center gap-1.5 text-slate-400 text-xs uppercase font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5" /> Origin
          </p>
          <p className="text-slate-800 font-medium text-sm">{pkg.origin}</p>
        </div>
        <div className="px-6 py-4 border-b sm:border-b-0 border-slate-100">
          <p className="flex items-center gap-1.5 text-slate-400 text-xs uppercase font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5" /> Destination
          </p>
          <p className="text-slate-800 font-medium text-sm">{pkg.destination}</p>
        </div>
        <div className="px-6 py-4 border-b sm:border-b-0 sm:border-r border-slate-100">
          <p className="flex items-center gap-1.5 text-slate-400 text-xs uppercase font-semibold mb-1">
            <Calendar className="w-3.5 h-3.5" /> Est. Delivery
          </p>
          <p className="text-slate-800 font-medium text-sm">{pkg.estimatedDelivery}</p>
        </div>
        <div className="px-6 py-4">
          <p className="flex items-center gap-1.5 text-slate-400 text-xs uppercase font-semibold mb-1">
            <Truck className="w-3.5 h-3.5" /> Carrier
          </p>
          <p className="text-slate-800 font-medium text-sm">{pkg.carrier}</p>
        </div>
      </div>
    </div>
  );
}

export default function PackageTracker() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<PackageRecord | null | undefined>(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().toUpperCase();
    setResult(PACKAGES[trimmed] ?? null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter tracking number (e.g. TRK-DROP-1336)"
            className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold rounded-lg transition text-sm whitespace-nowrap cursor-pointer"
        >
          Track
        </button>
      </form>

      {/* Idle state */}
      {result === undefined && (
        <div className="text-center text-slate-400 text-sm py-12">
          <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>Enter a tracking number above to get started.</p>
          <p className="mt-1 text-xs">Sample number: TRK-DROP-1336</p>
        </div>
      )}

      {/* Not found */}
      {result === null && (
        <div className="text-center bg-red-50 border border-red-200 rounded-xl px-6 py-10 text-red-700">
          <Package className="w-10 h-10 mx-auto mb-3 text-red-300" />
          <p className="font-semibold">No shipment found</p>
          <p className="text-sm mt-1 text-red-500">
            We couldn't find tracking number "{query.trim().toUpperCase()}"
          </p>
        </div>
      )}

      {/* Result */}
      {result && <PackageDetails pkg={result} />}
    </div>
  );
}
