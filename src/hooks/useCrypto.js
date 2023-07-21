import { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";
import ABI from "../ABI/RollingLoud.json";

const CryptoContext = createContext(null);

export const CryptoProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [address, setAddress] = useState(null);
    const [currency, setCurrency] = useState("ETH");

    useEffect(() => {
        handleContractInit()
    }, [provider])

    const handleContractInit = async () => {
        if(provider != null) {
            const tmpSigner = await provider.getSigner()
            const tmpContract = new ethers.Contract(process.env.REACT_APP_SEPOLIA_ADDRESS, ABI, tmpSigner)
            setContract(tmpContract)
            console.log(tmpContract)
        } else {
            const tmpProvider = new ethers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER)
            const tmpContract = new ethers.Contract(process.env.REACT_APP_SEPOLIA_ADDRESS, ABI, tmpProvider)
            setContract(tmpContract)
        }
    }

    const handleWalletConnect = async () => {
        if(window.ethereum) {
            const tmpAddress = await window.ethereum.request({
                method: "eth_requestAccounts",
                params: []
            });

            const tmpProvider = new ethers.providers.Web3Provider(window.ethereum);
            
            setAddress(tmpAddress[0])
            setProvider(tmpProvider)
        }
    }

    const ticketName = (tokenId) => {
        switch (tokenId.toString()) {
            case "0":
             return "VIP";
            case "1":
              return "Golden Circle";
            case "2":
              return "Regular Front";
            case "3":
              return "Regular Back";
            default:
              return "Regular";
          }
    }

    const fetchPrice = (tokenId) => {
        
    }

    return (
        <CryptoContext.Provider value={{ provider, contract, address, currency, handleWalletConnect, ticketName }}>
          {children}
        </CryptoContext.Provider>
      );
}

const useCrypto = () => {
    return useContext(CryptoContext);
};

export default useCrypto;