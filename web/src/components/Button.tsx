import React from "react";
import clsx from "clsx";

export type ButtonColor =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "secondary";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  outline?: boolean;
  pill?: boolean;
  fullWidth?: boolean;
}

const buttonColor: Record<ButtonColor, string> = {
  primary:
    "bg-sky-500 hover:bg-sky-800 focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 text-white",
  secondary:
    "bg-slate-500 hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 text-white",
  success:
    "bg-green-500 hover:bg-green-800 focus:ring-2 focus:ring-green-500 rocus: ring-opacity-50 text-white",
  danger:
    "bg-rose-500 hover:bg-rose-800 focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 text-white",
  warning:
    "bg-yellow-500 hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-500 rocus: ring-opacity-50 text-white",
};

const outlineButtonColor: Record<ButtonColor, string> = {
  primary:
    "bg-transparent border border-sky-500 hover:bg-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 text-sky-500 hover:text-white",
  secondary:
    "bg-transparent border border-slate-500 hover:bg-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 text-slate-500 hover:text-white",
  success:
    "bg-transparent border border-green-500 hover:bg-green-500 focus:ring-2 focus:ring-green-500 rocus: ring-opacity-50 text-green-500 hover:text-white",
  danger:
    "bg-transparent border border-rose-500 hover:bg-rose-500 focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 text-rose-500 hover:text-white",
  warning:
    "bg-transparent border border-yellow-500 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 rocus: ring-opacity-50 text-yellow-500 hover:text-white",
};

const buttonSize: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-8 py-3 text-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,

      type = "button",
      disabled,

      color = "primary",
      size = "md",
      outline,
      pill,
      fullWidth,

      className,

      ...rest
    }: ButtonProps,
    ref
  ) => {
    const baseStyle =
      "flex justify-center items-center rounded focus:outline-none transition ease-in-out duration-300";

    const buttonClassName = clsx(
      baseStyle,
      buttonSize[size],
      outline ? outlineButtonColor[color] : buttonColor[color],
      {
        "opacity-50 cursor-not-allowed": disabled,
        "rounded-full": pill,
        "w-full": fullWidth,
      },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={buttonClassName}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
