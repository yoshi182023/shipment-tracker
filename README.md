# Shipment Tracker: RESTful Microservice in TypeScript

NovaBridge Logistics real-time shipment tracking platform — Express/TypeScript microservice for managing shipment records.

## Required Tasks

### Task 1: Implement `POST /shipments`

The Shipment interface is defined in `src/models/shipment.ts` and store helpers are provided in `src/store/inMemoryStore.ts`.

- Implement the `POST /shipments` handler in `src/routes/shipments.ts`
- Validate that `trackingId`, `destination`, `status`, and `weightKg` are all present in the request body
- Store the new shipment and return it with HTTP `201`
- Return HTTP `400` with a descriptive error message listing all missing fields if any are absent

### Task 2: Implement `GET /shipments`

- Implement the `GET /shipments` handler in `src/routes/shipments.ts`
- Return all shipments currently in the store
- When a `status` query parameter is provided (e.g. `?status=in-transit`), return only shipments matching that status
- Return an empty array when no matches are found
- Use TypeScript types throughout — avoid `any`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/shipments` | Create a new shipment |
| `GET` | `/shipments` | List all shipments |
| `GET` | `/shipments?status=<status>` | Filter shipments by status (e.g. `in-transit`) |
| `GET` | `/health` | Health check |

### Valid statuses

`pending` · `in-transit` · `delivered` · `cancelled`

## Sample Inputs and Outputs

### POST /shipments — success

Request body:

```json
{
  "trackingId": "TRK-042",
  "destination": "Denver, CO",
  "status": "pending",
  "weightKg": 10.5
}
```

Response `201`:

```json
{
  "trackingId": "TRK-042",
  "destination": "Denver, CO",
  "status": "pending",
  "weightKg": 10.5
}
```

### POST /shipments — missing field

Request body:

```json
{
  "trackingId": "TRK-099",
  "destination": "Miami, FL"
}
```

Response `400`:

```json
{
  "error": "Missing required fields: status, weightKg"
}
```

### GET /shipments?status=pending

Response `200`:

```json
[
  {
    "trackingId": "TRK-042",
    "destination": "Denver, CO",
    "status": "pending",
    "weightKg": 10.5
  }
]
```

## File structure

```
src/
  app.ts                 # Express app setup
  routes/shipments.ts    # Route handlers (create + filter by status)
  models/shipment.ts     # TypeScript interfaces
  store/inMemoryStore.ts # In-memory data store
tests/
  shipments.test.ts      # Jest integration tests
```

## How to run and test

```bash
cd shipment-tracker
npm install
npm test
npm run dev
```

Server listens on port `3000` by default (`PORT` env var overrides).
