// Import from material ui
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
// Import components
import Header from "../header/Header";
import Terminal from "../terminal/Terminal";
import Code from "../code/Code";
import Form from "../form/Form";
import Config from "../config";
//import { JsonRpcProvider } from "ethers";
import { LavaSDK } from "lava-sdk";

// Import css
import "./App.css";

// Other imports
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState([]);

  const [EtherSDK, setEtherSDK] = useState();

  const [loaded, setLoaded] = useState();

  // Init SDK on app start
  useEffect(() => {
    const initSDK = async () => {
      try {
        //let url = Config.ETHER_ENDPOINT;
        //let ethersProvider = new JsonRpcProvider(url);
        const ethersProvider = await new LavaSDK({
          privateKey: Config.PRIVATE_KEY,
          chainID: Config.CHAIN_ID,
        });

        setLoaded("Finish loading");

        setEtherSDK(ethersProvider);
      } catch (err) {
        console.log(err);
      }
    };

    initSDK().catch(console.error);
  }, []);

  // Send relays
  const sendRequest = async () => {
    // Print request
    printRequest("eth_blockNumber", []);
    try {
      console.log(EtherSDK);
      const blockNumber = await EtherSDK.sendRelay({
        method: "eth_blockNumber",
        params: [],
      });

      // Print response
      printResponse(blockNumber);
    } catch (err) {
      console.log(err);
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
          <Header />
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
            <Terminal message={message} loaded={loaded} />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
