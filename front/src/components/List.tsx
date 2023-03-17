import axios from "axios";
import { useEffect, useState } from "react";

interface NFTData {
    name: string;
    description: string;
    image: string;
}


export const List = ({ account }: { account: string }) => {

    // API Server에서 리스트 받아서 출력하자.
    const [list, setList] = useState<Array<NFTData>>([]);

    useEffect(() => {
        (async () => {
            console.log(await axios.get("https://ipfs.io/ipfs/QmR7oN6tWuB5ikYAyZwKvsBU4eAhy6L671mdJTBA21KVDW"));
            setList((await axios.post("http://localhost:8080/api/list", { from: account })).data);
        })();
    }, [account]);

    return (
        <ul>
            {list?.map((item, idx) =>
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