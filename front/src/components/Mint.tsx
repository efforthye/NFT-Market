import axios from "axios";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Web3 from 'web3';

export const Mint = ({ account, web3 }: { account: string; web3: Web3 }) => {

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
        if (!NFTName || !NFTDescription || !file || !account) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', NFTName);
        formData.append('description', NFTDescription);
        formData.append('from', account);
        const result = (
            await axios.post("http://localhost:8080/api/mint", formData)
        ).data;

        console.log(result);
        // 이제 해당 객체 데이터(sendTransaction)를 가지고 transaction을 보내 NFT 등록을 한다.?
        // SaleToken.sol  // 리스트를 만들어서
        // balanceOf : 가진 토큰(NFT) 개수
        // 어떻게 NFT 등록하더라
        // balanceOf 보내보면 민팅되면 1됨
        // Mint, safeMint

        // 스마트 컨트랙트를 보낸 사람과 같아야 한다고 함
        web3.eth.sendTransaction(result);
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