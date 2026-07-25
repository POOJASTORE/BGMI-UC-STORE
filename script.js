// ==========================================
// BGMI UC STORE - SCRIPT.JS
// ==========================================

// STORE DETAILS
const whatsappNumber = "918279207685";
const upiID = "8279207685@apl";

let selectedItem = "";
let selectedPrice = "";
let selectedAccount = "";


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo(0, 0);

    loadOrders();
    updateWalletDisplay();
}


// ==========================================
// UC PACKAGE SELECT
// ==========================================

function buyPackage(packageName, price) {

    selectedItem = packageName;
    selectedPrice = price;

    const selectedPackage =
        document.getElementById("selectedPackage");

    if (selectedPackage) {

        selectedPackage.innerText =
            "💎 " + packageName + " — " + price;

    }

    showPage("checkout");
}


// ==========================================
// BGMI ACCOUNT SELECT
// ==========================================

function buyID(accountName, price) {

    selectedAccount = accountName;
    selectedPrice = price;

    const selectedAccountBox =
        document.getElementById("selectedAccount");

    if (selectedAccountBox) {

        selectedAccountBox.innerText =
            "🎮 " + accountName + " — " + price;

    }

    showPage("accountPayment");
}


// ==========================================
// UPI PAYMENT
// ==========================================

function openUPIPayment(amount, note) {

    let cleanAmount = String(amount)
        .replace(/[₹,]/g, "")
        .trim();

    const upiLink =
        "upi://pay?" +
        "pa=" + encodeURIComponent(upiID) +
        "&pn=" + encodeURIComponent("BGMI UC STORE") +
        "&am=" + encodeURIComponent(cleanAmount) +
        "&cu=INR" +
        "&tn=" + encodeURIComponent(note);

    window.location.href = upiLink;
}


// ==========================================
// UC - PAY NOW
// ==========================================

function payForUC() {

    const playerID =
        document.getElementById("playerID").value.trim();

    const playerName =
        document.getElementById("playerName").value.trim();


    if (selectedItem === "") {

        alert("कृपया पहले UC Package चुनें।");

        return;
    }


    if (playerID === "") {

        alert("कृपया अपना BGMI Player ID डालें।");

        return;
    }


    if (playerName === "") {

        alert("कृपया अपना Player Name डालें।");

        return;
    }


    const order = {

        type: "UC",

        item: selectedItem,

        price: selectedPrice,

        playerID: playerID,

        playerName: playerName,

        status: "Payment Pending",

        date: new Date().toLocaleString("en-IN")

    };


    saveOrder(order);


    openUPIPayment(

        selectedPrice,

        selectedItem +
        " - Player ID " +
        playerID

    );

}


// ==========================================
// UC - WHATSAPP ORDER
// ==========================================

