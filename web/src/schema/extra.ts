import { Frontpage, Glass, Ingredient, Recipe, Rating, Ice } from "./schema";

export interface RecipeWithRatings extends Recipe {
  ratings?: Array<Rating>;
}

export interface FrontpageWithRecipes extends Frontpage {
  recipes?: Array<RecipeDetails>;
}

export interface RecipeDetails
  extends Omit<Recipe, "ice" | "glass" | "ingredients"> {
  ratings?: Array<Rating>;
  ice?: Ice;
  glass?: Glass;
  ingredients?: Array<{
    ingredient?: Ingredient;
    amount: number;
    unit: string;
  }>;
}