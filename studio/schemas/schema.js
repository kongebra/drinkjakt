// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./objects/blockContent";
import ingredient from "./objects/ingredient";

import recipe from "./recipe";
import rating from "./rating";
import user from "./user";
import frontpage from "./frontpage";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // objects
    ingredient,
    blockContent,

    // singeltons
    frontpage,

    // DrinkKart
    recipe,
    rating,
    user,
  ]),
});
