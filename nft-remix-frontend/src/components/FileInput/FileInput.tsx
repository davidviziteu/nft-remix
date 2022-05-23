import {createRef, FunctionComponent, useRef} from "react";
import styles from "./FileInput.module.scss";
import {BtnType, Button} from "../Button/Button";
import clsx from "clsx";

interface IProps {
    uploaded: any;
    refs?: any;
    onClick: (value: any) => void;
    secondaryEffectFunction?: (value: any) => void;
    classes: string;
    buttonWrapperClasses?: string;
    append?: boolean;
}

export const FileInput: FunctionComponent<IProps> = (props) => {
    const { uploaded, onClick, classes, buttonWrapperClasses, append = false, secondaryEffectFunction, refs = [] } = props;
    const allowMultipleFiles = true;
    const fileInputRef = useRef(null);

    const fileUploadHandler = (e: { target: { value: string; files: any; }; }) => {
        if (e.target.value === '') {
            return
        }
        // get the files
        let files = e.target.files;

        // Process each file
        let allFiles: any[] = [];
        for (let i = 0; i < files.length; i++) {

            let file = files[i];

            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {

                // Make a fileInfo Object
                let fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };

                allFiles.push(fileInfo);
                if (allFiles.length === files.length) {
                    if (allowMultipleFiles) {
                        if (append) {
                            const cUpload = [...uploaded];
                            const aRefs = Array(allFiles.length).fill(createRef());
                            cUpload.push(...allFiles);
                            onClick(cUpload);
                            secondaryEffectFunction && secondaryEffectFunction([...refs, ...aRefs]);
                        } else {
                            onClick(allFiles);
                        }
                    }
                    else {
                        onClick(allFiles[0]);
                    }
                }
            } // reader.onload

        } // for
    }

    return (<div>
        <Button classes={clsx(styles.uploadButton, classes)} wrapperClasses={buttonWrapperClasses} type={BtnType.Primary} onClick={() => {
        }}>
            <label className='photo-upload-label' htmlFor="upload-photo">+</label>
        </Button>
        <input
            ref={fileInputRef}
            className={styles.hidden}
            type='file'
            onChange={fileUploadHandler}
            id='upload-photo'/>
    </div>)
}