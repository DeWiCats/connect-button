import { DialogActionButton, DialogHeader } from "@components/Dialog";
import { Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Wallet } from "@solana/wallet-adapter-react";
import JazzIcon from "@components/JazzIcon";
import { getPublicAddress } from "@helpers";

type ConnectedHeaderProps = {
  handleClose: () => void;
  publicAddress: string;
};

export const ConnectedHeader = ({
  handleClose,
  publicAddress,
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
          <Close fontSize="small" />
        </DialogActionButton>
      </DialogHeader.Actions>
      <DialogHeader.Title>
        <Typography>{getPublicAddress(publicAddress)}</Typography>
      </DialogHeader.Title>
    </DialogHeader>
  );
};
