import { BlockContentProps } from "@sanity/block-content-to-react";

type SerializerType = BlockContentProps["serializers"];

const ListComponent: React.FC = ({ children }) => {
  return <ul className="list-disc pl-4">{children}</ul>;
};

const ContainerComponent: React.FC = ({ children }) => {
  return <div className="mb-5">{children}</div>;
};

const serializer: SerializerType = {
  types: {},
  list: ListComponent,
  container: ContainerComponent,
};

export default serializer;
