import { writable } from "svelte/store";

export const questionsStore = writable([
  {
    id: "1",
    text: "Who am I?",
    description:
      "Honestly describe who you are at this moment in time. Perhaps you select a certain aspect of who you are to dive deep, but the point is to make an objective assessment of who you are today.",
  },
  {
    id: "2",
    text: "Who do I want to be?",
    description:
      "Who do you want to be at some point in the future. You can vary the time span, or focus on different areas of your life, but be specific.",
  },
  { id: "3", text: "What am I avoiding?", description: "test" },
  { id: "4", text: "What scares me?", description: "test" },
  { id: "5", text: "What am I grateful for?", description: "test" },
  {
    id: "6",
    text: "How can I make a difference in someone's life today?",
    description: "test",
  },
  { id: "7", text: "How can I be generous today?", description: "test" },
  {
    id: "8",
    text:
      "What's broken around me that needs to be fixed or redeemed for good?",
    description: "test",
  },
  {
    id: "9",
    text: "Where am I being stubborn or arrogant?",
    description: "test",
  },
  {
    id: "10",
    text: "What don't I understand about myself?",
    description: "test",
  },
  {
    id: "11",
    text: "What's important to the people closest to me right now?",
    description:
      "Being aware of the needs an priorities of those most important in our lives helps make us better attuned to now we can serve those around us, and to ensure we're contributing to the health and well-being of our most intimate circle.",
  },
  { id: "12", text: "What do I regret?", description: "test" },
  { id: "13", text: "How am I wasting time?", description: "test" },
  {
    id: "14",
    text: "How can I challenge/scare myself?",
    description: "test",
  },
  {
    id: "15",
    text: "What's important that needs attention?",
    description: "test",
  },
  {
    id: "16",
    text: "What's in my life that I can get rid of?",
    description: "test",
  },
  {
    id: "17",
    text: 'What is something I can do for "future me" today?',
    description: "test",
  },
  {
    id: "18",
    text: "What upcoming events or important dates do I need to prepare for?",
    description: "test",
  },
  {
    id: "19",
    text: "What thing (large or small) needs my attention today?",
    description: "test",
  },
  {
    id: "20",
    text: "How can I affect change in injustice in the world?",
    description: "test",
  },
  {
    id: "21",
    text: "Who is in my life that I need to follow up with?",
    description: "test",
  },
]);
