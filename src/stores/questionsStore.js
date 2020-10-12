import { writable } from "svelte/store";

export const questionsStore = writable([
  {
    id: "1",
    text: "Who am I?",
    description:
      "Honestly describe who you are at this moment in time. Perhaps you select a certain aspect of who you are to dive deep, but the point is to make an objective assessment of who you are today.",
    categories: ["daily"],
  },
  {
    id: "2",
    text: "Who do I want to be?",
    description:
      "Who do you want to be at some point in the future. You can vary the time span, or focus on different areas of your life, but be specific.",
    categories: ["daily"],
  },
  {
    id: "3",
    text: "What am I avoiding?",
    description: "Situations that cause pain ",
    categories: ["daily"],
  },
  {
    id: "4",
    text: "What scares me?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "5",
    text: "What am I grateful for?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "6",
    text: "How can I make a difference in someone's life today?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "7",
    text: "How can I be generous today?",
    description:
      "Whether it's money, time, or attention. Give and give generously.",
    categories: ["daily"],
  },
  {
    id: "8",
    text:
      "What's broken around me that needs to be fixed or redeemed for good?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "9",
    text: "Where am I being stubborn or arrogant?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "10",
    text: "What don't I understand about myself?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "11",
    text: "What's important to the people closest to me right now?",
    description:
      "Being aware of the needs an priorities of those most important in our lives helps make us better attuned to now we can serve those around us, and to ensure we're contributing to the health and well-being of our most intimate circle.",
    categories: ["daily"],
  },
  {
    id: "12",
    text: "What do I regret?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "13",
    text: "How am I wasting time?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "14",
    text: "How can I challenge/scare myself?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "15",
    text: "What's important that needs attention?",
    description:
      "Maybe this thing isn't urgent right now, but find something that is truly important and act on it today.",
    categories: ["daily"],
  },
  {
    id: "16",
    text: "What's in my life that I can get rid of?",
    description:
      "Be it a habit, attitude, object or obsession, identify something to leave behind.",
    categories: ["daily"],
  },
  {
    id: "17",
    text: 'What is something I can do for "future me" today?',
    description:
      "Make a doctor's appointment, schedule time to read, or exercise - do something that will help make your life easier for you in the coming days, weeks, or years.",
    categories: ["daily"],
  },
  {
    id: "18",
    text: "What upcoming events or important dates do I need to prepare for?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "19",
    text: "What thing (large or small) needs my attention today?",
    description:
      "The todo list is endless, but focus on what needs to be done in the next 24 hours.",
    categories: ["daily"],
  },
  {
    id: "20",
    text: "How can I affect change in injustice in the world?",
    description:
      "Even if its just in a small way - how can I help to right a wrong in the world today?",
    categories: ["daily"],
  },
  {
    id: "21",
    text: "Who in my life do I need to follow up with?",
    description: "test",
    categories: ["daily"],
  },
  {
    id: "22",
    text: "In what area of my life am I unsatisfied?",
    description:
      "Never cease to push forward. Identify an area of in life that needs changing or improving.",
    categories: ["daily", "weekly", "monthly", "yearly"],
  },
]);
