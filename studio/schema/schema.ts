import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Front Page
 *
 *
 */
export interface Frontpage extends SanityDocument {
  _type: "frontpage";

  /**
   * Featured Recipes — `array`
   *
   *
   */
  featured_recipes?: Array<SanityKeyedReference<Recipe>>;
}

/**
 * Recipe
 *
 *
 */
export interface Recipe extends SanityDocument {
  _type: "recipe";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Ingredients — `array`
   *
   *
   */
  ingredients?: Array<SanityKeyed<Ingredient>>;
}

/**
 * Rating
 *
 *
 */
export interface Rating extends SanityDocument {
  _type: "rating";

  /**
   * Recipe — `reference`
   *
   *
   */
  recipe?: SanityReference<Recipe>;

  /**
   * User — `reference`
   *
   *
   */
  user?: SanityReference<User>;

  /**
   * Rating — `number`
   *
   *
   */
  rating?: number;
}

/**
 * User
 *
 *
 */
export interface User extends SanityDocument {
  _type: "user";

  /**
   * First Name — `string`
   *
   *
   */
  firstName?: string;

  /**
   * Last Name — `string`
   *
   *
   */
  lastName?: string;

  /**
   * Email — `string`
   *
   *
   */
  email?: string;

  /**
   * Nickname — `string`
   *
   *
   */
  nickname?: string;

  /**
   * Picture — `string`
   *
   *
   */
  picture?: string;

  /**
   * Auth0 Sub — `string`
   *
   *
   */
  auth0_sub?: string;

  /**
   * Favorites — `array`
   *
   *
   */
  favorites?: Array<SanityKeyedReference<Recipe>>;
}

export type Ingredient = {
  _type: "ingredient";
  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Amount — `number`
   *
   *
   */
  amount?: number;

  /**
   * Unit — `string`
   *
   *
   */
  unit?: string;
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type Documents = Frontpage | Recipe | Rating | User;
