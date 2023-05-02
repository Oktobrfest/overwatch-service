import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Image, NavItem } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

const MainProfileNav = () => {
	const { user, buildLogoutUrl } = useAuth0();

	return (user &&
		<React.Fragment>
			<div className="flex">
				<NavItem>
					<LogoutButton id="logout" href={buildLogoutUrl()}>Logout</LogoutButton>
				</NavItem>
				<NavItem className="nav-profile margin-left-5">
					<Image src={user.picture} alt={user.name} rounded />
				</NavItem>
				<NavItem className="nav-profile margin-left-5">
					{user.name}
				</NavItem>
			</div>
		</React.Fragment>
	) || <React.Fragment></React.Fragment>;
}

export default MainProfileNav;
