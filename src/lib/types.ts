

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  birthMonth: number;
  birthYear: number;
  number: number;
  position: string;
  avatarId: string;
  avatarUrl?: string;
  teamId: string;
  contact: {
    email: string;
    phone: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
    email?: string;
  };
  medicalInfo: {
    allergies: string;
    conditions: string;
  };
  skillAssessments: {
    shooting: number;
    dribbling: number;
    passing: number;
    defense: number;
  };
};

export type TeamEvent = {
  id: string;
  type: "Practice" | "Game" | "Event";
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description?: string;
  teamId: string;
};

export type AttendanceStatus = "Present" | "Absent" | "Pending" | "Excused";

export type PlayerAttendance = {
    indicated: AttendanceStatus;
    actual: AttendanceStatus;
}

export type AttendanceRecord = {
  eventId: string;
  playerAttendances: Record<string, PlayerAttendance>;
};

export type Conversation = {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  timestamp: string;
  body: string;
  replies?: Conversation[];
  teamId: string;
};

