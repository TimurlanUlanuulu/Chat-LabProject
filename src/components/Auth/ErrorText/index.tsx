import { Alert } from "@mui/material";
import React from "react";

export interface IErrorTextProps {
  error: string;
}

const ErrorText: React.FunctionComponent<IErrorTextProps> = (props) => {
  const { error } = props;

  if (error === "") return null;
  console.log(error);
  return <Alert severity="warning">{error}</Alert>;
};

export default ErrorText;
