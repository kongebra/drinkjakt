import React from "react";

import { IconType } from "react-icons/lib";

import clsx from "clsx";
import Image from "next/image";

export interface AvaratProps {
  label?: string;
  icon?: IconType;
  image?: string;
  size?: "sm" | "md" | "lg";
  shape?: "square" | "circle";
  style?: React.CSSProperties;
  className?: string;
  imageAlt?: string;
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  indicator?: "offline" | "online" | "idle" | "notification";
}

const Avatar = React.forwardRef<HTMLDivElement, AvaratProps>(
  (
    {
      className,
      style,

      onClick,

      label,
      icon,

      size = "md",
      shape = "circle",

      image,
      imageAlt = "Avatar",
      onImageError,

      indicator,
    },
    ref
  ) => {
    const renderContent = () => {
      if (label) {
        return <span>{label}</span>;
      }

      if (icon) {
        const Icon = icon;

        return (
          <Icon
            className={clsx("", {
              "text-lg": size === "sm",
              "text-xl": size === "md",
              "text-2xl": size === "lg",
            })}
          />
        );
      }

      if (image) {
        return (
          <Image
            className={clsx({
              "rounded-full": shape === "circle",
              "rounded-md": shape === "square",
            })}
            src={image}
            alt={imageAlt}
            width={256}
            height={256}
            onError={(e) => {
              if (onImageError) {
                onImageError(e);
              }
            }}
          />
        );
      }

      return null;
    };

    const renderIndicator = () => {
      if (indicator) {
        return (
          <span
            className={clsx(
              "border-2 rounded-full border-white absolute bottom-0 right-0 w-3 h-3",
              {
                "bg-green-500": indicator === "online",
                "bg-red-500": indicator === "offline",
                "bg-amber-500": indicator === "idle",
                "bg-purple-500": indicator === "notification",
              }
            )}
          />
        );
      }

      return null;
    };

    const getTextSize = () => {
      switch (size) {
        case "md":
          return "text-base";
        default:
          return `text-${size}`;
      }
    };

    const divClassName = clsx(
      "relative bg-slate-300 inline-flex justify-center items-center",
      getTextSize(),
      {
        "rounded-full": shape === "circle",
        "rounded-md": shape === "square",

        "w-8 h-8": size === "sm",
        "w-10 h-10": size === "md",
        "w-12 h-12": size === "lg",
        "cursor-pointer": !!onClick,
      },
      className
    );

    const content = renderContent();
    const indicatorContent = renderIndicator();

    return (
      <div ref={ref} className={divClassName} style={style} onClick={onClick}>
        {content}
        {indicatorContent}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
