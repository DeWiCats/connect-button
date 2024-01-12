/// <reference types="react" />
import { DialogProps } from "@mui/material";
type ConnectDialogProps = {
    handleClose: () => void;
} & DialogProps;
declare const ConnectDialog: ({ handleClose, ...rest }: ConnectDialogProps) => import("react").JSX.Element;
export default ConnectDialog;
//# sourceMappingURL=index.d.ts.map