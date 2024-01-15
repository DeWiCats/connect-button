export * from "./DialogHeader";
export * from "./DialogContent";
export * from "./DialogHelpers";
export * from "./LoadingDialog";
export * from "./DialogErrorMessage";

import {
  DialogProps,
  Slide,
  Dialog as MaterialDialog,
  styled,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ReactNode, forwardRef } from "react";

export const CustomDialog = styled(MaterialDialog)({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(5px)",
    background: "hsl(220, 9%, 7%)",
  },
  "& .MuiDialog-container": {
    alignItems: "center",
  },
  "& .MuiDialog-paper": {
    background: "hsl(225, 7%, 11%)",
    minWidth: "16rem",
    padding: "1.375rem",
    gap: "1.375rem",
    borderRadius: "1.3125rem",
    minHeight: "var(--dialog-paper-height, auto)",
    transition: "min-height 0.4s ease-in-out",
    boxSizing: "content-box",
    overflowY: "unset",
  },
  "& .MuiDialogContent-root": {
    padding: 0,
    "& .MuiCollapse-root": {
      "& .MuiList-root": {
        background: "hsl(230, 8%, 16%)",
      },
    },
    "& .MuiList-root": {
      padding: 0,
    },
  },
  "@media (max-width: 640px)": {
    "& .MuiDialog-container": {
      alignItems: "flex-end",
    },
    "& .MuiDialog-paper": {
      width: "100%",
      margin: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type DewiDialogProps = {
  children: ReactNode;
  transitionProps?: TransitionProps;
} & DialogProps;

export const Dialog = ({ transitionProps, ...props }: DewiDialogProps) => {
  return (
    <CustomDialog
      {...props}
      TransitionComponent={Transition}
      TransitionProps={{
        timeout: 500,
        ...transitionProps,
      }}
    >
      {props.children}
    </CustomDialog>
  );
};
