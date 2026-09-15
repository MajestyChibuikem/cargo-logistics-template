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
  'TRK-DROP-1336': {
    id: 'TRK-DROP-1336',
    status: 'order_placed',
    origin: 'New York, USA',
    destination: 'London',
    estimatedDelivery: 'Oct 12 by 5:00 pm',
    carrier: 'Express-premuim-air',
    lastUpdate: 'package has left the facility',
  }
};
