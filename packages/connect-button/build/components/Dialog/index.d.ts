export * from "./DialogHeader";
export * from "./DialogContent";
export * from "./DialogHelpers";
export * from "./LoadingDialog";
export * from "./DialogErrorMessage";
import { DialogProps } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, ReactNode } from "react";
export declare const CustomDialog: import("@emotion/styled").StyledComponent<DialogProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
type DewiDialogProps = {
    children: ReactNode;
    transitionProps?: TransitionProps;
} & DialogProps;
export declare const Dialog: FC<DewiDialogProps>;
//# sourceMappingURL=index.d.ts.map