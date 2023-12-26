interface taskArr {
  name: string;
  index: number;
}

export const tasks: taskArr[] = [
  { name: "Ad Marathon", index: 1 },
  { name: "Endless Scroll", index: 2 },
  { name: "Type Grind", index: 3 },
  { name: "Point And Click", index: 4 },
  { name: "Captcha Repeater", index: 5 },
  { name: "Endless Loading", index: 6 },
];

export const getTaskRoute = (task: string): string =>
  `/${task.toLowerCase().replace(/\s+/g, "-")}`;

export const getTasksCount = (): number => tasks.length;
