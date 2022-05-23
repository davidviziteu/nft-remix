import styles from "./StatisticsPage.module.scss";
import {FunctionComponent, useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import { statisticsRoute} from "../../utils/apiRoutes";
import {Loader} from "../Loader/Loader";

export const StatisticsPage:FunctionComponent = () => {
    const [stats, setStats] = useState("");
    const { isFetching, isLoading, error } = useQuery("stats", () =>
            axios.get(
                statisticsRoute
            ).then((res) => setStats(JSON.stringify(res.data, null, 2))),
        {
            enabled: stats === ""
        }
    );
    console.log(stats);

    return (<div className={styles.wrapper}>
        {(isFetching || isLoading) && <Loader /> }
        {!(isFetching || isLoading) && (<div className={styles.stats}>
            <pre className={styles.preStyle}>{stats}</pre>
        </div>) }
    </div>)
}