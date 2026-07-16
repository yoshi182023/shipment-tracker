import express, { Application } from 'express';
import shipmentsRouter from './routes/shipments';

const app: Application = express();
const PORT = 3000;
app.use(express.json());
app.use('/shipments', shipmentsRouter);

app.get('/health', (_req, res) => {
  res.status(200).json({message:"Welcome to the Shipment Tracker API" });
});

app.use("/shipments", shipmentsRouter);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Shipment Tracker listening on port ${PORT}`);
  });
}

export default app;
