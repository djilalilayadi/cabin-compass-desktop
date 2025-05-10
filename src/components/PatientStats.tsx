
import React from "react";
import { useNavigate } from "react-router-dom";
import { patients } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export default function PatientStats() {
  const navigate = useNavigate();

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

  const COLORS = ["#2C7FB8", "#7FCDEE", "#5EB1BF", "#A3DDCB", "#EDF6F9"];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold">Patient Demographics</CardTitle>
          <CardDescription>Age and gender distribution</CardDescription>
        </div>
        <Users className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-center">Age Distribution</h4>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-center">Gender Distribution</h4>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/reports")}
        >
          View Detailed Reports
        </Button>
      </CardFooter>
    </Card>
  );
}
