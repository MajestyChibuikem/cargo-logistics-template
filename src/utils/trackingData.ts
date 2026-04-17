export type TrackingStage = 'order_placed' | 'at_warehouse' | 'in_transit' | 'out_for_delivery';

export interface PackageRecord {
  id: string;
  status: TrackingStage;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  carrier: string;
  lastUpdate: string;
}

export const STAGE_ORDER: TrackingStage[] = [
  'order_placed',
  'at_warehouse',
  'in_transit',
  'out_for_delivery',
];

export const STAGE_LABELS: Record<TrackingStage, string> = {
  order_placed: 'Order Placed',
  at_warehouse: 'At Warehouse',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
};

export const PACKAGES: Record<string, PackageRecord> = {
  'CARGO-001': {
    id: 'CARGO-001',
    status: 'out_for_delivery',
    origin: 'Lagos, Nigeria',
    destination: 'Abuja, Nigeria',
    estimatedDelivery: 'Today by 8:00 PM',
    carrier: 'AstroFlow Express',
    lastUpdate: 'Departed local sorting facility at 7:15 AM',
  },
  'CARGO-002': {
    id: 'CARGO-002',
    status: 'in_transit',
    origin: 'London, UK',
    destination: 'Manchester, UK',
    estimatedDelivery: 'Tomorrow by 6:00 PM',
    carrier: 'AstroFlow Road',
    lastUpdate: 'Package scanned at Birmingham hub',
  },
  'CARGO-003': {
    id: 'CARGO-003',
    status: 'at_warehouse',
    origin: 'Dubai, UAE',
    destination: 'Cairo, Egypt',
    estimatedDelivery: 'Apr 19 by 5:00 PM',
    carrier: 'AstroFlow Air',
    lastUpdate: 'Awaiting customs clearance at Dubai facility',
  },
  'CARGO-004': {
    id: 'CARGO-004',
    status: 'order_placed',
    origin: 'New York, USA',
    destination: 'Toronto, Canada',
    estimatedDelivery: 'Apr 22 by 12:00 PM',
    carrier: 'AstroFlow International',
    lastUpdate: 'Order received and being processed',
  },
};
