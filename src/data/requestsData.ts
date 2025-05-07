export interface Request {
  id: number;
  description: string;
  location: string;
  time: string;
  priority: number;
  assigned: boolean;
  assignedToMe?: boolean;
}

export const requests: Request[] = [
  {
    id: 1,
    description: "Spill near stairs",
    location: "LEVEL 1 - S112",
    time: "7:16 PM",
    priority: 0,
    assigned: false,
    assignedToMe: false
  },
  {
    id: 2,
    description: "Trash overflowing",
    location: "CONC B - CONCESSIONS",
    time: "7:02 PM",
    priority: 2,
    assigned: false,
    assignedToMe: false
  },
  {
    id: 3,
    description: "Broken Seat",
    location: "LEVEL 2 - S236",
    time: "6:51 PM",
    priority: 1,
    assigned: false,
    assignedToMe: false
  },
  {
    id: 4,
    description: "Spill near stairs",
    location: "LEVEL 1 - S112",
    time: "7:16 PM",
    priority: 0,
    assigned: true,
    assignedToMe: true
  },
  {
    id: 8,
    description: "Food on floor",
    location: "LEVEL 3 - S311",
    time: "6:42 PM",
    priority: 2,
    assigned: true,
    assignedToMe: true
  },
  {
    id: 5,
    description: "Trash overflowing",
    location: "CONC B - CONCESSIONS",
    time: "7:02 PM",
    priority: 2,
    assigned: true,
    assignedToMe: false
  },
  {
    id: 6,
    description: "Broken Seat",
    location: "LEVEL 2 - S236",
    time: "6:51 PM",
    priority: 1,
    assigned: true,
    assignedToMe: false
  },
  {
    id: 7,
    description: "Food on floor",
    location: "LEVEL 3 - S311",
    time: "6:42 PM",
    priority: 2,
    assigned: true,
    assignedToMe: false
  }
]; 