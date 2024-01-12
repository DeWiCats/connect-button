"use client";

import { DialogContent } from "src/components/Dialog";
import useSolana from "src/hooks/useSolana";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, Collapse, List, ListItem } from "@mui/material";
import type { WalletName } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { type Wallet } from "@solana/wallet-adapter-react";
import type { FC, SyntheticEvent } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { WalletListItem } from "./listItem";

type WalletsContentProps = {
  featuredWallets?: number;
  handleClose: () => void;
};

export const WalletsContent: FC<WalletsContentProps> = ({
  featuredWallets = 3,
  handleClose,
}) => {
  const { t } = useTranslation();
  const { wallets, select } = useSolana();
  const [expanded, setExpanded] = useState(false);

  const [featured, more] = useMemo(() => {
    const installed: Wallet[] = [];
    const loadable: Wallet[] = [];
    const notDetected: Wallet[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      }
    }
    const orderedWallets = [...installed, ...loadable, ...notDetected];
    return [
      orderedWallets.slice(0, featuredWallets),
      orderedWallets.slice(featuredWallets),
    ];
  }, [wallets, featuredWallets]);

  const handleWalletClick = useCallback(
    (_: SyntheticEvent, walletName: WalletName) => {
      select(walletName);
      handleClose();
    },
    [select, handleClose]
  );

  const handleExpandClick = useCallback(
    () => setExpanded(!expanded),
    [setExpanded, expanded]
  );

  return (
    <DialogContent>
      <List sx={{ width: "100%" }}>
        {featured.map((wallet) => (
          <WalletListItem
            key={wallet.adapter.name}
            onClick={(event) => handleWalletClick(event, wallet.adapter.name)}
            wallet={wallet}
          />
        ))}
        {more.length ? (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {more.map((wallet) => (
              <WalletListItem
                key={wallet.adapter.name}
                onClick={(event) =>
                  handleWalletClick(event, wallet.adapter.name)
                }
                wallet={wallet}
              />
            ))}
          </Collapse>
        ) : null}
      </List>
      {more.length ? (
        <ListItem sx={{ justifyContent: "flex-end" }}>
          <Button size="medium" onClick={handleExpandClick}>
            {expanded
              ? t("connectWallet.wallets.lessOptions")
              : t("connectWallet.wallets.moreOptions")}
            {expanded ? (
              <ArrowDropUp fontSize="medium" />
            ) : (
              <ArrowDropDown fontSize="medium" />
            )}
          </Button>
        </ListItem>
      ) : null}
    </DialogContent>
  );
};
