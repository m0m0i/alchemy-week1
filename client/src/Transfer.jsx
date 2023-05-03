import { useState } from "react";
import server from "./server";
import { signMessage } from "./crypto";

function Transfer({ address, setBalance, publicKey, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const message = {
        amount: parseInt(sendAmount),
        recipient,
        publicKey,
        sender: address,
      };
      const signature = signMessage(message, privateKey);
      const sigHex = signature.toCompactHex();
      const transaction = { message, sigHex };

      const {
        data: { balance },
      } = await server.post(`send`, transaction);

      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
