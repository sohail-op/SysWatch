import express from 'express';
import { getClientData } from '../utils/dataStore.js';

const router = express.Router();

router.get('/client-data', (req, res) => {
  const { clientId } = req.query;
  if (!clientId) 
    return res.status(400).json({ error: 'Missing clientId' });

  const data = getClientData(clientId);
  res.json(data);
});

export default router;
