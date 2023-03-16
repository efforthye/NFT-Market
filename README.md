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


# List.tsx 생성
- nft.json의 name, description, image 사용


# 실행
- front/ yarn start
- back/ npm run start:dev


# 오늘 내일 다룰 내용
## Front
- 2023. 3. 16. Mint | List

## API Server
- 2023. 3. 16. Mint | List


## Pinata(IPFS)
- 2023. 3. 16. Mint | List
1. back에 라이브러리 설치
npm i @pinata/sdk
2. index.ts import
import pinataSDK from '@pinata/sdk';
3. config() 아래에
const pinata = new pinataSDK(process.env.API_KEY, process.env.API_Secret);
4. 피냐타 로그인 api 키 새로 만듬 admin, 이름적기 , create -> copy all
API_KEY = xxxxxxx
API_SECRET = xxxxxxxxxxxxxxxx
5. back 폴더 내부에 .env 생성 후 위 api key,secret 저장
6. mint 클릭시 api 내용 추가
    const imgResult = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
        pinataMetadata: {
            name: Date.now().toString(),
        },
        pinataOptions: {
            cidVersion: 0,
        }
    });
    console.log(imgResult);
7. 확인
- server의 console.log -> IpfsHash : QmaKThD44ymQcQZYNrdpAuBqHEBkyC1WtL9aoQxsTfYkje
- pinata에서 QmaKThD44ymQcQZYNrdpAuBqHEBkyC1WtL9aoQxsTfYkje CID 파일 확인 가능
8. 그리고 isDuplicate 를 방지(?) 하기 위하여 변수의 타입을 정의하도록 바꿔준다.
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
    if(imgResult.isDuplicate){
        console.log("같은 이미지!");
    }
9. 해당 타입을 interface로 빼 주고 싶다면 어떻게?

10. json 형식으로 nft data를 pinata에 올린다.






## Solidity
- 2023. 3. 17. Mint | List

