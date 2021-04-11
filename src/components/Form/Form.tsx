import React from "react";
import { TextField } from "@material-ui/core";
import CSS from 'csstype';

import "./Form.css";

interface FormProps {
  style: CSS.Properties;
}
const Form = ({style}: FormProps) => {
  return (
    <form className="form-module" noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Application Review" variant="outlined" multiline rows={8} rowsMax={8} style={style} />
    </form>
  );
};

export default Form;
