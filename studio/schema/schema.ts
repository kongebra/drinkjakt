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
  featured_recipes: Array<SanityKeyedReference<Recipe>>;
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
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Image — `image`
   *
   *
   */
  image: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Tags — `array`
   *
   *
   */
  tags?: Array<SanityKeyedReference<Tag>>;

  /**
   * Difficulty — `string`
   *
   *
   */
  difficulty: "beginner" | "intermediate" | "advanced";

  /**
   * Glass — `reference`
   *
   *
   */
  glass?: SanityReference<Glass>;

  /**
   * Ice — `reference`
   *
   *
   */
  ice?: SanityReference<Ice>;

  /**
   * Ingredients — `array`
   *
   *
   */
  ingredients: Array<
    SanityKeyed<{
      _type: "ingredients";
      /**
       * Ingredient — `reference`
       *
       *
       */
      ingredient: SanityReference<Ingredient>;

      /**
       * Amount — `number`
       *
       *
       */
      amount: number;

      /**
       * Unit — `string`
       *
       *
       */
      unit: string;
    }>
  >;

  /**
   * Instructions — `blockContent`
   *
   *
   */
  instructions?: BlockContent;
}

/**
 * Ingredient
 *
 *
 */
export interface Ingredient extends SanityDocument {
  _type: "ingredient";

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

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
  recipe: SanityReference<Recipe>;

  /**
   * User — `reference`
   *
   *
   */
  user: SanityReference<User>;

  /**
   * Rating — `number`
   *
   *
   */
  rating: number;
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
  firstName: string;

  /**
   * Last Name — `string`
   *
   *
   */
  lastName: string;

  /**
   * Email — `string`
   *
   *
   */
  email: string;

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
  auth0_sub: string;

  /**
   * Favorites — `array`
   *
   *
   */
  favorites?: Array<SanityKeyedReference<Recipe>>;
}

/**
 * Glass
 *
 *
 */
export interface Glass extends SanityDocument {
  _type: "glass";

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
   * Description — `string`
   *
   *
   */
  description?: string;

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
}

/**
 * Ice
 *
 *
 */
export interface Ice extends SanityDocument {
  _type: "ice";

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
   * Description — `string`
   *
   *
   */
  description?: string;

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
}

/**
 * Tags
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: "tag";

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
}

/**
 * Route
 *
 *
 */
export interface Route extends SanityDocument {
  _type: "route";

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
   * Path — `string`
   *
   *
   */
  path?: string;
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type Documents =
  | Frontpage
  | Recipe
  | Ingredient
  | Rating
  | User
  | Glass
  | Ice
  | Tag
  | Route;
