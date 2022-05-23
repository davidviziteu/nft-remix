import React, {createRef, FunctionComponent, useEffect, useRef, useState} from "react";
import styles from "./GeneratePage.module.scss";
import {Stage, Layer, Image, Transformer} from 'react-konva';
import useImage from 'use-image';
import {FileInput} from "../../FileInput/FileInput";
import {ImageCollage} from "../../ImageCollage/ImageCollage";
import {Button} from "../../Button/Button";
import {useId} from "../../../reducers/accountReducer";
import {INftInfo} from "../RemixPageView";
import {BigNumber, ethers} from "ethers";
import ERC721Data from '@rsksmart/erc721/ERC721Data.json'
import NftRemix from "../../../artifacts/contracts/NftRemixCtr.sol/Checker.json";
import {sha256} from "js-sha256";
import {nftRemixContract, nftRemixPhotoUpload} from "../../../utils/apiRoutes";


/*
blockHash: "0x3697f6601dfd5ee70a05723b5ec11215e3b15dffad21dd4174186f3db6ddb9ee"
blockNumber: 6936111
byzantium: true
confirmations: 1
contractAddress: null
cumulativeGasUsed: BigNumber {_hex: '0x1077aa', _isBigNumber: true}
effectiveGasPrice: BigNumber {_hex: '0x59682f08', _isBigNumber: true}
events: Array(1)
0:
address: "0xc81369fB4a2A268AB5A84eEB099D6CBb02a9c3F0"
args: (2) [BigNumber, BigNumber, id: BigNumber, hash: BigNumber]
blockHash: "0x3697f6601dfd5ee70a05723b5ec11215e3b15dffad21dd4174186f3db6ddb9ee"
blockNumber: 6936111
data: "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000"
decode: (data, topics) => {…}
event: "RemixedNft"
eventSignature: "RemixedNft(uint256,uint256)"
getBlock: () => {…}
getTransaction: () => {…}
getTransactionReceipt: () => { return Promise.resolve(receipt); }
logIndex: 5
removeListener: () => { return contract.provider; }
topics: ['0x0db8318260891aa7ebf77c4209323085820c3dbbe94886c85560c166805f0273']
transactionHash: "0xdd444b54408854386c40a01de76f48bf30730e68ea00ca125ba19076ba28a145"
transactionIndex: 9
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
from: "0xE706BFB69Ff5EE222F00370D1d256925645f117B"
gasUsed: BigNumber {_hex: '0x024319', _isBigNumber: true}
logs: [{…}]
logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000004000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000100000000000000000000000000000000001000000000000000000000000000000000000000000"
status: 1
to: "0xc81369fB4a2A268AB5A84eEB099D6CBb02a9c3F0"
transactionHash: "0xdd444b54408854386c40a01de76f48bf30730e68ea00ca125ba19076ba28a145"
transactionIndex: 9
type: 2
 */

// @ts-ignore
const URLImage = ({image, dragEnd, onSelect}) => {
    const [img] = useImage(image.src,'anonymous');
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    useEffect(() => {
        if (!trRef.current || !shapeRef.current) {
            return;
        }
        // @ts-ignore
        trRef.current.nodes(shapeRef.current);
        // @ts-ignore
        trRef.current.getLayer().batchDraw();
    }, [trRef, shapeRef]);

    return (
        <Image
            image={img}
            onClick={onSelect}
            onTap={onSelect}
            x={image.x}
            y={image.y}
            width={image.width}
            scale={{x: image.scale, y: image.scale}}
            draggable
            onDragEnd={dragEnd}
            // I will use offset to set origin to the center of the image
            offsetX={img ? img.width / 2 : 0}
            offsetY={img ? img.height / 2 : 0}
        />);
};

let history = [
    {
        x: 20,
        y: 20,
    },
];
let historyStep = 0;

interface IStagedImage {
    id: number;
    src: string;
    x: number;
    y: number;
    scale: number;
    width?: number;
    height?: number;
    isNFT?: boolean;
}

interface IProps {
    nftInfo: INftInfo;
}

const getRatio = (width: number, height: number) => {
    return width / height;
};

const getWidth = (ratio: number, height: number) => {
    return height * ratio;
};

