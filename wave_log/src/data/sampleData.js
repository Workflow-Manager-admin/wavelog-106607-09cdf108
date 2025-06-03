//
// Sample/mock data, boards/spots/moods for SurfSync

// PUBLIC_INTERFACE
export const surfSpots = [
  "Sunset Beach",
  "Pipeline",
  "Malibu",
  "Bondi",
  "Mavericks",
  "Snapper Rocks"
];

// PUBLIC_INTERFACE
export const boards = [
  "Shortboard 🏄‍♂️",
  "Longboard 🏄",
  "Fish 🐟",
  "Funboard 🌊",
  "SUP 🏄‍♀️"
];

// PUBLIC_INTERFACE
export const moods = [
  { code: "happy", emoji: "😃", label: "Stoked" },
  { code: "chill", emoji: "😌", label: "Chill" },
  { code: "tired", emoji: "😩", label: "Tired" },
  { code: "excited", emoji: "🤪", label: "Amped" },
  { code: "frustrated", emoji: "😠", label: "Frustrated" }
];

// PUBLIC_INTERFACE
export const weatherIcons = {
  glassy: "💧",
  clean: "🌈",
  choppy: "⚡️",
  blown: "💨",
  stormy: "⛈️"
};

// PUBLIC_INTERFACE
export const sampleSessions = [
  {
    id: "1001",
    date: "2024-06-07",
    spot: "Malibu",
    board: "Shortboard 🏄‍♂️",
    mood: "happy",
    waves: 11,
    swell: "3-4ft",
    wind: "glassy",
    tide: "High",
    notes: "So clean and fun! Crowded but found a rhythm.",
  },
  {
    id: "1002",
    date: "2024-06-06",
    spot: "Pipeline",
    board: "Fish 🐟",
    mood: "excited",
    waves: 7,
    swell: "5-7ft",
    wind: "stormy",
    tide: "Rising",
    notes: "Crazy powerful sets rolling through. Adrenaline up!",
  },
  {
    id: "1003",
    date: "2024-06-05",
    spot: "Bondi",
    board: "Longboard 🏄",
    mood: "chill",
    waves: 6,
    swell: "2-3ft",
    wind: "clean",
    tide: "Low",
    notes: "Fun friendly peelers, easy cruisy day.",
  }
];
