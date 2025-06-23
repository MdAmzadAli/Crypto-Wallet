type TxInput = { addresses: string[], output_value: number };
type TxOutput = { addresses: string[], value: number };
type Tx = {
  confirmed: string;
  inputs: TxInput[];
  outputs: TxOutput[];
  confirmations: number;
};

export function parseTransactions(txs: Tx[], walletAddress: string) {
  const parsed = [];

  for (const tx of txs) {
    const sentFrom = tx.inputs.some(inp => inp.addresses.includes(walletAddress));
    const receivedTo = tx.outputs.some(out => out.addresses.includes(walletAddress));
    const success = tx.confirmations > 0;

    let type = "Other";
    if (sentFrom && !receivedTo) type = "SENT";
    else if (!sentFrom && receivedTo) type = "RECEIVED";
    else if (sentFrom && receivedTo) type = "SENT(WITH CHANGE)";

   
    let amount = 0;
    if (type === "SENT" || type === "SENT(WITH CHANGE)") {
      amount = tx.outputs
        .filter(out => !out.addresses.includes(walletAddress))
        .reduce((sum, out) => sum + out.value, 0);
    } else if (type === "RECEIVED") {
      amount = tx.outputs
        .filter(out => out.addresses.includes(walletAddress))
        .reduce((sum, out) => sum + out.value, 0);
    }

    
    const from = [...new Set(tx.inputs.flatMap(i => i.addresses))].filter(a => a !== walletAddress);
    const to = [...new Set(tx.outputs.flatMap(o => o.addresses))].filter(a => a !== walletAddress);

    parsed.push({
      date: tx.confirmed,
      wallet:(from.length > 0 ? from[0] : to.length > 0 ? to[0] : "Unknown"),
      amount: amount / 1e8, 
      result:type,
      success,
    });
  }

  return parsed.reverse();
}
