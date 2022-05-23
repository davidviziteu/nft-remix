import styles from './SearchRow.module.scss';
import {FunctionComponent, useEffect, useState} from "react";
import {ISearchResult} from "../CollectionSearch";
import {ethers} from "ethers";
import ERC721Data from '@rsksmart/erc721/ERC721Data.json'
import BigNumber from "bignumber.js";
import clsx from "clsx";

interface IProps {
    res: ISearchResult;
    onSearch: (res: string) => void;
}

export const SearchRow: FunctionComponent<IProps> = (props) => {
    const {res, onSearch} = props;
    const [hasNFTs, setHasNFTs] = useState(false);

    useEffect(() => {
        const handleNFTs = async () => {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // get the end user
            const signer = provider.getSigner();

            // get the smart contract
            const contract = new ethers.Contract(res.address, ERC721Data.abi, signer);

            try {
                // @ts-ignore
                const nftCount = (await contract.balanceOf(window.ethereum.selectedAddress)).toNumber();
                setHasNFTs(nftCount > 0);
            } catch (e) {
                console.error("Could not get NFT count");
            }
        };

        handleNFTs();
    }, [])

    return (<div className={clsx(styles.resultWrapper, {[styles.noNFT]: !hasNFTs})} onClick={() => {
        if (hasNFTs) {
            onSearch(res.address);
        } else {
            // alert("You don't have any NFTs in this collection. Please add some first.");
            onSearch(res.address);
        }
    }}>
        <img className={styles.resultImage} src={res.link} alt={res.name}/>
        <span className={styles.resultName}>{res.name}</span>
    </div>);
}