# NFT-Market
## 기본 폴더 및 라이브러리설치
0. typescript - npx 실행, ts-node로 실행의 차이
    ```bash
    npm i -g typescript ts-node
    ```
1. front
    ```bash
    yarn create react-app front --template typescript 
    cd front
    yarn add web3 axios @metamask/providers
    ```
2. back
    ```bash
    npm init -y
    npm i express dotenv @openzeppelin/contracts @remix-project/remixd cors multer
    npm i -D @types/node nodemon @types/express @types/multer prettier-plugin-solidity tsconfig-paths
    ```

# window.ethereum 이 불러와 지지 않는 오류 해결
1. front에 해당 라이브러리를 다운받는다.
    ```bash
    yarn add @metamask/providers 
    ```
2. 이후 front/src/react-app-env.d.ts 에 아래 코드 추가
    ```ts
    import { MetaMaskInpageProvider } from '@metamask/providers';
    declare global {
        interface Window {
            ethereum?: MetaMaskInpageProvider;
        }
    }
    ```
3. 그리고 window.ethereum 을 (window as any).ethereum 으로 변경한다.


# 실행
- front/yarn start


# 오늘 내일 다룰 내용
- Front
- API Server
- Solidity
- Pinata(IPFS)


# List.tsx 생성
- nft.json의 name, description, image 사용
