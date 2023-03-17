import { useCallback, useState } from 'react';
import Web3 from 'web3';

export const useWeb3 = (): {
    // web3: Web3 | undefined;
    web3?: Web3;
    account: string;
    chainId: string | null;
    logIn: () => void;
} => {
    const [web3, setWeb3] = useState<Web3 | undefined>();
    const [account, setAccount] = useState<string>("");
    const [chainId, setChainId] = useState<string>("");

    // 조건([], 처음 마운트 될 때)에 따라 해당 변수(logIn)를 정의한다.
    const logIn = useCallback(async () => {
        try {
            if ((window as any).ethereum) {

                const _web3 = new Web3((window as any).ethereum);
                setWeb3(_web3);

                const [_account] = (await (window as any).ethereum.request({
                    method: 'eth_requestAccounts'
                })) as Array<string>;

                if (_account) {
                    setAccount(_account);
                }

                window.ethereum?.on('accountsChanged', async () => {
                    if (window.ethereum) {
                        const [_account] = (await window.ethereum.request({
                            method: 'eth_requestAccounts',
                        })) as Array<string>;
                        setAccount(_account);
                    }
                });


                setChainId((window as any).ethereum.networkVersion);

            } else {
                console.log("MetaMask is not exist");
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    return { web3, account, chainId, logIn }

}


