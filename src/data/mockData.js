// Mock data replacing the backend JSON store

export const STATS = {
  routeCompletion: 78,
  complaints: 5,
  trucksActive: 3,
  binsToday: 142,
};

export const REPORTS = [
  { id: 'RPT-001', issueType: 'Overflowing Bin', description: 'Bin at the gate has been overflowing since Monday', location: 'Sector 12, Nerul', status: 'pending', submittedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString() },
  { id: 'RPT-002', issueType: 'Missed Collection', description: 'Truck did not come yesterday', location: 'Vashi Naka, Vashi', status: 'pending', submittedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: 'RPT-003', issueType: 'Damaged Bin', description: 'Lid is broken and cannot be closed', location: 'Palm Beach Road, Sanpada', status: 'resolved', submittedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
  { id: 'RPT-004', issueType: 'Illegal Dumping', description: 'Large pile of construction waste on footpath', location: 'Turbhe MIDC, Turbhe', status: 'pending', submittedAt: new Date(Date.now() - 1000 * 60 * 220).toISOString() },
  { id: 'RPT-005', issueType: 'Overflowing Bin', description: 'Bin near bus stop is overflowing', location: 'Belapur CBD, Belapur', status: 'resolved', submittedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString() },
];

export const ACTIVITY_FEED = [
  { id: 'BIN-2201', location: 'Sector 12, Nerul', collectedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
  { id: 'BIN-1804', location: 'Palm Beach Road, Sanpada', collectedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString() },
  { id: 'BIN-3305', location: 'Vashi Naka, Vashi', collectedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
  { id: 'BIN-0912', location: 'Turbhe MIDC, Turbhe', collectedAt: new Date(Date.now() - 1000 * 60 * 51).toISOString() },
  { id: 'BIN-4417', location: 'Belapur CBD, Belapur', collectedAt: new Date(Date.now() - 1000 * 60 * 68).toISOString() },
];

export const BINS = [
  { id: 'BIN-2201', location: 'Sector 12, Nerul', area: 'Zone A · Nerul West', distance: '0.3 km', status: 'pending' },
  { id: 'BIN-1804', location: 'Palm Beach Road', area: 'Zone B · Sanpada', distance: '0.8 km', status: 'pending' },
  { id: 'BIN-3305', location: 'Vashi Naka', area: 'Zone B · Vashi', distance: '1.2 km', status: 'pending' },
  { id: 'BIN-0912', location: 'Turbhe MIDC Gate', area: 'Zone C · Turbhe', distance: '2.1 km', status: 'pending' },
  { id: 'BIN-4417', location: 'Belapur CBD', area: 'Zone D · Belapur', distance: '3.4 km', status: 'pending' },
];
