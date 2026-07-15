// Mock data replacing the backend JSON store

export const STATS = {
  routeCompletion: 78,
  complaints: 5,
  trucksActive: 3,
  binsToday: 142,
  totalBins: 240,
  resolvedToday: 12,
};

export const REPORTS = [
  { id: 'RPT-001', issueType: 'Overflowing Bin', description: 'Bin at the gate has been overflowing since Monday', location: 'Sector 12, Nerul', status: 'pending', submittedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString() },
  { id: 'RPT-002', issueType: 'Missed Collection', description: 'Truck did not come yesterday', location: 'Vashi Naka, Vashi', status: 'pending', submittedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: 'RPT-003', issueType: 'Damaged Bin', description: 'Lid is broken and cannot be closed', location: 'Palm Beach Road, Sanpada', status: 'resolved', submittedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
  { id: 'RPT-004', issueType: 'Illegal Dumping', description: 'Large pile of construction waste on footpath', location: 'Turbhe MIDC, Turbhe', status: 'pending', submittedAt: new Date(Date.now() - 1000 * 60 * 220).toISOString() },
  { id: 'RPT-005', issueType: 'Overflowing Bin', description: 'Bin near bus stop is overflowing', location: 'Belapur CBD, Belapur', status: 'resolved', submittedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString() },
  { id: 'RPT-006', issueType: 'Missed Collection', description: 'No collection for 3 days in our lane', location: 'Sector 8, Airoli', status: 'pending', submittedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: 'RPT-007', issueType: 'Damaged Bin', description: 'Bin has a large crack and is leaking', location: 'Ghansoli Node, Ghansoli', status: 'pending', submittedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
  { id: 'RPT-008', issueType: 'Illegal Dumping', description: 'Old furniture dumped near the park entrance', location: 'Central Park, Kharghar', status: 'resolved', submittedAt: new Date(Date.now() - 1000 * 60 * 400).toISOString() },
];

export const ACTIVITY_FEED = [
  { id: 'BIN-2201', location: 'Sector 12, Nerul', collectedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
  { id: 'BIN-1804', location: 'Palm Beach Road, Sanpada', collectedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString() },
  { id: 'BIN-3305', location: 'Vashi Naka, Vashi', collectedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
  { id: 'BIN-0912', location: 'Turbhe MIDC, Turbhe', collectedAt: new Date(Date.now() - 1000 * 60 * 51).toISOString() },
  { id: 'BIN-4417', location: 'Belapur CBD, Belapur', collectedAt: new Date(Date.now() - 1000 * 60 * 68).toISOString() },
  { id: 'BIN-5521', location: 'Sector 8, Airoli', collectedAt: new Date(Date.now() - 1000 * 60 * 85).toISOString() },
  { id: 'BIN-6630', location: 'Ghansoli Node, Ghansoli', collectedAt: new Date(Date.now() - 1000 * 60 * 102).toISOString() },
  { id: 'BIN-7741', location: 'Kharghar Central Park', collectedAt: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
  { id: 'BIN-8852', location: 'Kopar Khairane Depot', collectedAt: new Date(Date.now() - 1000 * 60 * 16).toISOString() },
  { id: 'BIN-9963', location: 'CBD Belapur Station', collectedAt: new Date(Date.now() - 1000 * 60 * 29).toISOString() },
];

export const BINS = [
  { id: 'BIN-2201', location: 'Sector 12, Nerul', area: 'Zone A · Nerul West', distance: '0.3 km', status: 'pending' },
  { id: 'BIN-1804', location: 'Palm Beach Road', area: 'Zone B · Sanpada', distance: '0.8 km', status: 'pending' },
  { id: 'BIN-3305', location: 'Vashi Naka', area: 'Zone B · Vashi', distance: '1.2 km', status: 'pending' },
  { id: 'BIN-0912', location: 'Turbhe MIDC Gate', area: 'Zone C · Turbhe', distance: '2.1 km', status: 'pending' },
  { id: 'BIN-4417', location: 'Belapur CBD', area: 'Zone D · Belapur', distance: '3.4 km', status: 'pending' },
  { id: 'BIN-5521', location: 'Sector 8, Airoli', area: 'Zone E · Airoli', distance: '4.0 km', status: 'pending' },
  { id: 'BIN-6630', location: 'Ghansoli Node', area: 'Zone E · Ghansoli', distance: '4.7 km', status: 'pending' },
  { id: 'BIN-7741', location: 'Kharghar Central Park', area: 'Zone F · Kharghar', distance: '5.3 km', status: 'pending' },
];

export const TRUCKS = [
  { id: 'TRK-802', driver: 'Rajesh Kumar', status: 'active', binsCollected: 18, zone: 'Zone A–B', lastPing: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
  { id: 'TRK-404', driver: 'Suresh Patil', status: 'idle', binsCollected: 11, zone: 'Zone C', lastPing: new Date(Date.now() - 1000 * 60 * 14).toISOString() },
  { id: 'TRK-211', driver: 'Manoj Verma', status: 'active', binsCollected: 24, zone: 'Zone D–E', lastPing: new Date(Date.now() - 1000 * 60 * 1).toISOString() },
];
