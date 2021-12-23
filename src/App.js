import { injected } from "./components/wallet/connectors"
import { useWeb3React } from "@web3-react/core"
import { Web3ReactProvider, getWeb3ReactContext } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import {ethers, Contract} from "ethers"
//import formatEther from "@ethersproject/units" will want later if importing eth values probably
import React, { useState } from 'react'

export default function App() {



  const InteractiveArea = () => {

      const [number, changeNumber] = useState(0)

      function decreaseNumber() {
        changeNumber(number - 1)
      }

      function increaseNumber() {
        changeNumber(number + 1)
      }

      const context = useWeb3React()
      const {chainId, provider, account, active, activate, deactivate} = context
      const walletAddress = account

      const connectWallet = () => {
        activate(injected)
      }

      const disconnectWallet = () => {
        deactivate(injected)
      }

      //connect to smart contract
      const abi = [
        {
          "inputs": [],
          "name": "retrieve",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "num",
              "type": "uint256"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      const cAddr = "0x3A45A414bECFfF5ab75ba3B347b3e732d7581a1B"

      const getReadOnlyContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum) //in doc
        const contract = new Contract(cAddr, abi, provider) //in doc
        return contract
      }

      async function getNumber() {
        const contract = getReadOnlyContract()
        const numberOnTract = await contract.retrieve()
        console.log('number from contract: ' + numberOnTract)
      }

      //will require gas
      async function storeNumber() {
        const provider = new ethers.providers.Web3Provider(window.ethereum) //in doc
        const signed = await provider.getSigner() //in doc
        const contract = new Contract(cAddr, abi, signed)
        await contract.store(number)
      }



    
    return(
      <div>
        <div>
          <button onClick={connectWallet}>Connect</button>
          <div>Connected Address: {walletAddress}</div>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
        <div>
          <button onClick={getNumber}>Get Smart Contract Number</button>
          <button onClick={storeNumber}>Store Smart Contract Number</button>
        </div>
        <div>
          <button onClick={decreaseNumber}>Decrease</button>
          <span>Number: {number}</span>
          <button onClick={increaseNumber}>Increase</button>
        </div>
      </div>
    )
  }
 //connect to web3
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