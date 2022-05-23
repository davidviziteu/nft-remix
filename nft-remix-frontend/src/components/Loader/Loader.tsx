import styles from "./Loader.module.scss";
import clsx from "clsx";
import {FunctionComponent} from "react";

interface IProps {
    classes?: string;
    wrapperClasses?: string;
}

export const Loader:FunctionComponent<IProps> = (props) => {
    const { classes = "", wrapperClasses = "" } = props;

    return (<div className={clsx(styles.wrapper, wrapperClasses)}>
        <div className={clsx(styles.loader, classes)}/>
    </div>);
}