export const GeneratePage: FunctionComponent<IProps> = (props) => {
    const {nftInfo} = props;
    const [images, setImages] = useState([]);
    const [imageId, setImageId] = useState<number>(0);
    const [dragRefs, setDragRefs] = useState([createRef()])
    const [stagedImages, setStagedImages] = useState<IStagedImage[]>([]);
    const [currentDragged, setCurrentDragged] = useState(-1);
    const [historyState, setHistoryState] = useState({
        x: 20,
        y: 20,
    });
    const [selectedImage, setSelectedImage] = useState<number>(-1);
    const [scale, setScale] = useState<number>(1);
    const stageRef = useRef(null);
    const userId = useId();

    useEffect(() => {
        const getNFTImage = async () => {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // get the end user
            const signer = provider.getSigner();

            // get the smart contract
            const contract = new ethers.Contract(nftInfo.address, ERC721Data.abi, signer);
            const fetchedNftData = await (await fetch(`${(await contract.tokenURI(nftInfo.id))}`)).json();

            setStagedImages(
                stagedImages.concat([
                    {
                        // @ts-ignore
                        x: stageRef.current.position().x,
                        // @ts-ignore
                        y: stageRef.current.position().y,
                        width: window.innerWidth * 60 / 100,
                        scale: 1,
                        isNFT: true,
                        src: `${fetchedNftData.image}`,
                        id: imageId,
                    },
                ])
            );
            setImageId(imageId + 1);
        };
        getNFTImage();

    }, []);

    const removeImage = () => {
        if (selectedImage === 0 || selectedImage === -1) {
            return;
        }
        const currentImg = selectedImage;

        setSelectedImage(0);
        setStagedImages(stagedImages.filter((image) => image.id !== currentImg));
    }

    useEffect(() => {
        if (selectedImage === -1) {
            return;
        }
        setScale(stagedImages[selectedImage].scale);
    }, [selectedImage]);

    useEffect(() => {
        if (!stagedImages || stagedImages.length === 0 || selectedImage === -1) {
            return;
        }

        const tempImages = stagedImages.slice();
        tempImages[selectedImage].scale = scale;
        setStagedImages(tempImages);
    }, [scale]);

    const handleDragEnd = (e: { target: { x: () => any; y: () => any; }; }) => {
        history = history.slice(0, historyStep + 1);
        const pos = {
            x: e.target.x(),
            y: e.target.y(),
        };
        history = history.concat([pos]);
        historyStep += 1;
        setHistoryState(pos);
    };

    const onUploadClick = async () => {
        // @ts-ignore
        const message2 = stageRef.current.toDataURL();
        const requestBody = {
            contractAddress: nftInfo.address,
            nftId: nftInfo.id,
            image: message2,
            imageHash: sha256(message2),
            transactionHash: "",
            givenId: -1,
        }

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // get the end user
        const signer = provider.getSigner();

        // get the smart contract
        const contract = new ethers.Contract(nftRemixContract, NftRemix.abi, signer);


        const result = await contract.mintRemixedNft(nftInfo.address, nftInfo.id, BigNumber.from(0), {
            value: ethers.utils.parseEther("0.001"),
            gasLimit: 2000000,
        });
        const transactionInfos = await result.wait();
        console.log(await result.wait());
        requestBody.transactionHash = transactionInfos.transactionHash;
        requestBody.givenId = transactionInfos.events[0].args[0];

        const response = await fetch(`${nftRemixPhotoUpload}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        console.log(response);
        console.log(await response.json());
    }

    const checkDeselect = (e: { target: { getStage: () => any; }; }) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedImage(-1);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.imagesSectionWrapper}>
                <FileInput append
                           uploaded={images}
                           refs={dragRefs}
                           onClick={(value) => setImages(value)}
                           secondaryEffectFunction={(value) => setDragRefs(value)}
                           classes={styles.fileInput}
                           buttonWrapperClasses={styles.fileInputWrapper}
                />
                <ImageCollage images={images}
                              imageFunction={(value) => setImages(value)}
                              refs={dragRefs}
                              refFunction={(value) => setDragRefs(value)}
                              wrapperClasses={styles.imagesWrapper}
                              imageClasses={styles.uploadedImage}
                              draggable={true}
                              currentDragging={(index) => setCurrentDragged(index)}/>
                {stagedImages.length > 0 && (
                    <Button classes={styles.downloadButton} wrapperClasses={styles.downloadButtonWrapper}
                            onClick={onUploadClick}>
                        Upload Image
                    </Button>)}
            </div>
            <div className={styles.canvasWrapper}>
                <div className={styles.controlsWrapper}>
                    <Button onClick={() => scale > 0 && setScale(Number((scale - 0.05).toFixed(2)))} classes={styles.undoButton}>
                        {"<"}
                    </Button>
                    <div className={styles.scaleContainer}>{scale}</div>
                    <Button onClick={() => scale > 0 && setScale(Number((scale + 0.05).toFixed(2)))} classes={styles.redoButton}>
                        {">"}
                    </Button>
                    <Button onClick={removeImage} classes={styles.removeButton}>
                        Remove Image
                    </Button>
                </div>
                <div
                    onDrop={(e) => {
                        e.preventDefault();
                        // register event position
                        // @ts-ignore
                        stageRef.current.setPointersPositions(e);
                        // add image
                        if (currentDragged !== -1) {

                            setStagedImages(
                                stagedImages.concat([
                                    {
                                        // @ts-ignore
                                        ...stageRef.current.getPointerPosition(),
                                        src: dragRefs[currentDragged].current,
                                        isNFT: false,
                                        scale: 1,
                                        id: imageId,
                                    },
                                ])
                            );
                            setImageId(imageId + 1);
                        }

                    }}
                    onDragOver={(e) => e.preventDefault()}>
                    <Stage
                        width={window.innerWidth * 60 / 100}
                        height={window.innerHeight * 70 / 100}
                        className={styles.imageStage}
                        onMouseDown={checkDeselect}
                        onTouchStart={checkDeselect}
                        // @ts-ignore
                        ref={stageRef}>
                        <Layer>
                            {stagedImages.map((image, index) => {
                                return <URLImage key={index} image={image} dragEnd={handleDragEnd}
                                                 onSelect={() => {
                                                     setSelectedImage(image.id)
                                                 }}/>;
                            })}
                        </Layer>
                    </Stage>
                </div>
            </div>

        </div>
    )
}