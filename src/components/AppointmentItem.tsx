
import React from "react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Appointment } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface AppointmentItemProps {
  appointment: Appointment;
  showPatientName?: boolean;
  compact?: boolean;
}

export default function AppointmentItem({
  appointment,
  showPatientName = true,
  compact = false,
}: AppointmentItemProps) {
  const { patientName, date, time, status, reason } = appointment;

  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    "no-show": "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  const formattedDate = format(parseISO(date), "MMM d, yyyy");
  const formattedTime = format(parseISO(`2000-01-01T${time}`), "h:mm a");

  if (compact) {
    return (
      <div className="flex items-center justify-between py-2 border-b last:border-0">
        <div className="flex flex-col">
          {showPatientName && <p className="font-medium">{patientName}</p>}
          <p className="text-sm text-gray-500">{reason}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{formattedTime}</span>
          <Badge
            variant="outline"
            className={cn("capitalize", statusColors[status])}
          >
            {status}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <Card className="mb-3 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            {showPatientName && (
              <h3 className="font-medium">{patientName}</h3>
            )}
            <p className="text-sm text-gray-700">{reason}</p>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {formattedDate}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {formattedTime}
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "capitalize mt-2 md:mt-0 md:self-start",
              statusColors[status]
            )}
          >
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
