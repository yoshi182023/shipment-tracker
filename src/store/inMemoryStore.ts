import { Shipment } from '../models/shipment';

const shipments: Shipment[] = [];

export function addShipment(shipment: Shipment): void {
  shipments.push(shipment);
}

export function getAllShipments(): Shipment[] {
  return [...shipments];
}

export function getShipmentsByStatus(status: string): Shipment[] {
  return shipments.filter((s) => s.status === status);
}

export function clearStore(): void {
  shipments.length = 0;
}
