import Image, { ImageProps } from "next/image";
import React from "react";
import { DropdownToggleProps } from "react-bootstrap/DropdownToggle";

interface Props extends React.RefAttributes<HTMLAnchorElement> {
  src: string;
  alt: string;
}

const ImageDropdownToggle = React.forwardRef<HTMLAnchorElement, Props>(
  ({ src, alt, ...rest }, ref) => {
    return (
      <a href={""} {...rest} ref={ref}>
        <Image
          src={src}
          alt={alt}
          width={32}
          height={32}
          className="rounded-circle"
        />
      </a>
    );
  }
);

export default ImageDropdownToggle;
