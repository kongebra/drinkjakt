import { groq } from "next-sanity";
import {
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
  SanityReference,
} from "sanity-codegen";

export interface FeaturedRecipeDto {
  _id: string;
  name: string;
  slug: string;
  image: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
  ingredientsCount: number;
  ratings: { rating: number }[];
}

export interface FeaturedRecipesQueryResponse {
  featured_recipes: FeaturedRecipeDto[];
}

const featuredRecipesQuery = groq`*[_type == "frontpage"][0] {
    featured_recipes[]-> {
        _id,
        name,
        "slug": slug.current,
        image,
        "ingredientsCount": count(ingredients[]),
        "ratings": *[_type == "rating" && references(^._id)] {
            rating
        }
    }
}`;

export { featuredRecipesQuery };
