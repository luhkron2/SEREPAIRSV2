import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';

const MELBOURNE_TZ = 'Australia/Melbourne';

export function getMelbourneTime(date?: Date | string): Date {
  const d = typeof date === 'string' ? parseISO(date) : date || new Date();
  return new Date(formatInTimeZone(d, MELBOURNE_TZ, "yyyy-MM-dd'T'HH:mm:ssXXX"));
}

export function formatMelbourne(
  date: Date | string,
  formatStr: string = 'PPpp'
): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatInTimeZone(d, MELBOURNE_TZ, formatStr);
}

export function formatMelbourneShort(date: Date | string): string {
  return formatMelbourne(date, 'dd/MM/yyyy HH:mm');
}

export function formatMelbourneDate(date: Date | string): string {
  return formatMelbourne(date, 'dd/MM/yyyy');
}

export function formatMelbourneTime(date: Date | string): string {
  return formatMelbourne(date, 'HH:mm');
}

