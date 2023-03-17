import { List } from './components/List';
import { Mint } from './components/Mint';
import { useWeb3 } from './modules/useWeb3';

function App() {

  const { account, chainId, logIn, web3 } = useWeb3();

  return (
    <div>
      <div>
        {
          account && web3 ?
            (
              <div>
                <div>ChainId : {chainId}</div>
                <div>Account : {account}</div>
                <Mint account={account} web3={web3} />
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
      <List account={account} />
    </div>
  );
}

export default App;
