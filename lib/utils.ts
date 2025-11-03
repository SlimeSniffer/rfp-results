import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Booking {
  bookingId: number;
  hotelId: number;
  eventId: number;
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
}

export function formatDateRange(bookings: Booking[]): string {
  if (bookings.length === 0) return "No dates";

  const dates = bookings.flatMap(b => [new Date(b.checkInDate), new Date(b.checkOutDate)]);
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

  const minMonth = minDate.toLocaleDateString('en-US', { month: 'short' });
  const minDay = minDate.getDate();
  const maxMonth = maxDate.toLocaleDateString('en-US', { month: 'short' });
  const maxDay = maxDate.getDate();
  const year = maxDate.getFullYear();

  return `${minMonth} ${minDay} - ${maxMonth} ${maxDay}, ${year}`;
}
