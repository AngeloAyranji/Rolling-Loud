import { useState } from "react";
import { ethers } from "ethers";

const useCrypto = () => {
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState(null);
    const [currency, setCurrency] = useState("ETH");

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
        switch (tokenId) {
            case "1":
             return "VIP";
            case "2":
              return "Golden Circle";
            case "3":
              return "Regular Front";
            default:
              return "Regular";
          }
    }


    return { provider, address, currency, handleWalletConnect, ticketName }
}

export default useCrypto;