
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  medicalHistory: string;
  lastVisit: string | null;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
}

export const patients: Patient[] = [
  {
    id: "P001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    address: "123 Main St, Anytown, CA 12345",
    medicalHistory: "Hypertension, Allergic to penicillin",
    lastVisit: "2023-04-20"
  },
  {
    id: "P002",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "(555) 234-5678",
    dateOfBirth: "1990-09-22",
    gender: "Female",
    address: "456 Oak Ave, Springfield, CA 12346",
    medicalHistory: "Asthma, Migraines",
    lastVisit: "2023-05-12"
  },
  {
    id: "P003",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 345-6789",
    dateOfBirth: "1978-11-03",
    gender: "Male",
    address: "789 Pine St, Westfield, CA 12347",
    medicalHistory: "Type 2 Diabetes, High Cholesterol",
    lastVisit: "2023-05-01"
  },
  {
    id: "P004",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "(555) 456-7890",
    dateOfBirth: "1992-03-27",
    gender: "Female",
    address: "101 Elm St, Northtown, CA 12348",
    medicalHistory: "Anxiety, Vitamin D deficiency",
    lastVisit: "2023-05-15"
  },
  {
    id: "P005",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    phone: "(555) 567-8901",
    dateOfBirth: "1965-08-14",
    gender: "Male",
    address: "202 Maple Ave, Eastville, CA 12349",
    medicalHistory: "Arthritis, Hearing loss",
    lastVisit: "2023-04-10"
  },
  {
    id: "P006",
    name: "Lisa Brown",
    email: "lisa.brown@example.com",
    phone: "(555) 678-9012",
    dateOfBirth: "1982-12-09",
    gender: "Female",
    address: "303 Cedar Rd, Southtown, CA 12350",
    medicalHistory: "Hypothyroidism",
    lastVisit: "2023-05-18"
  },
  {
    id: "P007",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "(555) 789-0123",
    dateOfBirth: "1973-02-21",
    gender: "Male",
    address: "404 Birch Blvd, Westville, CA 12351",
    medicalHistory: "GERD, Sleep apnea",
    lastVisit: null
  },
  {
    id: "P008",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@example.com",
    phone: "(555) 890-1234",
    dateOfBirth: "1988-07-16",
    gender: "Female",
    address: "505 Walnut St, Centertown, CA 12352",
    medicalHistory: "Depression, IBS",
    lastVisit: "2023-04-15"
  }
];

export const appointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "John Smith",
    date: "2023-05-25",
    time: "09:00",
    status: "scheduled",
    reason: "Annual check-up",
    notes: "Patient requested prescription refill"
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Emily Johnson",
    date: "2023-05-25",
    time: "10:30",
    status: "scheduled",
    reason: "Migraine follow-up",
    notes: "Review effectiveness of new medication"
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Michael Chen",
    date: "2023-05-25",
    time: "13:00",
    status: "scheduled",
    reason: "Diabetes Management",
    notes: "Bring glucose monitoring records"
  },
  {
    id: "A004",
    patientId: "P005",
    patientName: "Robert Garcia",
    date: "2023-05-25",
    time: "15:30",
    status: "scheduled",
    reason: "Joint pain",
    notes: "Left knee pain worsening"
  },
  {
    id: "A005",
    patientId: "P008",
    patientName: "Jennifer Martinez",
    date: "2023-05-26",
    time: "09:00",
    status: "scheduled",
    reason: "Medication review",
    notes: ""
  },
  {
    id: "A006",
    patientId: "P006",
    patientName: "Lisa Brown",
    date: "2023-05-26",
    time: "11:00",
    status: "scheduled",
    reason: "Blood test results",
    notes: "Review thyroid function test results"
  },
  {
    id: "A007",
    patientId: "P004",
    patientName: "Sarah Wilson",
    date: "2023-05-26",
    time: "14:00",
    status: "scheduled",
    reason: "Anxiety management",
    notes: "Discuss therapy options"
  },
  {
    id: "A008",
    patientId: "P007",
    patientName: "David Kim",
    date: "2023-05-27",
    time: "10:00",
    status: "scheduled",
    reason: "First appointment",
    notes: "New patient consultation"
  },
  {
    id: "A009",
    patientId: "P001",
    patientName: "John Smith",
    date: "2023-05-20",
    time: "09:00",
    status: "completed",
    reason: "Blood pressure check",
    notes: "BP elevated, increased dosage"
  },
  {
    id: "A010",
    patientId: "P002",
    patientName: "Emily Johnson",
    date: "2023-05-12",
    time: "10:30",
    status: "completed",
    reason: "Headache consultation",
    notes: "Prescribed new medication"
  },
  {
    id: "A011",
    patientId: "P003",
    patientName: "Michael Chen",
    date: "2023-05-01",
    time: "13:00",
    status: "completed",
    reason: "Diabetes check",
    notes: "A1C improved"
  },
  {
    id: "A012",
    patientId: "P005",
    patientName: "Robert Garcia",
    date: "2023-04-10",
    time: "15:30",
    status: "completed",
    reason: "Arthritis follow-up",
    notes: "Suggested physical therapy"
  }
];

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export const getAppointmentById = (id: string): Appointment | undefined => {
  return appointments.find(appointment => appointment.id === id);
};

export const getAppointmentsByPatientId = (patientId: string): Appointment[] => {
  return appointments.filter(appointment => appointment.patientId === patientId);
};

export const getAppointmentsByDate = (date: string): Appointment[] => {
  return appointments.filter(appointment => appointment.date === date);
};

export const getTodaysAppointments = (): Appointment[] => {
  const today = new Date().toISOString().slice(0, 10);
  return getAppointmentsByDate(today);
};

export const getUpcomingAppointments = (): Appointment[] => {
  const today = new Date().toISOString().slice(0, 10);
  return appointments.filter(appointment => 
    appointment.date >= today && appointment.status === 'scheduled'
  ).sort((a, b) => {
    // Sort by date and then by time
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return a.time.localeCompare(b.time);
  });
};

export const getPatientsWithUpcomingAppointments = (): Patient[] => {
  const upcomingAppointmentsPatientIds = getUpcomingAppointments()
    .map(appointment => appointment.patientId);
  
  // Remove duplicates
  const uniquePatientIds = [...new Set(upcomingAppointmentsPatientIds)];
  
  return patients.filter(patient => uniquePatientIds.includes(patient.id));
};
