import { Frontpage } from ".";
import { Recipe, Rating } from "./schema";

export interface RecipeWithRatings extends Recipe {
  ratings?: Array<Rating>;
}

export interface FrontpageWithRecipes extends Frontpage {
  recipes?: Array<RecipeWithRatings>;
}
