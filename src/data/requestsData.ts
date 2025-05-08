export interface Request {
  id: number;
  originalId: string;
  title: string;
  description: string;
  location: string;
  time: string;
  priority: number;
  assigned: boolean;
  assignedToMe?: boolean;
}

// Fallback data in case the API is unavailable
export const fallbackRequests: Request[] = [
  {
    id: 1,
    originalId: "1",
    title: "Spill near stairs",
    description: "There is a spill near the stairs creating a hazard.",
    location: "LEVEL 1 - S112",
    time: "7:16 PM",
    priority: 0,
    assigned: false,
    assignedToMe: false
  },
  {
    id: 2,
    originalId: "2",
    title: "Trash overflowing",
    description: "Trash can is overflowing and needs immediate attention.",
    location: "CONC B - CONCESSIONS",
    time: "7:02 PM",
    priority: 2,
    assigned: false,
    assignedToMe: false
  },
  {
    id: 3,
    originalId: "3",
    title: "Broken Seat",
    description: "Seat is broken and needs repair.",
    location: "LEVEL 2 - S236",
    time: "6:51 PM",
    priority: 1,
    assigned: false,
    assignedToMe: false
  },
  {
    id: 4,
    originalId: "4",
    title: "Spill near stairs",
    description: "There is a spill near the stairs creating a hazard.",
    location: "LEVEL 1 - S112",
    time: "7:16 PM",
    priority: 0,
    assigned: true,
    assignedToMe: true
  },
  {
    id: 5,
    originalId: "5",
    title: "Food on floor",
    description: "Food spilled on floor needs to be cleaned up.",
    location: "LEVEL 3 - S311",
    time: "6:42 PM",
    priority: 2,
    assigned: true,
    assignedToMe: false
  },
  {
    id: 6,
    originalId: "6",
    title: "Broken Seat",
    description: "Seat is broken and needs repair.",
    location: "LEVEL 2 - S236",
    time: "6:51 PM",
    priority: 1,
    assigned: true,
    assignedToMe: false
  }
]; 