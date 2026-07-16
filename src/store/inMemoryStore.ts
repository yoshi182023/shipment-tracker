import { Shipment } from '../models/shipment';

const shipments: Map<string, Shipment> = new Map();

export function addShipment(shipment: Shipment): Shipment {
  shipments.set(shipment.trackingId, shipment);
  return shipment;
}

export function getShipmentById(trackingId: string): Shipment | undefined {
  return shipments.get(trackingId);
}

export function getAllShipments(): Shipment[] {
  return Array.from(shipments.values());
}

export function getShipmentsByStatus(status: string): Shipment[] {
  return getAllShipments().filter((s) => s.status === status);
}

export function clearStore(): void {
  shipments.clear();
}
