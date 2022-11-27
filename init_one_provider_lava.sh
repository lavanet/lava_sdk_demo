#!/bin/bash
__dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source $__dir/useful_commands.sh
. ${__dir}/vars/variables.sh
# Making sure old screens are not running
killall screen
screen -wipe
GASPRICE="0.000000001ulava"
lavad tx gov submit-proposal spec-add ./cookbook/spec_add_lava.json,./cookbook/spec_add_ethereum.json,./cookbook/spec_add_osmosis.json,./cookbook/spec_add_fantom.json,./cookbook/spec_add_goerli.json --from alice -y --gas-adjustment "1.5" --gas "auto" --gas-prices $GASPRICE
lavad tx gov vote 1 yes -y --from alice --gas-adjustment "1.5" --gas "auto" --gas-prices $GASPRICE

sleep 4
lavad tx pairing stake-client "LAV1" 200000ulava 1 -y --from user4 --gas-adjustment "1.5" --gas "auto" --gas-prices $GASPRICE

# Lava Providers
lavad tx pairing stake-provider "LAV1" 2010ulava "127.0.0.1:2261,tendermintrpc,1 127.0.0.1:2271,rest,1" 1 -y --from servicer1 --gas-adjustment "1.5" --gas "auto" --gas-prices $GASPRICE

sleep_until_next_epoch

# Lava providers
screen -d -m -S lav1_providers zsh -c "source ~/.zshrc; lavad server 127.0.0.1 2271 $LAVA_REST LAV1 rest --from servicer1 2>&1 | tee $LOGS_DIR/LAV1_2271.log"
screen -S lav1_providers -X screen -t win3 -X zsh -c "source ~/.zshrc; lavad server 127.0.0.1 2261 $LAVA_RPC LAV1 tendermintrpc --from servicer1 2>&1 | tee $LOGS_DIR/LAV1_2261.log"

screen -d -m -S portals zsh -c "source ~/.zshrc; lavad portal_server 127.0.0.1 3340 LAV1 rest --from user4 2>&1 | tee $LOGS_DIR/PORTAL_3340.log"
screen -S portals -X screen -t win17 -X zsh -c "source ~/.zshrc; lavad portal_server 127.0.0.1 3341 LAV1 tendermintrpc --from user4 2>&1 | tee $LOGS_DIR/PORTAL_3341.log"
# echo "lavad portal_server 127.0.0.1 3340 LAV1 rest --from user4"

# Lava Over Lava ETH

# sleep 3 # wait for the portal to start.

# lavad tx pairing stake-client "ETH1" 200000ulava 1 -y --from user1 --node "http://127.0.0.1:3341/1"

# lavad tx pairing stake-provider "ETH1" 2010ulava "127.0.0.1:2221,jsonrpc,1" 1 -y --from servicer1 --node "http://127.0.0.1:3341/1"

# sleep_until_next_epoch

# screen -d -m -S eth1_providers zsh -c "source ~/.zshrc; lavad server 127.0.0.1 2221 $ETH_RPC_WS ETH1 jsonrpc --from servicer1 --node \"http://127.0.0.1:3341/1\" 2>&1 | tee $LOGS_DIR/ETH1_2221.log"

# screen -d -m -S eth1_portals zsh -c "source ~/.zshrc; lavad portal_server 127.0.0.1 3333 ETH1 jsonrpc --from user1 --node \"http://127.0.0.1:3341/1\" 2>&1 | tee $LOGS_DIR/PORTAL_3333.log"

# screen -ls
