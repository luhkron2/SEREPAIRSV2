// SE National Fleet Data - Comprehensive fleet information for dropdowns and auto-fill
export interface FleetUnit {
  fleetNumber: string;
  registration: string;
  type: 'Prime Mover' | 'Trailer' | 'Rigid' | 'Trailer A' | 'Trailer B';
  status: 'Active' | 'Maintenance' | 'Retired';
  location: string;
  driver?: string;
  phone?: string;
}


export interface Driver {
  name: string;
  phone: string;
  employeeId?: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

// SE National Fleet Data - All 47 Unique Truck Registrations
export const FLEET_DATA: FleetUnit[] = [
  // All truck registrations provided by user
  { fleetNumber: 'SB14MI', registration: 'SB14MI', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'WYV365', registration: 'WYV365', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV07XG', registration: 'XV07XG', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV08XG', registration: 'XV08XG', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV38CP', registration: 'XV38CP', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV41IZ', registration: 'XV41IZ', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV44HP', registration: 'XV44HP', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV53RO', registration: 'XV53RO', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV54RO', registration: 'XV54RO', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV55RO', registration: 'XV55RO', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV60XJ', registration: 'XV60XJ', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV61IZ', registration: 'XV61IZ', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV61XJ', registration: 'XV61XJ', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV77TK', registration: 'XV77TK', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV80HF', registration: 'XV80HF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV81HF', registration: 'XV81HF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV83HF', registration: 'XV83HF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV84EF', registration: 'XV84EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV85EF', registration: 'XV85EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV85HF', registration: 'XV85HF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV86EF', registration: 'XV86EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV86KF', registration: 'XV86KF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV87KF', registration: 'XV87KF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV88EF', registration: 'XV88EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV89EF', registration: 'XV89EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV90EF', registration: 'XV90EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV92EF', registration: 'XV92EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV93EF', registration: 'XV93EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV94EF', registration: 'XV94EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV95EF', registration: 'XV95EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XV96EF', registration: 'XV96EF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW06RF', registration: 'XW06RF', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW08JZ', registration: 'XW08JZ', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW09JZ', registration: 'XW09JZ', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW16GH', registration: 'XW16GH', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW17FQ', registration: 'XW17FQ', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW35QS', registration: 'XW35QS', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW36QS', registration: 'XW36QS', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW44HP', registration: 'XW44HP', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW72BA', registration: 'XW72BA', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW72HP', registration: 'XW72HP', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW73BA', registration: 'XW73BA', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW73CZ', registration: 'XW73CZ', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW73WL', registration: 'XW73WL', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW74WL', registration: 'XW74WL', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW76WL', registration: 'XW76WL', type: 'Prime Mover', status: 'Active', location: 'TBD' },
  { fleetNumber: 'XW77WL', registration: 'XW77WL', type: 'Prime Mover', status: 'Active', location: 'TBD' },
];

// Individual Trailers - A and B trailers with actual registration numbers
export const TRAILERS: FleetUnit[] = [
  // Trailer A units with real registrations
  { fleetNumber: '01A', registration: '55801S', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '02A', registration: '76396S', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '03A', registration: '83781S', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '05A', registration: '86873S', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '06A', registration: '91796S', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '08A', registration: '91103S', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '09A', registration: '91798S', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '11A', registration: '77186S', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '16A', registration: 'YV40EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '18A', registration: 'YV44EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '19A', registration: 'YV46EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '20A', registration: 'YV48EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '27A', registration: 'YV58EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '31A', registration: 'YV61EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '32A', registration: 'YV62EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '35A', registration: 'YV70EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '36A', registration: 'YV35II', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '38A', registration: 'YV66EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '39A', registration: 'YV68EU', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '54A', registration: 'YV28MA', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '57A', registration: 'YV17PR', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '58A', registration: 'YV34QB', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '60A', registration: 'YV53QB', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '63A', registration: 'YV52UL', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '64A', registration: 'YV54UL', type: 'Trailer A', status: 'Active', location: 'TBD' },
  { fleetNumber: '66A', registration: 'YV77UL', type: 'Trailer A', status: 'Active', location: 'TBD' },
  
  // Trailer B units with real registrations
  { fleetNumber: '01B', registration: '55801S', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '02B', registration: '70265S', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '03B', registration: '83555S', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '05B', registration: '86864S', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '08B', registration: '91104S', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '11B', registration: '93018S', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '16B', registration: 'YV41EU', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '18B', registration: 'YV45EU', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '27B', registration: 'YV59EU', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '28B', registration: '00806S', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '31B', registration: 'YV60EU', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '32B', registration: 'YV63EU', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '36B', registration: 'YV06II', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '38B', registration: 'YV67EU', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '42B', registration: 'YV75CL', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '44B', registration: 'YV87CL', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '49B', registration: 'YV68HE', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '54B', registration: 'YV29MA', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '57B', registration: 'YV18PR', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '58B', registration: 'YV35QB', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '59B', registration: '97883S', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '61B', registration: 'YV57RF', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '63B', registration: 'YV53UL', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '64B', registration: 'YV55UL', type: 'Trailer B', status: 'Active', location: 'TBD' },
  { fleetNumber: '66B', registration: 'YV78UL', type: 'Trailer B', status: 'Active', location: 'TBD' },
];

export const DRIVERS: Driver[] = [
  { name: 'Amardeep Singh', phone: '+61 412 345 678', employeeId: 'EMP001', status: 'Active' },
  { name: 'Amardeep Sekon', phone: '+61 400 987 654', employeeId: 'EMP002', status: 'Active' },
  { name: 'Amarjeet Singh', phone: '+61 401 234 567', employeeId: 'EMP003', status: 'Active' },
  { name: 'Ammy Singh', phone: '+61 402 345 678', employeeId: 'EMP004', status: 'Active' },
  { name: 'Amandeep Sekon', phone: '+61 403 456 789', employeeId: 'EMP005', status: 'Active' },
  { name: 'Anthony Aloi', phone: '+61 404 567 890', employeeId: 'EMP006', status: 'On Leave' },
  { name: 'Anthony Loverso', phone: '+61 405 678 901', employeeId: 'EMP007', status: 'Active' },
  { name: 'Avtar Singh', phone: '+61 406 789 012', employeeId: 'EMP008', status: 'Active' },
  { name: 'Baljinder Singh', phone: '+61 407 890 123', employeeId: 'EMP009', status: 'Active' },
  { name: 'Balginder Singh', phone: '+61 408 901 234', employeeId: 'EMP010', status: 'Active' },
  { name: 'Bharpoor Singh', phone: '+61 409 012 345', employeeId: 'EMP011', status: 'Active' },
  { name: 'Brendan McNally', phone: '+61 410 123 456', employeeId: 'EMP012', status: 'Active' },
  { name: 'David Ringrose', phone: '+61 411 234 567', employeeId: 'EMP013', status: 'Active' },
  { name: 'David Van Extal', phone: '+61 412 345 678', employeeId: 'EMP014', status: 'Active' },
  { name: 'Dildeep Singh', phone: '+61 413 456 789', employeeId: 'EMP015', status: 'Active' },
  { name: 'Dilpreet Singh Mann', phone: '+61 414 567 890', employeeId: 'EMP016', status: 'Active' },
  { name: 'Gurdeep Singh', phone: '+61 415 678 901', employeeId: 'EMP017', status: 'Active' },
  { name: 'Gurinder Singh', phone: '+61 416 789 012', employeeId: 'EMP018', status: 'Active' },
  { name: 'Gurinder Jit', phone: '+61 417 890 123', employeeId: 'EMP019', status: 'Active' },
  { name: 'Gurpreet Singh', phone: '+61 418 901 234', employeeId: 'EMP020', status: 'Active' },
  { name: 'Gurvir Singh', phone: '+61 419 012 345', employeeId: 'EMP021', status: 'Active' },
  { name: 'Gurvishavgeet Singh', phone: '+61 420 123 456', employeeId: 'EMP022', status: 'Active' },
  { name: 'Harmandeep Singh', phone: '+61 421 234 567', employeeId: 'EMP023', status: 'Active' },
  { name: 'Harmanjot Singh', phone: '+61 422 345 678', employeeId: 'EMP024', status: 'Active' },
  { name: 'Harinderpal Sharma', phone: '+61 423 456 789', employeeId: 'EMP025', status: 'Active' },
  { name: 'Harry Singh', phone: '+61 424 567 890', employeeId: 'EMP026', status: 'Active' },
  { name: 'Hassandeep Singh', phone: '+61 425 678 901', employeeId: 'EMP027', status: 'Active' },
  { name: 'Himanshu Sood', phone: '+61 426 789 012', employeeId: 'EMP028', status: 'Active' },
  { name: 'James Dix', phone: '+61 427 890 123', employeeId: 'EMP029', status: 'Active' },
  { name: 'James Garner', phone: '+61 428 901 234', employeeId: 'EMP030', status: 'Active' },
  { name: 'Jarred Williamson', phone: '+61 429 012 345', employeeId: 'EMP031', status: 'Active' },
  { name: 'Jasdeep Singh', phone: '+61 430 123 456', employeeId: 'EMP032', status: 'Active' },
  { name: 'Jasvir Singh', phone: '+61 431 234 567', employeeId: 'EMP033', status: 'Active' },
  { name: 'Jatinder Singh', phone: '+61 432 345 678', employeeId: 'EMP034', status: 'Active' },
  { name: 'Jeevan Dass', phone: '+61 433 456 789', employeeId: 'EMP035', status: 'Active' },
  { name: 'Kulbir Singh', phone: '+61 434 567 890', employeeId: 'EMP036', status: 'Active' },
  { name: 'Kuldeep Singh', phone: '+61 435 678 901', employeeId: 'EMP037', status: 'Active' },
  { name: 'Kulwant Sangha', phone: '+61 436 789 012', employeeId: 'EMP038', status: 'Active' },
  { name: 'Lapsy Singh', phone: '+61 437 890 123', employeeId: 'EMP039', status: 'Active' },
  { name: 'Lovejeet Singh', phone: '+61 438 901 234', employeeId: 'EMP040', status: 'Active' },
  { name: 'Lovepreet Singh', phone: '+61 439 012 345', employeeId: 'EMP041', status: 'Active' },
  { name: 'Malkit Singh', phone: '+61 440 123 456', employeeId: 'EMP042', status: 'Active' },
  { name: 'Manjit Singh', phone: '+61 441 234 567', employeeId: 'EMP043', status: 'Active' },
  { name: 'Mandeep Singh', phone: '+61 442 345 678', employeeId: 'EMP044', status: 'Active' },
  { name: 'Navjot Singh', phone: '+61 443 456 789', employeeId: 'EMP045', status: 'Active' },
  { name: 'Nick Pappas', phone: '+61 444 567 890', employeeId: 'EMP046', status: 'Active' },
  { name: 'Norm Gregory', phone: '+61 445 678 901', employeeId: 'EMP047', status: 'Active' },
  { name: 'Palwinder Singh', phone: '+61 446 789 012', employeeId: 'EMP048', status: 'Active' },
  { name: 'Parmaveer Singh', phone: '+61 447 890 123', employeeId: 'EMP049', status: 'Active' },
  { name: 'Parmpreet Brah', phone: '+61 448 901 234', employeeId: 'EMP050', status: 'Active' },
  { name: 'Parma Nand', phone: '+61 449 012 345', employeeId: 'EMP051', status: 'Active' },
  { name: 'Parwinder Singh', phone: '+61 450 123 456', employeeId: 'EMP052', status: 'Active' },
  { name: 'Pardeep Singh', phone: '+61 451 234 567', employeeId: 'EMP053', status: 'Active' },
  { name: 'Ranjit Singh', phone: '+61 452 345 678', employeeId: 'EMP054', status: 'Active' },
  { name: 'Rupinder Singh', phone: '+61 453 456 789', employeeId: 'EMP055', status: 'Active' },
  { name: 'Sam Singh', phone: '+61 454 567 890', employeeId: 'EMP056', status: 'Active' },
  { name: 'Shubhdeep Singh', phone: '+61 455 678 901', employeeId: 'EMP057', status: 'Active' },
  { name: 'Simon Rooding', phone: '+61 456 789 012', employeeId: 'EMP058', status: 'Active' },
  { name: 'Sukmander Singh', phone: '+61 457 890 123', employeeId: 'EMP059', status: 'Active' },
  { name: 'Yadwinder Singh', phone: '+61 458 901 234', employeeId: 'EMP060', status: 'Active' },
];

// Helper functions for auto-fill
export function getFleetByNumber(fleetNumber: string): FleetUnit | undefined {
  return FLEET_DATA.find(fleet => fleet.fleetNumber === fleetNumber);
}

export function getDriverByName(name: string): Driver | undefined {
  return DRIVERS.find(driver => driver.name === name);
}

// Get all active fleet numbers for dropdowns
export function getActiveFleetNumbers(): string[] {
  return FLEET_DATA
    .filter(fleet => fleet.status === 'Active')
    .map(fleet => fleet.fleetNumber)
    .sort();
}

// Get all active trailers for dropdowns
export function getActiveTrailers(): string[] {
  return TRAILERS
    .filter(trailer => trailer.status === 'Active')
    .map(trailer => trailer.fleetNumber)
    .sort();
}

// Get all active drivers for dropdowns
export function getActiveDrivers(): Driver[] {
  return DRIVERS.filter(driver => driver.status === 'Active');
}

