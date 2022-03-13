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
      validation: (Rule) => Rule.required(),
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
