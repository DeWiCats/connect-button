"use client";

import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
  styled,
} from "@mui/material";

const CustomButton = styled(MaterialButton)(() => ({
  textTransform: "none",
  // fontSize: {
  //   small: "0.875rem",
  //   medium: "1rem",
  //   large: "1.125rem",
  //   "extra-large": "1.25rem",
  // }[size || "medium"],
  // padding: {
  //   small: "0 0.75rem",
  //   medium: "0 1rem",
  //   large: "0 1.375rem",
  //   extraLarge: "0 1.375rem",
  // }[size || "medium"],
  color: "hsl(220, 9%, 7%) !important",
  minWidth: "unset",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  background: "hsl(210, 17%, 95%) !important",
  border: "1px solid hsl(210, 12%, 83%)",
  borderRadius: "62rem",
  "&:disabled": {
    opacity: 0.6,
  },
  "&:hover": {
    backgroundColor: "hsl(216, 14%, 93%) !important",
    borderColor: "var(--dewi_colors_gray_5)",
    color: "hsl(214, 9%, 15%)",
  },
  "&:active": {
    backgroundColor: "hsl(210, 12%, 83%) !important",
    color: "hsl(220, 9%, 7%) !important",
  },
  "&:focus": {
    color: "hsl(214, 9%, 15%) !important",
    outline: "4px solid hsl(214, 61%, 53%)",
  },
  // [variant === "outlined" && "&"]: {
  //   backgroundColor: "hsl(230, 8%, 16%) !important",
  //   color: "var(--dewi_colors_gray_3) !important",
  //   border: "1px solid hsl(223, 6%, 23%)",

  //   "&:hover": {
  //     backgroundColor: "hsl(225, 7%, 11%) !important",
  //     borderColor: "var(--dewi_colors_dark_5)",
  //     color: "hsl(214, 9%, 15%)",
  //   },
  //   "&:active": {
  //     backgroundColor: "hsl(223, 6%, 23%) !important",
  //   },
  //   "&:focus": {
  //     color: "var(--dewi_colors_gray_3) !important",
  //     outline: "4px solid hsl(214, 61%, 53%)",
  //   },
  // },
}));

interface ButtonProps extends Omit<MaterialButtonProps, "size"> {
  size?: "small" | "medium" | "large" | "extraLarge";
  disabled?: boolean;
}

const Button = ({
  size = "medium",
  disabled = false,
  children,
  variant,
  ...rest
}: ButtonProps & MaterialButtonProps) => {
  return (
    <CustomButton
      variant={variant}
      size={size as any}
      disabled={disabled}
      {...rest}
      disableRipple
    >
      {children}
    </CustomButton>
  );
};

export default Button;
