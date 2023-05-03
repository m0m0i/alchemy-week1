import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        setPublicKey={setPublicKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        publicKey={publicKey}
        privateKey={privateKey}
      />
    </div>
  );
}

export default App;
