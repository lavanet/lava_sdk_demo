// Import from material ui
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
// Import components
import Header from "../header/Header";
import Terminal from "../terminal/Terminal";
import Code from "../code/Code";
import Config from "../config";
import { LavaEthersProvider } from "@lavanet/lava-sdk-providers";

// Import css
import "./Ethers.css";

// Other imports
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState([]);

  const [EtherSDK, setEtherSDK] = useState();

  // Init SDK on app start
  useEffect(() => {
    const initSDK = async () => {
      try {
        const etherSDK = await new LavaEthersProvider({
          privKey: Config.PRIVATE_KEY,
          chainID: Config.CHAIN_ID,
        });

        setEtherSDK(etherSDK);
      } catch (err) {
        setMessage((m) => [
          ...m,
          {
            type: "Error",
            message: err.message,
          },
        ]);
      }
    };

    initSDK().catch(console.error);
  }, []);

  // Send relays
  const sendRequest = async () => {
    // Print request
    printRequest("eth_blockNumber", []);
    try {
      const blockNumber = await EtherSDK.getBlockNumber();

      // Print response
      printResponse(blockNumber);
    } catch (err) {
      setMessage((m) => [
        ...m,
        {
          type: "Error",
          message: err.message,
        },
      ]);
    }
  };

  const printRequest = (method, param) => {
    const newRequest =
      '"{"jsonrpc": "2.0", "id": 1, "method": "' +
      method +
      '", "params": [' +
      param +
      "]}";

    setMessage((m) => [
      ...m,
      {
        type: "Request",
        message: newRequest,
      },
    ]);
  };

  const printResponse = (response) => {
    setMessage((m) => [
      ...m,
      {
        type: "Response",
        message: JSON.stringify(response, null, "\t"),
      },
    ]);
  };

  return (
    <div className="App">
      <Grid container direction="column" style={{ height: "100vh" }}>
        <Grid style={{ height: "30%" }}>
          <Header title={"Lava SDK & Ether.js"} />
        </Grid>
        <Grid style={{ height: "10%", margin: "0 auto", paddingTop: "30px" }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            style={{ marginTop: "5px" }}
            onClick={sendRequest}
          >
            Send Request
          </Button>
        </Grid>
        <Grid container style={{ height: "60%" }} direction="row">
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Code message={message} />
          </Grid>
          <Grid item xs={5}>
            <Terminal
              message={message}
              fakeScreen={"fakeScreenEthers"}
              fakeMenuSDK={"fakeMenuEthers"}
            />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
