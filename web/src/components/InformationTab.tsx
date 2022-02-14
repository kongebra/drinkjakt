import React from "react";

export interface InformationTabProps {
  text: React.ReactNode;
  buttonText: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  color?: "primary" | string;
}

const InformationTab: React.FC<InformationTabProps> = ({
  text,
  buttonText,

  color = "primary",

  href,
  onClick,
}) => {
  const renderButton = () => {
    if (href) {
      return (
        <a className={`btn btn-outline-light px-5`} href={href}>
          {buttonText}
        </a>
      );
    }

    return (
      <button
        type="button"
        className={`btn btn-outline-light px-5`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div className={`bg-${color} text-white py-3 px-4 rounded-5`}>
      <aside className="d-flex justify-content-between align-items-center">
        <span>{text}</span>
        {renderButton()}
      </aside>
    </div>
  );
};

export default InformationTab;
