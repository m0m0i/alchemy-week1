const express = require("express");
const app = express();
const cors = require("cors");
const { verifySignature } = require("./ctypto");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  c72c9e4bbd61ecf3e57534783daf958103ca93f4: 100,
  "04dff1d01ce64eb6aab046eb370e3d44ae54acac": 50,
  b634120feb8c47fae54bd3016d2990a1279f5cf9: 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, sigHex } = req.body;

  const { sender, recipient, publicKey, amount } = message;

  const isSigned = verifySignature(sigHex, message, publicKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (!isSigned) {
    res.status(400).send({ message: "Wrong Signature Detected!" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
