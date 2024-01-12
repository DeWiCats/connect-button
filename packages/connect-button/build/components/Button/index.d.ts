/// <reference types="react" />
import { ButtonProps as MaterialButtonProps } from "@mui/material";
interface ButtonProps extends Omit<MaterialButtonProps, "size"> {
    size?: "small" | "medium" | "large" | "extraLarge";
    disabled?: boolean;
}
declare const Button: ({ size, disabled, children, variant, ...rest }: ButtonProps & MaterialButtonProps) => import("react").JSX.Element;
export default Button;
//# sourceMappingURL=index.d.ts.map