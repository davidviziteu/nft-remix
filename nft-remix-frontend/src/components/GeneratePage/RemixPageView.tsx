import {GeneratePage} from "./CreationPage/GeneratePage";
import {useState} from "react";
import {CollectionSearch} from "./CollectionSearch/CollectionSearch";

export interface INftInfo {
    address: string;
    id: number;
}

const defaultNFTInfo: INftInfo = {
    address: "",
    id: 0
};

export const RemixPageView = () => {
    const [nftAddress, setNftAddress] = useState<INftInfo>(defaultNFTInfo);

    return (<>
        {nftAddress === defaultNFTInfo ?
            <CollectionSearch onSearch={setNftAddress}/> :
            <GeneratePage nftInfo={nftAddress}/>
        }

    </>);
}