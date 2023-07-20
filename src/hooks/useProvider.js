import { useState } from "react";
import { ethers } from "ethers";

const useProvider = () => {
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState(null);

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


    return { provider, address, handleWalletConnect }
}

export default useProvider;