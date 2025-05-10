
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import AppointmentItem from "@/components/AppointmentItem";
import { appointments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Plus, Search } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function Appointments() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredAppointments = appointments
    .filter((appointment) => {
      // Filter by search term (patient name)
      const matchesSearch = appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      // Filter by status
      const matchesStatus =
        filterStatus === "all" || appointment.status === filterStatus;
      
      // Filter by date
      const matchesDate = !selectedDate || appointment.date === format(selectedDate, "yyyy-MM-dd");
      
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      // Sort by date and then by time
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.time.localeCompare(b.time);
    });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Appointment Management</h1>
          <Button onClick={() => navigate("/appointments/new")}>
            <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by patient name..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-[170px]",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <Select
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {selectedDate && (
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Appointments for {format(selectedDate, "MMMM d, yyyy")}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(undefined)}
              >
                Clear date filter
              </Button>
            </div>
          )}

          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentItem
                key={appointment.id}
                appointment={appointment}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No appointments found</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                  setSelectedDate(undefined);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
