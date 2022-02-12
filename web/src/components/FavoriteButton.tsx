import React, { useRef } from "react";
import { FaRegHeart, FaHeart, FaHeartBroken } from "react-icons/fa";
import { useHover } from "usehooks-ts";

export interface FavoriteButtonProps {
  active?: boolean;
  size?: string | number;
  color?: string;
  hoverColor?: string;

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  active,
  size = 32,
  color = "white",
  hoverColor = "red",
  onClick,
}) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  const renderIcon = () => {
    if (active) {
      if (isHover) {
        return <FaHeartBroken size={size} color={hoverColor} />;
      }

      return <FaHeart size={size} color={hoverColor} />;
    }

    if (isHover) {
      return <FaRegHeart size={size} color={hoverColor} />;
    }

    return <FaRegHeart size={size} color={color} />;
  };

  return (
    <button
      ref={hoverRef}
      type="button"
      className="btn m-0 p-0"
      onClick={onClick}
    >
      {renderIcon()}
    </button>
  );
};

export default FavoriteButton;
