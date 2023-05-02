import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import MainProfileNav from "./MainProfileNav";

const AuthButton = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	
	return (
		<div className="auth-button">
			{isAuthenticated
				? <MainProfileNav></MainProfileNav>
				: <LoginButton id="Login" onClick={loginWithRedirect}>Login</LoginButton>
			  }
		</div>
	);
}

export default AuthButton;
