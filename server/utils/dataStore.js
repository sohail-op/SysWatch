const dataStore = new Map();

export function addClientData(clientId, newData) {
  if (!dataStore.has(clientId)) 
        dataStore.set(clientId, []);
  const list = dataStore.get(clientId);
  list.push({ timestamp: Date.now(), data: newData });

  const cutoff = Date.now() - 30 * 60 * 1000;
  dataStore.set(clientId, list.filter(item => item.timestamp > cutoff));
}

export function getClientData(clientId) {
  return dataStore.get(clientId) || [];
}
