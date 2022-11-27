const {
    REACT_APP_LAVA_ENDPOINT,
    REACT_APP_CHAIN_ID,
    REACT_APP_RPC_INTERFACE,
    REACT_APP_PRIVATE_KEY,
  } = process.env;
  
  if (!REACT_APP_LAVA_ENDPOINT) {
    throw Error('REACT_APP_LAVA_ENDPOINT property not found in .env');
  }
  
  if (!REACT_APP_CHAIN_ID) {
    throw Error('REACT_APP_CHAIN_ID property not found in .env');
  }
  
  if (!REACT_APP_RPC_INTERFACE) {
    throw Error('REACT_APP_RPC_INTERFACE property not found in .env');
  }
  
  if (!REACT_APP_PRIVATE_KEY) {
    throw Error('REACT_APP_PRIVATE_KEY property not found in .env');
  }

  export default {
    LAVA_ENDPOINT: REACT_APP_LAVA_ENDPOINT,
    CHAIN_ID: REACT_APP_CHAIN_ID,
    RPC_INTERFACE: REACT_APP_RPC_INTERFACE,
    PRIVATE_KEY: REACT_APP_PRIVATE_KEY,
  };
  