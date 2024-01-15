import {
  Button as MaterialButton,
  IconButton as MaterialIconButton,
  styled,
} from "@mui/material";

export const Button = styled(MaterialButton)({
  textTransform: "none",
  color: "hsl(220, 9%, 7%) !important",
  minWidth: "unset",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  background: "hsl(210, 17%, 95%) !important",
  border: "1px solid hsl(210, 12%, 83%)",
  borderRadius: "62rem",
  // ...(removeIconMargin && { "& .MuiButton-startIcon": { margin: 0 } }),
  "&:disabled": {
    opacity: 0.6,
  },
  "&:hover": {
    backgroundColor: "hsl(216, 14%, 93%) !important",
    borderColor: "var(--dewi_colors_gray_5)",
    color: "hsl(214, 9%, 15%)",
  },
  "&:active": {
    backgroundColor: "hsl(210, 12%, 83%) !important",
    color: "hsl(220, 9%, 7%) !important",
  },
  "&:focus": {
    color: "hsl(214, 9%, 15%) !important",
    outline: "4px solid hsl(214, 61%, 53%)",
  },
});

export const IconButton = styled(MaterialIconButton)({
  background: "#212121",
  color: "#D9D9D9",
  border: "1px solid #414141",
  "&:disabled": {
    opacity: 0.6,
  },
  "&:hover": {
    background: "#212121",
  },
  "&:focus": {
    outline: "2px solid hsl(214, 61%, 53%)",
  },
});
