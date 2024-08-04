import { puzzle as puzzle1 } from "~/puzzles/day1";
import { puzzle as puzzle2 } from "~/puzzles/day2";

export default defineEventHandler(async (event) => {
  const { day } = event.context.params;
  switch (day) {
    case "1":
      return puzzle1;
    case "2":
      return puzzle2;
    default:
      return `Puzzle Input for day ${day} is missing..`;
  }
  // return day;
  // .replaceAll("n", "\n\n");
});
