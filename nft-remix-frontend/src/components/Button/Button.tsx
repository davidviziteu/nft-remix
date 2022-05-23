import {FunctionComponent} from "react";
import clsx from "clsx";
import styles from "./Button.module.scss"

interface IProps {
    classes?: string;
    wrapperClasses?: string;
    onClick: () => void;
    type?: BtnType;
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

export const Button: FunctionComponent<IProps> = (props) => {
    const { classes, children, onClick, type = BtnType.Primary, wrapperClasses = "" } = props;

    return (
        <div className={clsx(styles.buttonWrapper, wrapperClasses)}>
            <button className={clsx(
                styles.button,
                styles.border,
                ButtonStyle[type],
                classes
            )}
            onClick={onClick}>
                {children}
            </button>
        </div>
    )
}