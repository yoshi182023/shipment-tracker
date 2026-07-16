import { Router, Request, Response } from 'express';
import { Shipment } from '../models/shipment';
import {
  addShipment,
  getAllShipments,
  getShipmentsByStatus,
} from '../store/inMemoryStore';

const router = Router();

// POST /shipments - create a new shipment
router.post('/', (req: Request, res: Response): void => {
  // TODO: Validate required fields, store the shipment, and return it with HTTP 201
  res.status(501).json({ error: 'Not implemented' });
});

// GET /shipments - retrieve all shipments, optionally filtered by status
router.get('/', (req: Request, res: Response): void => {
  // TODO: Return all shipments, or filter by the 'status' query parameter if provided
  res.status(501).json({ error: 'Not implemented' });
});

export default router;
