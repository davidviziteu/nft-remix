import {FunctionComponent} from "react";
import clsx from "clsx";
import styles from "./Button.module.scss"

interface IProps {
    classes: string;
    wrapperClasses?: string;
    type?: BtnType;
    downloadURI: string;
}

export enum BtnType {
    Primary = "primary",
    Secondary = "secondary",
    Alert = "alert",
}

const ButtonStyle = {
    primary: styles.primary,
    secondary: styles.secondary,
    alert: styles.alert,
};

export const DownloadButton: FunctionComponent<IProps> = (props) => {
    const { classes, children, type = BtnType.Primary, wrapperClasses = "", downloadURI } = props;

    return (
        <div className={clsx(styles.buttonWrapper, wrapperClasses)}>
            <a className={clsx(
                styles.button,
                styles.border,
                ButtonStyle[type],
                classes
            )}
            href={downloadURI}
            download={"nft-remix-" + new Date().toISOString() + ".png"}>
                {children}
            </a>
        </div>
    )
}