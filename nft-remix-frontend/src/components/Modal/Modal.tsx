import {FunctionComponent, useState} from "react";
import {closeModal, useModal, useModalContent} from "../../reducers/modalReducer";
import styles from "./Modal.module.scss";
import clsx from "clsx";
import {useQuery} from "react-query";
import axios from "axios";
import {photoScanRoute} from "../../utils/apiRoutes";
import {useDispatch} from "react-redux";

export const Modal: FunctionComponent = () => {
    const isOpen = useModal();
    const modalInfo = useModalContent();
    const [description, setDescription] = useState<string>("");
    const dispatch = useDispatch();
    const results = useQuery(modalInfo?.downloadLink, () =>
            axios.get(
                `${photoScanRoute}?imgURL=${modalInfo?.downloadLink}`
            ).then((res) => setDescription(res.data)),
        {
            enabled: isOpen && description === ""
        }
    );
    const {isLoading, isFetching, error} = results;

    const onClose = () => {
        dispatch(closeModal());
        setDescription("");
    };

    const photoDescriptionFragment = (<div className={styles.descriptionWrapper}>
        {!!error && <h3 className={styles.error}>Sorry, there was a problem when fetching your data :(</h3>}
        {!error && <div className={styles.description}>
            {description}
        </div>}
    </div>)

    return (
        <div className={clsx(styles.layout, {[styles.opened]: isOpen})}>
            <div className={clsx(styles.wrapper, modalInfo?.wrapperClasses)}>
                <div className={clsx(styles.header, modalInfo?.headerClasses)}>
                    <span className={styles.close} onClick={onClose}>x</span>
                    <h3 className={clsx(styles.title, modalInfo?.titleClasses)}>{modalInfo?.title}</h3>
                </div>
                <div className={clsx(styles.body, modalInfo?.bodyClasses)}>
                    {isLoading || isFetching ?
                        <h3 className={styles.loadingMessage}>We're fetching your results, please wait :D</h3>
                        :
                        photoDescriptionFragment}
                </div>
            </div>
        </div>);
}