import express from 'express';
import dotenv from 'dotenv';
import { subscriber } from './services/redis.js';
import apiRoutes from './routes/api.js';
import { addClientData } from './utils/dataStore.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../ui')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

subscriber.psubscribe('stats:*', () => {
  console.log('Subscribed to Redis stats:*');
});

subscriber.on('pmessage', (pattern, channel, message) => {
  const clientId = channel.split(':')[1];
  const data = JSON.parse(message);
  addClientData(clientId, data);
});
