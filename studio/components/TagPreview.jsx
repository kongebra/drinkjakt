import React from "react";

const TagPreview = (props) => {
  React.useEffect(() => {
    console.log({ props });
  }, [props]);

  return <div>{JSON.stringy(props)}</div>;
};

export default TagPreview;
