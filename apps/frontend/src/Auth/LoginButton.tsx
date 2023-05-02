import React from "react";
import { Button, ButtonProps } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const LoginButton = (props: ButtonProps) => {
  return (
      <Button {...props}>
        <FontAwesomeIcon icon={faUser} /> {props.children}
      </Button>
  );
};

export default LoginButton;