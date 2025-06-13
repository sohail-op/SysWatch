import { getProcessStats } from './utils.js';
import { redis } from '../../server/services/redis.js';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.CLIENT_ID || 'client2-unknown';
const interval = parseInt(process.env.PUBLISH_INTERVAL_MS) || 3000;

setInterval(async () => {
  const stats = await getProcessStats(false);
  await redis.publish(`stats:${clientId}`, JSON.stringify(stats));
  console.log(`[${clientId}] Published bottom stats`);
}, interval);
