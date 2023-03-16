import { Mint } from './components/Mint';
import { useWeb3 } from './modules/useWeb3';

function App() {

  const { account, chainId, logIn } = useWeb3();

  return (
    <div>
      <div>
        {
          account ?
            (
              <div>
                <div>ChainId : {chainId}</div>
                <div>Account : {account}</div>
                <Mint />
              </div>
            ) :
            (
              <div>
                <button onClick={() => {
                  logIn();
                }}>Metamask Login</button>
              </div>
            )
        }
      </div>
    </div>
  );
}

export default App;
