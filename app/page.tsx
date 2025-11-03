"use client";

import { useState } from "react";
import { EventCard } from "@/components/molecules/EventCard";
import { SearchField } from "@/components/molecules/SearchField";
import { FilterDropdown } from "@/components/molecules/FilterDropdown";
import { CategorySeparator } from "@/components/molecules/CategorySeparator";
import { formatDateRange, type Booking } from "@/lib/utils";
import roomingData from "@/data/combined_rooming_data.json";

interface RoomingListData {
  roomingListId: number;
  eventId: number;
  eventName: string;
  hotelId: number;
  rfpName: string;
  cutOffDate: string;
  status: string;
  agreement_type: string;
  bookings: Booking[];
}

const statusOptions = [
  { value: "completed", label: "Completed" },
  { value: "received", label: "Received" },
  { value: "archived", label: "Archived" },
  { value: "confirmed", label: "Confirmed" }
];

const transformedEvents = (roomingData as RoomingListData[]).map((item) => ({
  roomingListId: item.roomingListId,
  rfpCode: item.rfpName,
  agreementType: item.agreement_type.charAt(0).toUpperCase() + item.agreement_type.slice(1),
  eventName: item.eventName,
  cutOffDate: item.cutOffDate,
  dateRange: formatDateRange(item.bookings),
  bookingsCount: item.bookings.length,
  status: item.status.toLowerCase(),
}));

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleApplyFilters = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const filteredEvents = transformedEvents.filter((event) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      event.rfpCode.toLowerCase().includes(query) ||
      event.agreementType.toLowerCase().includes(query) ||
      event.eventName.toLowerCase().includes(query);

    const matchesFilter =
      selectedFilters.length === 0 ||
      selectedFilters.includes(event.status);

    return matchesSearch && matchesFilter;
  });

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const category = event.agreementType;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(event);
    return acc;
  }, {} as Record<string, typeof filteredEvents>);

  const categories = Object.keys(groupedEvents).sort();

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#f7f9fb] font-sans dark:bg-black">
      <main className="flex w-full max-w-7xl flex-col justify-between py-32 px-16 bg-[#f7f9fb] dark:bg-black">
        <div className="flex flex-row pb-12">
          <h1 className="w-full text-4xl font-bold text-black dark:text-zinc-50">
            Rooming List Management: Events
          </h1>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-3 items-start">
          <SearchField
            placeholder="Search"
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <FilterDropdown
            options={statusOptions}
            selectedValues={selectedFilters}
            onApply={handleApplyFilters}
            label="RFP Status"
          />
        </div>

        <div>
          {categories.map((category) => (
            <div key={category}>
              <CategorySeparator categoryName={category} />

              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mb-8">
                {groupedEvents[category].map((event) => (
                  <EventCard
                    key={event.roomingListId}
                    rfpCode={event.rfpCode}
                    agreementType={event.agreementType}
                    cutOffDate={event.cutOffDate}
                    dateRange={event.dateRange}
                    bookingsCount={event.bookingsCount}
                    onViewBookings={() => console.log("View Bookings: ", event.rfpCode)}
                    onCopy={() => console.log("Copy: ", event.rfpCode)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
