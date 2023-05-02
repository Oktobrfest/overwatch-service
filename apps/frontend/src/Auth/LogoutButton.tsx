import React from "react";
import { Button, ButtonProps } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = (props: ButtonProps) => {
  return (
      <Button {...props}>
        <FontAwesomeIcon icon={faSignOutAlt} /> {props.children}
      </Button>
  );
};

export default LogoutButton;