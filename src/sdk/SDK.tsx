// Import from material ui
import { Grid } from "@mui/material";

// Import components
import Header from "../header/Header";
import Terminal from "../terminal/Terminal";
import Form from "./form/Form";

// Other imports
import { useState } from "react";

export interface Message {
  type: string;
  message: number;
}

function App() {
  const [message, setMessage] = useState<Message[]>([]);

  return (
    <div className="App">
      <Grid container direction="column" style={{ height: "100vh" }}>
        <Grid style={{ height: "30%" }}>
          <Header title={"Lava SDK"} />
        </Grid>
        <Grid style={{ height: "20%" }}>
          <Form setMessage={setMessage} message={message} />
        </Grid>
        <Grid style={{ height: "50%" }}>
          <Terminal
            message={message}
            fakeScreen={"fakeScreenSDK"}
            fakeMenuSDK={"fakeMenuSDK"}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
