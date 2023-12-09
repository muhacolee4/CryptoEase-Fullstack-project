import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Alert2 from "../components/Alert2";
import { contractAbi, contractAddress } from "../utils/constants";
export const TransactionContext = React.createContext();
const { ethereum } = window;
// creating a contract instance
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const [sendAlert, setSendAlert] = useState(false);
  const [transactionCount, settransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const [currentAccount, setCurrentAccount] = useState("");
  // check if metamask is available

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        //get transcations
        // getAllTransactions()
      }
    } catch (error) {
      console.log(error);
    }
  };
  //send transaction using asyn function
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      if (currentAccount == "") alert("Please connect your wallet!");

      //get form data
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parseAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parseAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parseAmount,
        message,
        keyword
      );
      setisLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setisLoading(false);

      const transactionCount = await transactionContract.getTransactionCount();
      settransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log("No accounts found");
      throw new Error("No ethereum object found");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      console.log(currentAccount);
    } catch (error) {
      console.log(error);
    }
  };
  // disconnect wallet
  const disconnectWallet = async () => {
    try {
      setCurrentAccount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setformData,
        handleChange,
        sendTransaction,
        disconnectWallet,
        sendAlert,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
