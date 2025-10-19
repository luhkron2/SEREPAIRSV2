export interface DriverMapping {
  phone: string;
  status?: string;
}

export interface FleetMapping {
  rego: string;
  status?: string;
}

export interface TrailerMapping {
  rego: string;
  type: string;
  status: string;
  location: string;
}

export interface MappingsCache {
  drivers: Record<string, DriverMapping>;
  fleets: Record<string, FleetMapping>;
  trailers: Record<string, TrailerMapping>;
}

export function getDriverPhone(
  mappings: MappingsCache,
  name: string
): string | undefined {
  return mappings.drivers[name]?.phone;
}

export function getFleetRego(
  mappings: MappingsCache,
  fleetNumber: string
): string | undefined {
  return mappings.fleets[fleetNumber]?.rego;
}

export function getTrailerInfo(
  mappings: MappingsCache,
  trailerKey: string
): TrailerMapping | undefined {
  return mappings.trailers[trailerKey];
}

export async function fetchMappings(): Promise<MappingsCache> {
  const response = await fetch('/api/mappings');
  if (!response.ok) {
    throw new Error('Failed to fetch mappings');
  }
  return response.json();
}

export function parseMappingValue<T>(value: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return {} as T;
  }
}

