import styles from "./Login.module.scss";
import {FunctionComponent, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "../Button/Button";
import {useAuth} from "../../reducers/accountReducer";
import {useNavigate} from "react-router-dom";
import {SiteRoutes} from "../../utils/routes";

export const Login:FunctionComponent = () => {
    const { loginWithRedirect } = useAuth0();
    const isAuth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        isAuth && navigate(SiteRoutes.home);
    }, [])

    return (<div className={styles.wrapper}>
        <div className={styles.loginContainer}>
            <h3 className={styles.title}>Login</h3>
            <h4 className={styles.description}>Login with google and start making your own personalized photos</h4>
            <Button onClick={() => loginWithRedirect()} classes={styles.loginBtn}>Login</Button>
        </div>
    </div>);
}