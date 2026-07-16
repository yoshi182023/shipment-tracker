export type ShipmentStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled';

export interface Shipment {
  trackingId: string;
  destination: string;
  status: ShipmentStatus;
  weightKg: number;
}