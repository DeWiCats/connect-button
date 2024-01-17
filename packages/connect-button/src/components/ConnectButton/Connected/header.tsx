import { DialogActionButton, DialogHeader } from "../../../components/Dialog";
import { Typography } from "@mui/material";
import { getPublicAddress } from "../../../utils/helpers";
import JazzIcon from "../../JazzIcon";
import { Close } from "../../../assets/Icons";

type ConnectedHeaderProps = {
  handleClose: () => void;
  publicAddress: string | undefined;
};

export const ConnectedHeader = ({
  handleClose,
  publicAddress = "",
}: ConnectedHeaderProps) => {
  return (
    <DialogHeader>
      <DialogHeader.Actions>
        <JazzIcon
          className="center"
          publicAddress={publicAddress}
          diameter={70}
        />
        <DialogActionButton className="end" onClick={handleClose}>
          <Close />
        </DialogActionButton>
      </DialogHeader.Actions>
      <DialogHeader.Title>
        <Typography>{getPublicAddress(publicAddress)}</Typography>
      </DialogHeader.Title>
    </DialogHeader>
  );
};
