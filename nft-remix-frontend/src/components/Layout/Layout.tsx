import { FunctionComponent } from "react";
import { TopBar } from "../Topbar/TopBar";
import { Modal } from "../Modal/Modal";


export const Layout:FunctionComponent = ({children}) => {
    return (
        <>
            <TopBar />
            <Modal />
            {children}
        </>
    )
}