function sendUCWhatsApp() {

    const playerID =
        document.getElementById("playerID").value.trim();

    const playerName =
        document.getElementById("playerName").value.trim();


    if (selectedItem === "") {

        alert("कृपया पहले UC Package चुनें।");

        return;
    }


    if (playerID === "") {

        alert("कृपया अपना BGMI Player ID डालें।");

        return;
    }


    if (playerName === "") {

        alert("कृपया अपना Player Name डालें।");

        return;
    }


    const message =

        "🎮 BGMI UC STORE ORDER\n\n" +

        "💎 Package: " +
        selectedItem +
        "\n" +

        "💰 Price: " +
        selectedPrice +
        "\n" +

        "🆔 Player ID: " +
        playerID +
        "\n" +

        "👤 Player Name: " +
        playerName +
        "\n\n" +

        "⏳ Status: Payment Pending";


    const whatsappURL =

        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ==========================================
// BGMI ACCOUNT - PAY NOW
// ==========================================

function payForAccount() {

    if (selectedAccount === "") {

        alert("कृपया पहले BGMI Account चुनें।");

        return;
    }


    const order = {

        type: "BGMI Account",

        item: selectedAccount,

        price: selectedPrice,

        status: "Payment Pending",

        date: new Date().toLocaleString("en-IN")

    };


    saveOrder(order);


    openUPIPayment(

        selectedPrice,

        selectedAccount + " Purchase"

    );

}


// ==========================================
// BGMI ACCOUNT - WHATSAPP
// ==========================================

function sendAccountWhatsApp() {

    if (selectedAccount === "") {

        alert("पहले BGMI Account चुनें।");

        return;
    }


    const message =

        "🎮 BGMI ACCOUNT ORDER\n\n" +

        "📦 Account: " +
        selectedAccount +
        "\n" +

        "💰 Price: " +
        selectedPrice +
        "\n\n" +

        "💳 Payment: UPI\n" +

        "⏳ Status: Payment Pending\n\n" +

        "कृपया Payment Screenshot भेजें।";


    const whatsappURL =

        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ==========================================
// SAVE ORDER
// ==========================================

function saveOrder(order) {

    let orders =

        JSON.parse(
            localStorage.getItem("bgmiOrders")
        ) || [];


    orders.push(order);


    localStorage.setItem(

        "bgmiOrders",

        JSON.stringify(orders)

    );


    loadOrders();

}


// ==========================================
// LOAD ORDERS
// ==========================================

function loadOrders() {

    const orderList =
        document.getElementById("orderList");


    if (!orderList) {
        return;
    }


    let orders =

        JSON.parse(
            localStorage.getItem("bgmiOrders")
        ) || [];


    if (orders.length === 0) {

        orderList.innerHTML =
            '<p class="empty">अभी कोई Order नहीं है।</p>';

        return;
    }


    orderList.innerHTML = "";


    orders
        .slice()
        .reverse()
        .forEach(function(order) {


            const orderCard =
                document.createElement("div");


            orderCard.style.background =
                "#211330";

            orderCard.style.padding =
                "15px";

            orderCard.style.marginBottom =
                "12px";

            orderCard.style.borderRadius =
                "12px";


            let details = "";


            if (order.type === "UC") {

                details =

                    "<p>🆔 Player ID: " +
                    order.playerID +
                    "</p>" +

                    "<p>👤 Player Name: " +
                    order.playerName +
                    "</p>";

            }


            orderCard.innerHTML =

                "<h3>📦 " +
                order.item +
                "</h3>" +

                "<p>💰 Price: " +
                order.price +
                "</p>" +

                details +

                "<p>⏳ Status: " +
                order.status +
                "</p>" +

                "<p>📅 Date: " +
                order.date +
                "</p>";


            orderList.appendChild(
                orderCard
            );

        });

}


// ==========================================
// GET WALLET BALANCE
// ==========================================

function getWalletBalance() {

    return Number(

        localStorage.getItem(
            "walletBalance"
        )

    ) || 0;

}


// ==========================================
// UPDATE WALLET DISPLAY
// ==========================================

function updateWalletDisplay() {

    const balance =
        getWalletBalance();


    const profileBalance =
        document.getElementById(
            "profileWalletBalance"
        );


    const walletBalance =
        document.getElementById(
            "walletBalance"
        );


    if (profileBalance) {

        profileBalance.innerText =
            "₹" +
            balance.toLocaleString("en-IN");

    }


    if (walletBalance) {

        walletBalance.innerText =
            "₹" +
            balance.toLocaleString("en-IN");

    }

}


// ==========================================
// ADD MONEY TO WALLET
// ==========================================

function addMoneyToWallet() {

    const amountInput =
        document.getElementById(
            "walletAmount"
        );


    const amount =
        Number(amountInput.value);


    if (!amount || amount <= 0) {

        alert(
            "कृपया सही Amount डालें।"
        );

        return;
    }


    const pendingPayment = {

        amount: amount,

        status: "Payment Pending",

        date: new Date().toLocaleString("en-IN")

    };


    localStorage.setItem(

        "pendingWalletPayment",

        JSON.stringify(
            pendingPayment
        )

    );


    openUPIPayment(

        "₹" +
        amount.toLocaleString("en-IN"),

        "Wallet Add Money"

    );

}


// ==========================================
// WHATSAPP SUPPORT
// ==========================================

function contactWhatsApp() {

    const message =

        "Hello BGMI UC STORE,\n" +
        "मुझे Support चाहिए।";


    const whatsappURL =

        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    function() {

        loadOrders();

        updateWalletDisplay();

    }

);
