import {AuthorsSection} from "../AuthorsSection/AuthorsSection";
import styles from "./Homepage.module.scss"
import Wallpaper from "../../assets/home-wallpaper.jpeg"
import {useAuth} from "../../reducers/accountReducer";
import {Button} from "../Button/Button";
import {useNavigate} from "react-router-dom";
import {SiteRoutes} from "../../utils/routes";

export const Homepage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(SiteRoutes.create);
    }

    return(
        <div className={styles.homepageWrapper}>
            <div className={styles.wallpaperWrapper}>
                <img src={Wallpaper} className={styles.heroImage} alt="hero-image" />
                <h3 className={styles.heroDescription}>Explore your creativity</h3>
                <Button classes={styles.redirectButton} onClick={handleButtonClick}>
                    <span className={styles.redirectBtnLabel}> Try now </span>
                </Button>
            </div>
            <AuthorsSection />
        </div>
    )
}