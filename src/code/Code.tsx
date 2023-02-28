import "./Code.css";

function Code(props: any) {
  const text = `
  // Initializing Lava Ether.js provider
  const ethProvider = await new LavaEtherProvider({
    chainID: "ETH1",
    privKey: "<PrivKey>",
    pairingListConfig: "pairingList.json",
  });

  // Fetch latest block from Ethereum Mainnet
  // Using etherProvider.getBlockNumber()
  const latestBlock = await ethProvider.getBlockNumber();

  // Return latest block
  return latestBlock;
  `;
  return (
    <div className="Terminal">
      <div className="fakeMenu">
        <div className="fakeButtons fakeClose"></div>
        <div className="fakeButtons fakeMinimize"></div>
        <div className="fakeButtons fakeZoom"></div>
      </div>
      <div
        className="fakeScreen2"
        style={{
          color: "white",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default Code;
