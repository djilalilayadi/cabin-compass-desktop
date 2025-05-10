
import React from "react";
import { useNavigate } from "react-router-dom";
import { getUpcomingAppointments } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import AppointmentItem from "./AppointmentItem";

export default function UpcomingAppointments() {
  const navigate = useNavigate();
  const appointments = getUpcomingAppointments().slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold">Upcoming Appointments</CardTitle>
          <CardDescription>Next scheduled appointments</CardDescription>
        </div>
        <Calendar className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-2">
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentItem
                key={appointment.id}
                appointment={appointment}
                compact={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32">
            <p className="text-sm text-muted-foreground">No upcoming appointments</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/appointments")}
        >
          View All Appointments
        </Button>
      </CardFooter>
    </Card>
  );
}
