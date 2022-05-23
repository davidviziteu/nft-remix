import {FunctionComponent} from "react";
import {useSelector} from "react-redux";
import {useAuthors} from "../../reducers/infoReducer";
import styles from "./AuthorsSection.module.scss"

export const AuthorsSection: FunctionComponent = () => {
    const authors = useAuthors();

    return (
        <div className={styles.authorSectionWrapper}>
            {authors?.map(author => (
                <div key={author.name} className={styles.authorWrapper}>
                    <img src={author.photoUrl} className={styles.authorPhoto} alt="author-photo"/>
                    <h3 className={styles.authorName}>{author.name}</h3>
                    <a href={"mailto:" + author.email} className={styles.authorEmail}>{author.email}</a>
                </div>
            ))}
        </div>
    )
}