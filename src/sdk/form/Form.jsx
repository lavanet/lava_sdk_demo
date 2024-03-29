import "./Form.css";
import { Grid, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { LavaSDK } from "@lavanet/lava-sdk";
import Config from "../../config";

function Form(props) {
  const [method, setMethod] = useState("");
  const [param, setParam] = useState([]);
  const [lavaSDK, setLavaSDK] = useState();

  // Init SDK on app start
  useEffect(() => {
    const initSDK = async () => {
      try {
        const sdk = await new LavaSDK({
          privateKey: Config.PRIVATE_KEY,
          chainID: Config.CHAIN_ID,
        });

        setLavaSDK(sdk);
      } catch (err) {
        props.setMessage((m) => [
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
    printRequest(method, param);
    // Clear fields
    setMethod("");
    setParam([]);

    try {
      const response = await lavaSDK.sendRelay({
        method: method,
        params: param,
      });

      // Print response
      printResponse(response);
    } catch (err) {
      props.setMessage((m) => [
        ...m,
        {
          type: "Error",
          message: err.message,
        },
      ]);
    }
  };

  const printResponse = (response) => {
    props.setMessage((m) => [
      ...m,
      {
        type: "Response",
        message: JSON.stringify(response, null, "\t"),
      },
    ]);
  };

  const printRequest = (method, param) => {
    const newRequest =
      '"{"jsonrpc": "2.0", "id": 1, "method": "' +
      method +
      '", "params": [' +
      param +
      "]}";

    props.setMessage((m) => [
      ...m,
      {
        type: "Request",
        message: newRequest,
      },
    ]);
  };

  const clearTerminal = () => {
    props.setMessage([]);
  };

  const handleMethodInputChange = (event) => {
    setMethod(event.target.value);
  };

  const handleParamInputChange = (event) => {
    setParam([event.target.value]);
  };

  return (
    <div className="Form">
      <Grid
        container
        direction="row"
        style={{ height: "170px" }}
        alignContent="space-around"
        justifyContent="space-between"
      >
        <Grid>
          <TextField
            id="outlined-basic"
            label="Method"
            variant="outlined"
            value={method}
            onChange={handleMethodInputChange}
          />
        </Grid>
        <Grid>
          <TextField
            id="outlined-basic"
            label="Param"
            variant="outlined"
            value={param}
            onChange={handleParamInputChange}
          />
        </Grid>
        <Grid>
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
        <Grid>
          <Button
            variant="contained"
            color="error"
            size="large"
            style={{ marginTop: "5px" }}
            onClick={clearTerminal}
          >
            Clear console
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Form;
