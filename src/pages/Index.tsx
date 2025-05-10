
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import PatientStats from "@/components/PatientStats";
import PatientCard from "@/components/PatientCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPatientsWithUpcomingAppointments, getUpcomingAppointments } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Bed, FileText } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const upcomingAppointments = getUpcomingAppointments();
  const patientsWithAppointments = getPatientsWithUpcomingAppointments().slice(0, 3);

  const todayAppointments = upcomingAppointments.filter(
    (appointment) => appointment.date === new Date().toISOString().slice(0, 10)
  ).length;

  const quickStats = [
    {
      title: "Today's Appointments",
      value: todayAppointments,
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Patients",
      value: 8, // From mockData
      icon: Users, 
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Available Rooms",
      value: 3,
      icon: Bed,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Pending Reports",
      value: 5,
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Welcome back, Dr. Johnson</CardTitle>
                <CardDescription>
                  Here's what's happening at your clinic today
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="mb-4">
                  You have <strong>{todayAppointments}</strong> appointments scheduled for today, and{" "}
                  <strong>{upcomingAppointments.length - todayAppointments}</strong> more in the upcoming days.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => navigate("/appointments/new")}>
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/patients")}>
                    View All Patients
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>
                  Patients with upcoming appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {patientsWithAppointments.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => navigate("/patients")}>
                  View All Patients
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <UpcomingAppointments />
            <PatientStats />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
