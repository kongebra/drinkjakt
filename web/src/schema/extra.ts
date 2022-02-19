import {
  Frontpage,
  Glass,
  Ingredient,
  Recipe,
  Rating,
  Ice,
  User,
} from "./schema";

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

export interface UserWithFavorites extends Omit<User, "favorites"> {
  favorites?: Array<RecipeDetails>;
}
