import styles from "./Topbar.module.scss";
import {FunctionComponent} from "react";
import clsx from "clsx";
import Logo from "../../assets/heart-eyes.svg";
import {AccountButton} from "../AccountButton/AccountButton";
import {useNavigate} from "react-router-dom";
import {SiteRoutes} from "../../utils/routes";


export const TopBar: FunctionComponent<any> = () => {
    const navigate = useNavigate();

    return (
        <div className={clsx(styles.topbar)}>
            <div onClick={() => navigate(SiteRoutes.home)}>
                <img src={Logo} className={styles.logo} alt="site-logo"/>
            </div>


            <AccountButton />
        </div>
    )
}