import './App.css';
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined)
  const [walletAddress, setWalletAddress] = useState(undefined)
  const [currentBalance, setCurrentBalance] = useState(undefined)
  const [chainId, setChainId] = useState(undefined)
  const [isConnected,setIsConnected] = useState(false)
  
  const chainIds = {
    1 :  {name : "Ethereum mainnet", symbol : "ETH"},
    3 : {name : "Ropsten", symbol : "RopstenETH"},
    4 : {name : "Rinkeby", symbol : "RinkebyETH"},
    5 : {name : "Goerli", symbol : "GoerliETH"},
    42 : {name : "Kovan", symbol : "KovanETH"},
    56 : {name : "Binance Smart Chain Mainnet", symbol : "BNB"},
    97 : {name : "Binance Smart Chain Testnet", symbol : "tBNB"},
    43114 : {name : "Avalanche C-Chain", symbol : "AVAX"},
    137 : {name : "Polygon Mainnet", symbol : "MATIC"},
    80001 : {name : "Mumbai", symbol : "MATIC"},
    42161 : {name : "Arbitrum One", symbol : "ETH"},
    10 : {name : "Optimism", symbol : "ETH"},
    250 : {name : "Fantom Opera", symbol : "FTM"},
    8217 : {name : "Klaytn Mainnet Cypress", symbol : "KLAY"},
    1001 : {name : "baobob", symbol : "KLAY"},
    61 : {name : "Ethereum Classic Mainnet", symbol : "ETC"},
    11155111 : {name : "Sepolia", symbol : "SepoliaETH"},
    5777 : {name : "Ganache", symbol : "ETH"},
    1337 : {name : "Ganache", symbol : "ETH"}

  }


  const connectWallet = useCallback(async () => {
    try {
      if(typeof window.ethereum !== 'undefined') { //설치 안 되어 있으면 undefined임
        await getMetamaskData(); //아래에 정의되어 있음
        setIsConnected(true);
        //new_contract() 로그인하면 새롭게 계약도 체결되는 함수 연걸하기
        //delete_contract() 이전 계약 삭제하는 함수 연결하기
      } else { //설치가 안 되어 있는 경우
        alert("please install MetaMask")
      }
    } catch (error) {
      console.log(error);
    }
  },[])

  const getMetamaskData = async () => {
    const _provider = await getProvider(); 
    const _signer = await getSigner(_provider);
    await getWalletData(_signer); //아래에 정의되어 있음
  }

  const getProvider = async () => { //메타마스크에서 제공하는 Provider를 이더 모듈에 저장
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    return provider;
  }

  const getSigner = async (provider) => { //메타마스크에 홈페이지 연동 승인 요청
    await provider.send("eth_requestAccounts", []); //메타마스크로 서명 요청
    const signer = provider.getSigner(); //서명 저장
    setSigner(signer) 

    return signer;
  }
  
  const getWalletData = async(signer) => { //현재 사용자의 데이터 얻기
    const result = await Promise.all([
      signer.getAddress(), //지갑 주소
      signer.getBalance(), //현재 잔액
      signer.getChainId() //네트워크 ID
    ])
    setWalletAddress(result[0]) 
    setCurrentBalance(Number(ethers.utils.formatEther(result[1]))) //잔액을 10진수로 저장
    setChainId(result[2])
  }

  // const new_contract = 새롭게 계약을 체결하는 함수 작성 (이전에 작성한 유언장을 토대로 계약을 체결해야 하기에 이전에 작성한 유언장을 불러올 방법이 필요할것 같다.)
  // const delete_contract = 이전 계약(유서)을 삭제하는 함수 작성

  const displayWalletAddress = `${walletAddress?.substring(0,10)}...`
  const displayCurrentBalance = `${currentBalance?.toFixed(4)}`
  
  return (
    <div className="App">
      <nav className='nav'>
        <div className='rightNav'>
          <div className="connectButtonContainer">
            <>
            {isConnected ? (
        <div className="buttonContainer">
            <span className="pageButtonBold connectButton">{"잔액은 "}{displayCurrentBalance}{chainIds[chainId].symbol}{"입니다"}</span> 
            <span className="pageButtonBold connectButton">{"계정 주소는 "}{displayWalletAddress}</span>
        </div>
      ) : (
        <div className="btn_connectButton"
          onClick={() => connectWallet()}
        >
          Connect Wallet
        </div>
      )}
            </>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;