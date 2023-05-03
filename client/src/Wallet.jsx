import server from "./server";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  setPublicKey,
  setPrivateKey,
}) {
  const walletInfo = {
    c72c9e4bbd61ecf3e57534783daf958103ca93f4: {
      publicKey:
        "022d4b9613ec99bfaa62d7ed6394033a37c41573f4fd1410f348a12fca781348c3",
      privateKey:
        "bd274fa02b47af61f023637e3f749194093c3d1b4888cdaa20874571bf244203",
    },
    "04dff1d01ce64eb6aab046eb370e3d44ae54acac": {
      publicKey:
        "03c5b8859864f5347509a38451c32b6503a34aa2a3f89f57c55ed8ae371442d14b",
      privateKey:
        "92d0addec32acde6d23ffbcf46ef641d725895fdb5f0d768320b5eb64a036f1d",
    },
    b634120feb8c47fae54bd3016d2990a1279f5cf9: {
      publicKey:
        "03eb7cd6b5bdb694ba5466a62e44c77b7ab8e856f1ec34143bab45788307cbf6a2",
      privateKey:
        "6ebf5eb9d0e6d7edbebc95628723a72de5cb0eb3bc93b6ad761668fb541d14ac",
    },
  };

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);

    if (address) {
      setPublicKey(walletInfo[address].publicKey);
      setPrivateKey(walletInfo[address].privateKey);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <input
          placeholder="Type your eth address"
          value={address}
          onChange={onChange}
        ></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
