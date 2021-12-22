import {injected} from "./components/wallet/connectors"
import {useWeb3React} from "@web3-react/core"
import {Web3ReactProvider , getWeb3ReactConttext} from "@web3-react/core"
import {Web3Provider} from "@ethersproject/providers"
import {ethers,contract} from "ethers"
import React from 'react'


export default function App(){

  const InteractiveArea = ()=>{
    const context = useWeb3React()
    const {chainId, provider, account ,active, activate, deactivate} = context
    

    const connectwallet = ()=>{
      activate(injected)
    }
  
    const disconnectWallet = ()=>{
      deactivate(injected)
    }
  
    return(
      <div>
      <button onClick = {() => {activate(injected)}}>Connect Wallet</button>
      {active ? (<div>connected: {account}</div>): (<div>Not connected</div>)}
      <button onClick = {() => {deactivate()}}>Disconnect Wallet</button>
      
    </div>

    )
  }
  //
  function getLibraryf(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }
  return (
    <Web3ReactProvider getLibrary={getLibraryf}>
      <InteractiveArea />
    </Web3ReactProvider>
  )
  
  }

