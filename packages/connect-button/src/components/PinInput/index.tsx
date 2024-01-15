import React, { useState } from "react";
import { styled } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

const Input = styled(MuiOtpInput)(({ error }: { error?: boolean }) => ({
  gap: "0.25rem",
  "& .MuiOtpInput-TextField-3": {
    marginRight: "1.25rem",
  },
  "& .MuiInputBase-root": {
    margin: 0,
    color: "#f9fafb",
    background: "#25262B",
    borderRadius: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: error ? "#E75F59" : "#353A3F",
    width: "2.75rem",
    height: "2.75rem",
    textAlign: "center",
  },
}));

type PinInputComponentProps = {
  onComplete: (value: string) => void;
  error: boolean;
};

const PinInput = ({ onComplete, error = false }: PinInputComponentProps) => {
  const [value, setValue] = useState("");

  const handleChange = (newVal: string) => {
    setValue(newVal);
  };

  const handleValidInput = (character: string): boolean => {
    return /\d/.test(character);
  };

  return (
    <Input
      validateChar={handleValidInput}
      length={6}
      value={value}
      onChange={handleChange}
      onComplete={onComplete}
      error={error}
    />
  );
};

export default PinInput;
