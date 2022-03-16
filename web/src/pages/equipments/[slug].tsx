import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";

import { groq } from "next-sanity";

import { getClient } from "lib/sanity.server";

const EquipmentsPage = () => {
  return <div>EquipmentsPage</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugQuery = groq`*[_type == "equipment" && defined(slug.current)][].slug.current`;
  const paths = await getClient().fetch(allSlugQuery);

  return {
    paths: paths.map((slug: string) => `/equipments/${slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  equipment: any;
}> = async (context) => {
  const slug = context.params?.slug as string;

  const query = groq`*[_type == "equipment" && slug.current == $slug][0] {
        _id,
        name,
        slug,
    }`;

  const equipment = await getClient().fetch<any>(query, { slug });

  if (!equipment) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      equipment,
    },
  };
};

export default EquipmentsPage;
