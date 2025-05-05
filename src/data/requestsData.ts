export interface Request {
  id: number;
  name: string;
  isAnonymous: boolean;
  description: string;
  location: string;
  time: string;
  hasTicket?: boolean;
  hasBillsIcon?: boolean;
}

export const requests: Request[] = [
  {
    id: 1,
    name: "Anonymous",
    isAnonymous: true,
    description: "Spilled drink near stairs",
    location: "L3-310",
    time: "7:16 PM",
  },
  {
    id: 2,
    name: "Mark R.",
    isAnonymous: false,
    description: "Broken seat",
    location: "L1-112",
    time: "7:02 PM",
    hasTicket: true,
  },
  {
    id: 3,
    name: "Lisa M.",
    isAnonymous: false,
    description: "No paper towels in restroom",
    location: "CL-223",
    time: "7:00 PM",
    hasTicket: true,
  },
  {
    id: 4,
    name: "Anonymous",
    isAnonymous: true,
    description: "Food on floor",
    location: "L1-130",
    time: "6:53 PM",
  },
  {
    id: 5,
    name: "John P.",
    isAnonymous: false,
    description: "Trash overflowing",
    location: "CC-110",
    time: "6:42 PM",
    hasBillsIcon: true,
  },
  {
    id: 6,
    name: "Anonymous",
    isAnonymous: true,
    description: "Spilled drink",
    location: "L3-353",
    time: "6:53 PM",
  },
]; 