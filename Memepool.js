// Installation: https://github.com/alchemyplatform/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const {ethers} = require('ethers')
const fs = require('fs')

//input data fuction
var arr = fs.readFileSync('Datafunction.txt').toString(); 

//import data
var inputjson = fs.readFileSync('config.json');
var datajson = JSON.parse(inputjson.toString())
var inputabi = fs.readFileSync('Abi.txt');

//wallet
const address = datajson.Address
const privateKey = datajson.Privatekey
const wallet = new ethers.Wallet(privateKey)
const recived = datajson.Recived

//connect
const provider = new ethers.providers.WebSocketProvider(datajson.Node);
const web3 = createAlchemyWeb3(datajson.Node);
const signer = wallet.connect(provider)

//Router
const routerAddress = datajson.Router
const routerAbi = inputabi.toString()
const routerContract = new ethers.Contract(routerAddress, routerAbi, signer)

//addresses
const WBNB = datajson.WBNB
const link = datajson.Explorer

//wbnb to spend and gas
const spend = ethers.utils.parseEther(datajson.Value)
const gaslimit = datajson.Gaslimit

async function memepool(){
web3.eth.subscribe("alchemy_pendingTransactions").on("data", async(data) => {
    const functiondata = data.input.slice(0,10)
                    if ((arr.includes(functiondata)) === true  && functiondata !== "0x")                                 
                    {
                        // let TokenToBuy = data.to.toString()
                        // let gas = data.gasPrice.toString()
                        // const buy = await routerContract.swapExactETHForTokens(
                        // 0,
                        // [WBNB, TokenToBuy],
                        // recived,
                        // Date.now() + 1000 * 60 * 10,
                        // {
                        // 'value': spend,
                        // 'gasPrice':gas,
                        // 'gasLimit':gaslimit,
                        // })
                        // receipt = await buy.wait()
                        // console.log(link+receipt.transactionHash)
                        const date = new Date();
                        var data = [link+data.hash +' '+ date.toLocaleTimeString()]

                        data.forEach(line => {
                          fs.appendFile('Buy.txt', line + '\n', (err) => {
                            if (err) throw err;
                          });
                        });

                    }

                else
                    {
                        //console.log("FINDING MEME POOL !!!")
                    }

                                                                        });

}
console.log("███████ ██ ███    ██ ██████  ██ ███    ██  ██████       ██████  ███████ ███    ███     ██ ██ ██ ")
console.log("██      ██ ████   ██ ██   ██ ██ ████   ██ ██           ██       ██      ████  ████     ██ ██ ██ ")
console.log("█████   ██ ██ ██  ██ ██   ██ ██ ██ ██  ██ ██   ███     ██   ███ █████   ██ ████ ██     ██ ██ ██ ")
console.log("██      ██ ██  ██ ██ ██   ██ ██ ██  ██ ██ ██    ██     ██    ██ ██      ██  ██  ██              ")
console.log("██      ██ ██   ████ ██████  ██ ██   ████  ██████       ██████  ███████ ██      ██     ██ ██ ██ ")
console.log("                                                                                                ")
memepool()