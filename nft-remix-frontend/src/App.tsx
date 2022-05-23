import React, {useEffect} from 'react';
import './App.css';
import './styles/global.scss';
import {Layout} from "./components/Layout/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Homepage} from "./components/Homepage/Homepage";
import {GeneratePage} from "./components/GeneratePage/CreationPage/GeneratePage";
import {Login} from "./components/Login/Login";
import {login, useAuth} from "./reducers/accountReducer";
import {useDispatch} from "react-redux";
import {ProfileGallery} from "./components/ProfileGallery/ProfileGallery";
import {StatisticsPage} from "./components/StatisticsPage/StatisticsPage";
import {SiteRoutes} from "./utils/routes";
import {useMetaMask} from "metamask-react";
import {Loader} from "./components/Loader/Loader";
import {MetaMask, MetaMaskState} from "./components/MetaMask/MetaMask";
import {RemixPageView} from "./components/GeneratePage/RemixPageView";

function App() {
    const dispatch = useDispatch();
    const isAuth = useAuth();
    const { status, connect, account, ethereum } = useMetaMask();

    useEffect(() => {
        if(account !== null && !isAuth) {
            dispatch(login({
                id: account
            }))
        }
    }, [account])

    return (
        <>
            {status === "connected" && (<BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path={SiteRoutes.home} element={<Homepage/>}/>
                        <Route path={SiteRoutes.create} element={<RemixPageView />}/>
                        <Route path={SiteRoutes.login} element={<Login/>}/>
                        <Route path={SiteRoutes.profile} element={<ProfileGallery/>}/>
                        <Route path={SiteRoutes.statistics} element={<StatisticsPage/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>)}

            {(status === "connecting" || status === "initializing") && <Loader />}
            {(status === "notConnected" || status === "unavailable") && <MetaMask  onConnect={connect} state={status === "notConnected" ? MetaMaskState.NOT_CONNECTED : MetaMaskState.NOT_INSTALLED}/>}
        </>);
}

export default App;
