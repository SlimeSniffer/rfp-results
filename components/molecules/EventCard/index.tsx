"use client";

import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Calendar, Copy, Eye } from "lucide-react";
import { CalendarDate } from "@/components/molecules/CalendarDate";

export interface EventCardProps {
  rfpCode: string;
  agreementType: string;
  cutOffDate: string;
  dateRange: string;
  bookingsCount: number;
  onViewBookings?: () => void;
  onCopy?: () => void;
}

export function EventCard({
  rfpCode,
  agreementType,
  cutOffDate,
  dateRange,
  bookingsCount,
  onViewBookings,
  onCopy
}: EventCardProps) {
  return (
    <Card className="w-full">

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{rfpCode}</h3>
            <p className="text-sm text-gray-600">
              Agreement: <span className="font-semibold text-gray-900">{agreementType}</span>
            </p>
          </div>
          <CalendarDate date={cutOffDate} label="Cut-Off Date" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Date Range */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{dateRange}</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onViewBookings}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Bookings ({bookingsCount})
          </Button>
          <Button
            onClick={onCopy}
            className="aspect-square"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

