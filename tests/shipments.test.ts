import request from 'supertest';
import app from '../src/app';
import { clearStore } from '../src/store/inMemoryStore';
import { Shipment } from '../src/models/shipment';

beforeEach(() => {
  clearStore();
});

describe('POST /shipments', () => {
  it('creates a shipment and returns 201', async () => {
    const payload = {
      trackingId: 'TRK-042',
      destination: 'Denver, CO',
      status: 'pending',
      weightKg: 10.5,
    };

    const res = await request(app).post('/shipments').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      trackingId: 'TRK-042',
      destination: 'Denver, CO',
      status: 'pending',
      weightKg: 10.5,
    });
  });

  it('returns 400 listing all missing fields', async () => {
    const res = await request(app).post('/shipments').send({
      trackingId: 'TRK-099',
      destination: 'Miami, FL',
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'Missing required fields: status, weightKg',
    });
  });

  it('returns 400 listing every absent field', async () => {
    const res = await request(app).post('/shipments').send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      'Missing required fields: trackingId, destination, status, weightKg'
    );
  });
});

describe('GET /shipments', () => {
  beforeEach(async () => {
    await request(app).post('/shipments').send({
      trackingId: 'TRK-A',
      destination: 'Denver, CO',
      status: 'pending',
      weightKg: 10.5,
    });
    await request(app).post('/shipments').send({
      trackingId: 'TRK-B',
      destination: 'Austin, TX',
      status: 'in-transit',
      weightKg: 5,
    });
    await request(app).post('/shipments').send({
      trackingId: 'TRK-C',
      destination: 'Miami, FL',
      status: 'pending',
      weightKg: 2.2,
    });
  });

  it('returns all shipments when status is omitted', async () => {
    const res = await request(app).get('/shipments');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);
  });

  it('returns shipments matching the status filter', async () => {
    const res = await request(app).get('/shipments').query({ status: 'pending' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(
      res.body.every((s: Shipment) => s.status === 'pending')
    ).toBe(true);
  });

  it('filters with hyphenated status values', async () => {
    const res = await request(app).get('/shipments').query({ status: 'in-transit' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        trackingId: 'TRK-B',
        destination: 'Austin, TX',
        status: 'in-transit',
        weightKg: 5,
      },
    ]);
  });

  it('returns an empty array when no shipments match', async () => {
    const res = await request(app).get('/shipments').query({ status: 'delivered' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
