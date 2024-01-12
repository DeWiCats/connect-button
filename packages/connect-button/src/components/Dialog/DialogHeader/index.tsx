"use client";

import { styled } from "@mui/material";
import { Children, ReactNode } from "react";

interface DialogHeaderProps {
  children: ReactNode;
}

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  color: "hsl(210, 17%, 98%)",
  gap: "1.375rem",
});

const Title = styled("div")({
  fontFamily: "Inter",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "1.375rem",
  width: "100%",
  fontSize: "1.25rem",
  color: "hsl(210, 17%, 98%)",
});

const ActionsWrapper = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  alignItems: "start",
  justifyItems: "center",
  width: "100%",
  '.start': {
    justifySelf: 'start',
  },
  '.end': {
    justifySelf: 'end',
  },
}));

const Actions = ({ children }: DialogHeaderProps) => {
  const count = Children.count(children);
  return (
    <ActionsWrapper>
      {count === 2 && <span />}
      {children}
    </ActionsWrapper>
  );
};

export const DialogHeader = ({ children }: DialogHeaderProps) => {
  return <Container>{children}</Container>;
};

DialogHeader.Title = Title;
DialogHeader.Actions = Actions;
