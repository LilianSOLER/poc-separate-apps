interface Office {
  id: string;
  town: string;
}

interface Certification {
  id: string;
  name: string;
}

interface Position {
  userId: number;
  startDate: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
  managerId: number;
  tribeId: string;
  directorsIds: number[];
}

interface Tribe {
  id: string;
  name: string;
  leaderId: number;
}

interface User {
  id: number;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  position: string;
  birthDate: string;
  entryDate: string;
  phone1: string;
  phone2: string;
  phone3: string;
  managerId: string;
  consultantsId: number[];
  tutorId: string;
  isHR: boolean;
  tutoredId: number[];
  technologies: string[];
  diet: string;
  shirtSize: string;
  yearsOfExperience: number;
  hrDriveLink: string;
  highestDiplomaName: string;
  highestDiplomaLink: string;
  office: Office;
  certifications: Certification[];
  positions: Position[];
  teamId: string;
  team: Team;
  managedTeamsIds: string[];
  directedTeamsIds: string[];
  tribeId: string;
  tribe: Tribe;
  isDirector: boolean;
}

export { User, Office, Certification, Position, Team, Tribe };
