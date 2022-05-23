import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {QueryClient, QueryClientProvider} from "react-query";
import {MetaMaskProvider} from "metamask-react";
import {ethers} from "ethers";
import {NftProvider} from "use-nft";
import Web3Provider from 'web3-react';
import {InjectedConnector} from "web3-react/dist/connectors";

const queryClient = new QueryClient();
const fetcher = ["ethers", {ethers, provider: ethers.getDefaultProvider()}]


ReactDOM.render(
    <React.StrictMode>
            {/* @ts-ignore*/}
            <NftProvider fetcher={fetcher}>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <MetaMaskProvider>
                            <App/>
                        </MetaMaskProvider>
                    </QueryClientProvider>
                </Provider>
            </NftProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
