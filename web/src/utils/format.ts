import { capitalizeString } from "./string";

export const formatDifficulty = (
  difficulty: "beginner" | "intermediate" | "advanced",
  capitalize: boolean = false
): string => {
  if (capitalize) {
    return capitalizeString(formatDifficulty(difficulty));
  }

  switch (difficulty) {
    case "beginner":
      return "enkel";
    case "intermediate":
      return "medium";
    case "advanced":
      return "vanskelig";
    default:
      return "ukjent";
  }
};
