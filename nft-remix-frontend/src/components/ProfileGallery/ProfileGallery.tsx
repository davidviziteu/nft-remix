import {useEffect, useState} from "react";
import {Button} from "../Button/Button";
import {useNavigate} from "react-router-dom";
import styles from "./ProfileGallery.module.scss";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import {useDispatch} from "react-redux";
import {useAuth, useId} from "../../reducers/accountReducer";
import {openModal} from "../../reducers/modalReducer";
import {Loader} from "../Loader/Loader";
import {SiteRoutes} from "../../utils/routes";

export const ProfileGallery = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const userId = useId();
    const dispatch = useDispatch();
    const isAuth = useAuth();

    useEffect(() => {
        !isAuth && navigate(SiteRoutes.login);
    }, [])

    // @ts-ignore
    useEffect(async () => {
        if (!userId) {
            return
        }

        const listRef = ref(storage, userId);
        try {
            listAll(listRef).then(async res => {
                const promisedLinks = res.items.map(async item =>  await getDownloadURL(item))
                const downloadedPhotos = Promise.all(promisedLinks);
                setImages(await downloadedPhotos);
                setLoading(false);
            })
        } catch (e) {
            console.error(e);
            setLoading(false);
        }

    }, [userId]);


    const onGetStats = (dlLink: string) => {
        dispatch(openModal({
            title: "Photo analysis",
            downloadLink: dlLink
        }));
    }

    const noPhotosMessage = () => (
        <div className={styles.noPhotosWrapper}>
            <h3 className={styles.noPhotosMessage}>You don't have any photos yet :(</h3>

        </div>
    )

    return (<div className={styles.wrapper}>
        {loading && <Loader />}
        {!loading &&
            <>
                {images?.length === 0 ? noPhotosMessage() : (
                    <div className={styles.photoSectionWrapper}>
                        <div className={styles.photosHeader}>
                            <h3 className={styles.photosTitle}>Uploaded photos</h3>
                            <Button classes={styles.makePhotosButton} onClick={() => navigate(SiteRoutes.create)}>Make another?</Button>
                        </div>
                        <div className={styles.photosWrapper}>
                            {images?.map((image, index) => <div key={index} className={styles.photoItem}>
                                <div className={styles.photoWrapper}>
                                    <img className={styles.photo} src={image} alt="" />
                                </div>
                                <div className={styles.statsWrapper}>
                                    <Button classes={styles.statsButton} onClick={() => onGetStats(image)} >
                                        Get statistics
                                    </Button>
                                </div>
                            </div>)}
                        </div>
                    </div>
                )}
            </>}
    </div>)
}