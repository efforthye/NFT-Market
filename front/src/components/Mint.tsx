import axios from "axios";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";


export const Mint = () => {

    const [NFTName, setNFTName] = useState<string>("");
    const [NFTDescription, setNFTDescription] = useState<string>("");
    const [file, setFile] = useState<File | undefined>();
    const [img, setImg] = useState<string | ArrayBuffer>("");

    const nameInput = useCallback((e: FormEvent<HTMLInputElement>) => {
        setNFTName(e.currentTarget.value);
    }, []);

    const descriptionInput = useCallback((e: FormEvent<HTMLInputElement>) => {
        setNFTDescription(e.currentTarget.value);
    }, []);

    const fileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            setFile(e.currentTarget.files[0]);

            // 이미지 경로 세팅
            const reader = new FileReader();
            reader.readAsDataURL(e.currentTarget.files[0]);
            reader.onload = () => {
                if (reader.result) {
                    setImg(reader.result);
                }
            }

        }
    }, []);

    const mint = async () => {
        if (!NFTName || !NFTDescription || !file) return;
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('name', NFTName);
        formData.append('description', NFTDescription);
        const result = (
            await axios.post("http://localhost:8080/api/mint", formData)
        ).data;
        console.log(result);
    }


    return (
        <div>
            <input type={'text'} onInput={nameInput} placeholder={"NFT Name"} />
            <input type={'text'} onInput={descriptionInput} placeholder={"NFT Description"} />
            <input type={'file'} onChange={fileChange} />
            {img && (
                <div>
                    <img src={img.toString()} />
                </div>
            )}
            <button onClick={mint}>Mint</button>
        </div>
    );
}