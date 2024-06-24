import {
  ButtonBaseProps,
  SvgIconTypeMap,
  Typography,
  styled,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { DialogContent } from "../../../components/Dialog";
import { useTranslation } from "react-i18next";
import {
  ChangeWallet,
  CopyAddress,
  DisconnectWallet,
  Open,
} from "../../../assets/Icons";
import { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface ConnectedContentButton {
  changeWallet: () => void;
  handleClose: () => void;
  disconnect: () => Promise<void>;
  publicAddress: string | undefined;
  magicLogin: boolean;
}

export const ConnectedContent = ({
  changeWallet,
  handleClose,
  disconnect,
  publicAddress = "",
  magicLogin = false,
}: ConnectedContentButton) => {
  const { t } = useTranslation();
  const { wallet } = useWallet();

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(publicAddress);
    handleClose();
  };

  const handleDisconnect = async () => {
    await disconnect();
    handleClose();
  };

  const openTiplinkWallet = useCallback(() => {
    window.open("https://tiplink.io/", "_blank");
  }, []);

  return (
    <DialogContent id="wallet-menu" sx={{ gap: "0.5rem" }}>
      {wallet?.adapter?.name?.toLowerCase()?.includes("tiplink") && (
        <ConnectedListItem
          onClick={openTiplinkWallet}
          Icon={Open}
          text={t("connectWallet.connected.openWallet")}
        />
      )}
      <ConnectedListItem
        onClick={handleCopyAddress}
        Icon={CopyAddress}
        text={t("connectWallet.connected.copyAddress")}
      />
      {!magicLogin && (
        <ConnectedListItem
          onClick={changeWallet}
          Icon={ChangeWallet}
          text={t("connectWallet.connected.changeWallet")}
        />
      )}
      <ConnectedListItem
        onClick={handleDisconnect}
        Icon={DisconnectWallet}
        text={t("connectWallet.connected.disconnect")}
      />
    </DialogContent>
  );
};

const ListItemButton = styled("button")({
  display: "flex",
  background: "transparent",
  gap: "1rem",
  justifyContent: "flex-start",
  padding: "0.5rem",
  width: "100%",
  margin: 0,
  border: "1px solid #2C2E33",
  alignItems: "center",
  color: "#F8F9FA",
  borderRadius: "0.75rem",
  fontSize: "1.125rem",
  fontWeight: 400,
  "&:hover": {
    background: "#26272c",
  },
});

interface WalletListItemProps {
  onClick: ButtonBaseProps["onClick"];
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  text: string;
}

const ConnectedListItem = ({ onClick, Icon, text }: WalletListItemProps) => {
  return (
    <ListItemButton onClick={onClick}>
      <Icon />
      <Typography fontSize="1rem">{text}</Typography>
    </ListItemButton>
  );
};
