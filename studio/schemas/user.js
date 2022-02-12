import { UserIcon } from "@sanity/icons";

export default {
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: "email", // Error message is "Does not match email-pattern"
            invert: false, // Boolean to allow any value that does NOT match pattern
          }
        ),
    },
    {
      name: "nickname",
      title: "Nickname",
      type: "string",
    },
    {
      name: "picture",
      title: "Picture",
      type: "string",
    },
    {
      name: "auth0_sub",
      title: "Auth0 Sub",
      type: "string",
      readOnly: true,
    },

    {
      name: "favorites",
      title: "Favorites",
      type: "array",
      of: [{ type: "reference", to: [{ type: "recipe" }] }],
    },
  ],
  preview: {
    select: { firstName: "firstName", lastName: "lastName", email: "email" },
    prepare(selection) {
      const { firstName, lastName, email } = selection;

      return {
        title: `${firstName} ${lastName}`,
        subtitle: email,
      };
    },
  },
};
