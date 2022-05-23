import {FunctionComponent} from "react";
import {useAuth, useId} from "../../reducers/accountReducer";
import {Button} from "../Button/Button";
import styles from "./AccountButton.module.scss"
import People from "../../assets/people.svg"
import { useNavigate } from "react-router-dom";
import Logout from "../../assets/logout.svg";
import {useAuth0} from "@auth0/auth0-react";
import {SiteRoutes} from "../../utils/routes";

export const AccountButton: FunctionComponent = () => {
    const isAuth = useAuth();
    const account = useId();
    const navigate = useNavigate();
    const { logout } = useAuth0();

    const notLoggedComponent = (
        <Button classes={styles.notLoggedButton} onClick={() => navigate(SiteRoutes.login)}>
            Log in
        </Button>
    )

    const loggedInComponent = (
        <div className={styles.loggedButtonWrapper}>
            <h3 className={styles.welcomeMessage}>
                Welcome, <span className={styles.username}>{account}</span>!
            </h3>
            {/*<Button classes={styles.accountBtn} onClick={() => navigate(SiteRoutes.profile)}>*/}
            {/*    <img src={People} className={styles.accountLogo} />*/}
            {/*</Button>*/}

            {/*<Button classes={styles.logoutBtn} onClick={() => logout({ returnTo: window.location.origin })}>*/}
            {/*    <img src={Logout} className={styles.accountLogo} />*/}
            {/*</Button>*/}
        </div>
    )

    return (
        <div className={styles.wrapper}>
            {isAuth ? loggedInComponent : (!window.location.pathname.includes("/login") && notLoggedComponent)}
        </div>
    )
}