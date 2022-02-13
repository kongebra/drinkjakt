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
  size = 15,
  color = "#CCC",
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

    return <FaHeart size={size} color={isHover ? hoverColor : color} />;
  };

  return (
    <button
      ref={hoverRef}
      type="button"
      className="favorite-btn"
      onClick={onClick}
      title="Favorite recipe"
    >
      {renderIcon()}
      <span className="invisible">Favorite recipe</span>
    </button>
  );
};

export default FavoriteButton;
