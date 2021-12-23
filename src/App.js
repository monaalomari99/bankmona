import {injected} from "./components/wallet/connectors"
import {useWeb3React} from "@web3-react/core"
import {Web3ReactProvider , getWeb3ReactConttext} from "@web3-react/core"
import {Web3Provider} from "@ethersproject/providers"
import {ethers,contract, Contract} from "ethers"
import React from 'react'


export default function App(){

  const InteractiveArea = () => {
    const context = useWeb3React()
    const {chainId, provider, account, active, library, activate, deactivate} = context
    const WalletAddress = account
    
    const connectwallet = () => {
      activate(injected)
    }
    const disconnectWallet = () => {
      deactivate(injected)
    }
    //connect to smart contract
    const abi = [
    ]
    const cAddr = "0x53043A039eC996928523a3875037073dB4A2a210"
    
    const getReadOnlyContract = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new Contract(cAddr,abi,provider)
      return contract
    }

    async function getNumber() {
      const contract = getReadOnlyContract()
      const numberOnTract = await contract.retrieve()
      console.log("number from contract: " + numberOnTract)
    }
    
    //will require gas
    async function storeNumber() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signed = await contract.getSigner()//sign on smart contract and take gas from your wallet
      const contract = new Contract(cAddr,abi,signed)
      await contract.store(70)
    }


    return(
      <div>
         <div>
            <button onClick = {connectwallet}>Connect</button>
            <div>connected Address: {WalletAddress}</div>
            <button onClick = {disconnectWallet}>Disconnect</button>
         </div>
         <div>
            <button onClick = {getNumber}> Get Smart Contract Number</button>
            <button onClick = {storeNumber}> Store Smart Contract Number</button>
         </div>
      </div>
    )
  }
  //connect to web3
  function getLibraryf (provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }
  return (
    <Web3ReactProvider getLibrary = {getLibraryf} >
      <InteractiveArea />
    </Web3ReactProvider>
  )
  
}


