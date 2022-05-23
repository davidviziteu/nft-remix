import React, {FunctionComponent} from "react";
import styles from "./ImageCollage.module.scss";
import clsx from "clsx";
import {Button} from "../Button/Button";

interface IProps {
    images: any;
    imageFunction: (value: any) => void;
    refs: any;
    refFunction: (value: any) => void;
    wrapperClasses: string;
    imageClasses: string;
    draggable: boolean;
    currentDragging: (index: number) => void;
}

export const ImageCollage:FunctionComponent<IProps> = (props) => {
    const { images, refs, wrapperClasses, imageClasses, draggable, imageFunction, refFunction, currentDragging } = props;

    const onDeletePhoto = (index: number) => {
        const cImages = [...images];
        const cRefs = [...refs];
        const hasRefs = cRefs.length === cImages.length && cRefs.length > 0;
        cImages.splice(index,1);
        imageFunction(cImages);
        hasRefs && cRefs.splice(index, 1);
        hasRefs && refFunction(cRefs);
    }

    return (<div className={clsx(styles.wrapper, wrapperClasses)}>
        {images?.map((image: { base64: string | undefined; }, index: number) => (
            <div className={styles.imageWrapper}>
                <Button classes={styles.deleteButton} wrapperClasses={styles.deleteButtonWrapper} onClick={() => onDeletePhoto(index)}>
                    x
                </Button>
                <img
                    alt=""
                    src={image.base64}
                    className={clsx(styles.image, imageClasses)}
                    draggable={draggable}
                    onDragStart={(e) => {
                        // @ts-ignore
                        refs[index].current = e.target.src;
                        currentDragging(index);
                    }}
                />
            </div>
        ))}
    </div>)
}