
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { patients, appointments } from "@/data/mockData";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Reports() {
  // Calculate age distribution
  const calculateAge = (birthDateString: string) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const ageGroups = {
    "0-18": 0,
    "19-35": 0,
    "36-50": 0,
    "51-65": 0,
    "65+": 0,
  };

  patients.forEach(patient => {
    const age = calculateAge(patient.dateOfBirth);
    if (age <= 18) ageGroups["0-18"]++;
    else if (age <= 35) ageGroups["19-35"]++;
    else if (age <= 50) ageGroups["36-50"]++;
    else if (age <= 65) ageGroups["51-65"]++;
    else ageGroups["65+"]++;
  });

  const ageData = Object.entries(ageGroups).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate gender distribution
  const genderCount = patients.reduce(
    (acc, patient) => {
      const gender = patient.gender;
      if (gender in acc) {
        acc[gender]++;
      }
      return acc;
    },
    { Male: 0, Female: 0, Other: 0 }
  );

  const genderData = Object.entries(genderCount).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate appointment status distribution
  const appointmentStatusCount = appointments.reduce(
    (acc, appointment) => {
      const status = appointment.status;
      if (status in acc) {
        acc[status]++;
      }
      return acc;
    },
    { scheduled: 0, completed: 0, cancelled: 0, "no-show": 0 }
  );

  const appointmentStatusData = Object.entries(appointmentStatusCount).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  // Calculate appointments by day of week
  const appointmentsByDayOfWeek = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  appointments.forEach(appointment => {
    const date = new Date(appointment.date);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    appointmentsByDayOfWeek[dayOfWeek as keyof typeof appointmentsByDayOfWeek]++;
  });

  const appointmentsByDayData = Object.entries(appointmentsByDayOfWeek).map(([name, value]) => ({
    name,
    appointments: value,
  }));

  const COLORS = ["#2C7FB8", "#7FCDEE", "#5EB1BF", "#A3DDCB", "#EDF6F9"];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive insights about your practice and patient demographics
          </p>
        </div>

        <Tabs defaultValue="demographics">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="demographics">Patient Demographics</TabsTrigger>
            <TabsTrigger value="appointments">Appointment Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                  <CardDescription>Patient age groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={120}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => 
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {ageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gender Distribution</CardTitle>
                  <CardDescription>Patient gender breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={120}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => 
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Status</CardTitle>
                  <CardDescription>Distribution by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={appointmentStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={120}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => 
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {appointmentStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointments by Day of Week</CardTitle>
                  <CardDescription>Weekly distribution of appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={appointmentsByDayData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end"
                          height={60}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="appointments" fill="#2C7FB8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
