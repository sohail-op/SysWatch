import si from 'systeminformation';

export async function getProcessStats(top = true, count = 10) {
  const processes = await si.processes();
  const sorted = processes.list
    .sort((a, b) => top ? b.cpu - a.cpu : a.cpu - b.cpu)
    .slice(0, count)
    .map(proc => ({
      pid: proc.pid,
      cpu: proc.cpu,
      mem: proc.mem
    }));

  return sorted;
}
