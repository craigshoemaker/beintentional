import { writable } from "svelte/store";

export const tasksStore = {
  tasks: writable({
    daily: `
- Read the most recent journal entry
- Review week's schedule
- List the top 3 things that need to get done today
  `,

    weekly: `
- Read the week's journal entries
- Review the calendar for this and next week
- Review the calendar for a monthly overview 
- Note important takeaways from the last week
- Note the most important items for the coming week
- List the top 3 things that need to get done week
`,
    monthly: `
 - Note important takeaways from the last month
 - Note the most important items for the coming month
- List the top 3 things that need to get done month
  `,
    yearly: `
 - Note important takeaways from the last year
 - Note the most important items for the coming year
  `,
  }),
};
