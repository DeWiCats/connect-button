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
} from "../../../assets/Icons";

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
  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(publicAddress);
    handleClose();
  };

  const handleDisconnect = async () => {
    await disconnect();
    handleClose();
  };

  return (
    <DialogContent id="wallet-menu" sx={{ gap: "0.5rem" }}>
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
