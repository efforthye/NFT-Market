import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import { Readable } from 'stream';

const app: Express = express();

dotenv.config();

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
app.post("/api/mint", upload.single('file'), (req: Request, res: Response) => {
    const { name, description }: { name: string; description: string } = req.body;
    console.log(name);
    console.log(description);
    console.log(req.file);

    res.send("mint complete");
});

app.listen(8080, () => {
    console.log("8080 port server open");
});


