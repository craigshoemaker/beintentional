import { writable } from "svelte/store";

export const tasksStore = writable({
  daily: `
## Daily
- Read the most recent journal entry
- Review weekly schedule
  `,

  weekly: `
 - Read the week's journal entries
 - Review the calendar for this and next week
 - Review the calendar for a monthly overview 
 - Write down the most important takeaways from the last week.
 - Write down the items most important for the coming week.
`,
  monthly: `**monthly**`,
  yearly: `**yearly**`,
});
