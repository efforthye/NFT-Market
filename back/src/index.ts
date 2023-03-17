import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import { Readable } from 'stream';
import pinataSDK from '@pinata/sdk';
import Web3 from 'web3';
import axios from 'axios';
import { AbiItem } from 'web3-utils';
import { abi as NFTAbi } from '../contracts/artifacts/NFTToken.json';
import { abi as SaleAbi } from '../contracts/artifacts/SaleToken.json';

const app: Express = express();

dotenv.config();

const web3 = new Web3("http://ganache.test.errorcode.help:8545");
// const web3 = new Web3("http://localhost:8545"); // 로컬 Ganache

const pinata = new pinataSDK(process.env.API_KEY, process.env.API_Secret);


// credentials : 쿠키 허락
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const upload = multer();

// 현재 배포된 NFT 이미지를 94일차의 nft.json에서 가져옴
app.get("/api/list", (req: Request, res: Response) => {
    const array = [
        {
            "name": "Tree-001",
            "description": "testing NFT with Pinata",
            "image": "https://gateway.pinata.cloud/ipfs/QmV87DvjvfPnTN6g8sNBAHYXJjqGWzo2Ex4KqFTqdA1aZm",
        },
        {
            "name": "Tree-002",
            "description": "testing NFT with Pinata",
            "image": "https://gateway.pinata.cloud/ipfs/QmV87DvjvfPnTN6g8sNBAHYXJjqGWzo2Ex4KqFTqdA1aZm",
        },
    ]
    res.send(array);
});


// upload.single('file') <- (중요)
app.post("/api/mint", upload.single('file'), async (req: Request, res: Response) => {
    const { name, description }: { name: string; description: string } = req.body;

    // Mint 클릭시 Image를 Pinata에 올린다.
    const imgResult: {
        IpfsHash: string;
        PinSize: number;
        Timestamp: string;
        isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
        pinataMetadata: {
            name: Date.now().toString(),
        },
        pinataOptions: {
            cidVersion: 0,
        }
    });
    console.log(imgResult);

    if (imgResult.isDuplicate) {
        console.log("같은 이미지!");
    }

    // JSON 형식으로 NFT Data(.json)를 Pinata에 올린다.
    const jsonResult = await pinata.pinJSONToIPFS({
        name,
        description,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
    }, {
        pinataMetadata: {
            // .json : 이름이 같을 수 있기 때문에 추가
            name: Date.now().toString() + ".json",
        },
        pinataOptions: {
            cidVersion: 0,
        }
    });
    console.log(jsonResult);

    const deployed = new web3.eth.Contract(NFTAbi as AbiItem[], process.env.NFT_TOKEN_CA);

    const obj: { nonce: number; to: string; from: string; data: string } = {
        nonce: 0,
        to: process.env.NFT_TOKEN_CA,
        from: req.body.from,
        data: "",
    }
    obj.nonce = await web3.eth.getTransactionCount(req.body.from);
    obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();

    res.send(obj);
    // res.send("mint complete");
});

app.listen(8080, () => {
    console.log("8080 port server open");
});


