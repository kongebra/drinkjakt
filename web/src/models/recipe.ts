import {
  SanityReference,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from "sanity-codegen";

export interface RecipeDto {
  id: string;
  name: string;
  slug: string;

  ingredientsCount: number;
  rating: number;
  ratingCount: number;

  image: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}
