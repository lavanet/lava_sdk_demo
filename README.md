<h1 align="center"> Lava SDK demo </h1>
<h3 align="center"> Firs Dapp which uses Lava SDK for dAccess </h1>

## Demo:


https://user-images.githubusercontent.com/42786413/204141279-1118577e-4b2e-4dd5-9c5c-0a8052be75cd.mp4

## Want to try it locally?

After all this is just an demo, so it takes a bit of tweaking to get this up and running 

### Prerequisites
1. [Docker](https://docs.docker.com/engine/install/ubuntu/) installed locally
2. [Node version 16.](https://github.com/nvm-sh/nvm) installed locally

### Installation
1. clone the directory. 
    
    ```bash
    git clone git@github.com:lavanet/lava_sdk_demo.git
    ```

2. Install dependencies

    ```bash
    yarn install
    ```

3. Start the proxy

    ```bash
    # Clone lava sdk
    git clone git@github com:lavanet/lava-sdk.git

    # Go to lava-sdk folder
    cd lava-sdk

    # Build envoy proxy image
    docker build -t envoy:v1 .

    # Run envoy proxy image
    docker run -d --name envoy -p 9901:9901 -p 8081:8081 envoy:v1
    ```

4. Start lava network + provider

    ```bash
    # Clone lava
    git clone git@github.com:lavanet/lava.git

    # Go to lava folder
    cd lava

    # Run network
    ignite chain serve -v -r 2>&1 | grep -e lava_ -e ERR_ -e STARPORT] -e !

    # Init chain commands
    # Copy init_one_provider_lava.sh in lava/scripts
    ./scripts/init_one_provider_lava.sh
    ```

4. Get staked account

    ```bash
    # Fetch private key for staked user
    lavad keys export user4 --unsafe --unarmored-hex

    # Copy private key in the:
    # lava-sdk-demo/.env
    ```

5. Start an app

    ```bash
    # Go to lava-sdk-demo folder
    cd lava-sdk-demo

    # start an app
    yarn start
    ```
5. Send request

    ```bash
    # In the method field enter:
    status

    # Press send request button
    ```


### Congratulations you have successfully installed lava-sdk-demo 

The SDK is still a work in progress, so the process of using the SDK will be even simpler

For example, users will not have to set up a proxy, but will be able to communicate with providers directly