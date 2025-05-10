
import React from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "@/data/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { MoreHorizontal, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PatientCardProps {
  patient: Patient;
  compact?: boolean;
}

export default function PatientCard({ patient, compact = false }: PatientCardProps) {
  const { id, name, email, dateOfBirth, gender, lastVisit } = patient;
  const navigate = useNavigate();

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

  const age = calculateAge(dateOfBirth);
  const formattedDOB = format(parseISO(dateOfBirth), "MMM d, yyyy");
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (compact) {
    return (
      <div className="flex items-center space-x-4 p-2 hover:bg-muted/50 rounded-md transition-colors">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">
            {age} years • {gender}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/patients/${id}`)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden hover-scale">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-medium text-lg">{name}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                {age} years • {gender}
              </div>
              {lastVisit && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                  Last visit: {format(parseISO(lastVisit), "MMM d, yyyy")}
                </div>
              )}
              {!lastVisit && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  New Patient
                </Badge>
              )}
            </div>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/patients/${id}`)}>
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate(`/appointments/new?patientId=${id}`)}
                >
                  Schedule appointment
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit patient</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 px-6 py-3">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => navigate(`/patients/${id}`)}
        >
          View Patient Record
        </Button>
      </CardFooter>
    </Card>
  );
}
