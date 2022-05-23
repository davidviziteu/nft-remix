import {FormEvent, FunctionComponent, useRef, useState} from "react";
import styles from "./CollectionSearch.module.scss";
import {Button} from "../../Button/Button";
import {nftPhotos, nftSearchRoute} from "../../../utils/apiRoutes";
import {SearchRow} from "./Row/SearchRow";
import {INftInfo} from "../RemixPageView";
import {ethers} from "ethers";
import ERC721Data from '@rsksmart/erc721/ERC721Data.json'


interface IProps {
    onSearch: (nft: INftInfo) => void;
}

export interface ISearchResult {
    address: string;
    name: string;
    link: string;
}

export const CollectionSearch: FunctionComponent<IProps> = (props) => {
    const {onSearch} = props;
    const [results, setResults] = useState<ISearchResult[]>([]);
    const [contractAddress, setContractAddress] = useState<string>("0x2D66804271f12675ABF138163113a0eC56C84750");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const contractFormRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (res: FormEvent<HTMLFormElement>) => {
        res.preventDefault();
        // @ts-ignore
        const collectionName = res.target[0].value;
        let results = await (await fetch(`${nftSearchRoute}${collectionName}`)).json();
        results = results.splice(1, results.length - 1);
        setResults(results.map((res: string) => ({
            name: res.split("\t")[0],
            address: res.split("\t")[1],
            link: `${nftPhotos}${res.split("\t")[5]}`,
        })));
    }

    const handleIdSubmit = async (res: FormEvent<HTMLFormElement>) => {
        res.preventDefault();
        if (submitting) {
            return;
        }
        setSubmitting(true);

        // @ts-ignore
        const nftId = res.target[0].value;

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // get the end user
        const signer = provider.getSigner();

        // get the smart contract
        const contract = new ethers.Contract(contractAddress, ERC721Data.abi, signer);

        let isOwner = false;
        try {
            // @ts-ignore
            isOwner = ((await contract.ownerOf(nftId))).toLowerCase() === window.ethereum.selectedAddress;
            if (isOwner) {
                onSearch({
                    address: contractAddress,
                    id: nftId,
                });
            } else {
                alert("You are not the owner of this token");
            }
        } catch (e) {
            alert("There is no such token");
        } finally {
            setSubmitting(false);
        }
    }

    return (<div className={styles.wrapper}>
        {contractAddress !== "" ? <div className={styles.nftIdWrapper}>
                {/*<Button onClick={() => setContractAddress("")}>*/}
                {/*    Back*/}
                {/*</Button>*/}
                <div className={styles.contract}>
                    <h3>Contract Address:</h3>
                    <p>{contractAddress}</p>
                </div>
                <span className={styles.nftIdLabel}>The id of your nft: </span>
                <form ref={contractFormRef} className={styles.inputWrapper} onSubmit={handleIdSubmit}>
                    <input className={styles.input}/>
                    <Button classes={styles.button} onClick={() => {
                        // @ts-ignore
                        contractFormRef.current.requestSubmit();
                    }}>Set id</Button>
                </form>
            </div> :
            <div className={styles.collectionSearch}>
                <span className={styles.nftIdLabel}>Search for an nft collection: </span>
                <form ref={formRef} className={styles.inputWrapper} onSubmit={handleSubmit}>
                    <input className={styles.input}/>
                    <Button classes={styles.button} onClick={() => {
                        // @ts-ignore
                        formRef.current.requestSubmit();
                    }}>Search</Button>
                </form>
                <div className={styles.searchWrapper}>
                    {results.length > 0 && results.map((res, index) => (
                        <SearchRow key={index} res={res} onSearch={setContractAddress}/>
                    ))}
                </div>
            </div>
        }
    </div>);
}