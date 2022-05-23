import styles from "./PhotoDescription.module.scss";
import {FunctionComponent, useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import {photoScanRoute} from "../../utils/apiRoutes";

interface IProps {
    downloadLink: string;
}

export const PhotoDescription:FunctionComponent<IProps> = (props) => {
    const { downloadLink } = props;





    return (<div className={styles.wrapper}>

    </div>);
}