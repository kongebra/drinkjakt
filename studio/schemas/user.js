import { FaUser } from "react-icons/fa";

export default {
  name: "user",
  title: "User",
  type: "document",
  icon: FaUser,
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          {
            name: "email", // Error message is "Does not match email-pattern"
            invert: false, // Boolean to allow any value that does NOT match pattern
          }
        ),
      codegen: { required: true },
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
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
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
