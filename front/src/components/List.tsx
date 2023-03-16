import { useState } from "react";

interface NFTData {
    name: string;
    description: string;
    image: string;
}


export const List = () => {

    // 배포된 NFT 이미지를 94일차의 nft.json에서 가져옴
    const [list, setList] = useState<Array<NFTData>>([{
        "name": "Tree-001",
        "description": "testing NFT with Pinata",
        "image": "https://gateway.pinata.cloud/ipfs/QmV87DvjvfPnTN6g8sNBAHYXJjqGWzo2Ex4KqFTqdA1aZm",
    }]);

    return (
        <ul>
            {list.map((item, idx) =>
                <Item item={item} key={`item-${idx}`} />
            )}
        </ul>
    );
}

const Item = ({ item: { name, description, image } }: { item: NFTData }) => {
    return (
        <li>
            <div>{name}</div>
            <div>{description}</div>
            <div>
                <img src={image} alt="NFT" />
            </div>
        </li>
    );
}