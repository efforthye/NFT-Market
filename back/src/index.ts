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


