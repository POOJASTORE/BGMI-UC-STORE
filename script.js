// ===============================
// BGMI UC STORE - SCRIPT.JS
// ===============================

// चुना हुआ पैकेज
let selectedItem = "";
let selectedPrice = "";
let paymentMethod = "";

// तुम्हारा WhatsApp नंबर
const whatsappNumber = "918279207685";

// तुम्हारी UPI ID
const upiID = "8279207685@apl";


// ===============================
// PAGE CHANGE
// ===============================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// BUY UC PACKAGE
// ===============================

function buyPackage(packageName, price) {

    selectedItem = packageName;
    selectedPrice = price;

    const packageBox =
        document.getElementById("selectedPackage");

    if (packageBox) {
        packageBox.innerText =
            "💎 " + packageName + " — " + price;
    }

    showPage("checkout");
}


// ===============================
// BUY BGMI ID
// ===============================

function buyID(accountName, price) {

    selectedItem = accountName;
    selectedPrice = price;

    const packageBox =
        document.getElementById("selectedPackage");

    if (packageBox) {
        packageBox.innerText =
            "🎮 " + accountName + " — " + price;
    }

    showPage("checkout");
}


// ===============================
// PAYMENT METHOD
// ===============================

function selectPayment(method) {

    paymentMethod = method;

    if (method === "UPI") {

        alert(
            "💳 UPI Payment\n\n" +
            "UPI ID: " + upiID +
            "\n\nQR Code जल्द ही यहाँ जोड़ा जाएगा।"
        );

    }

    if (method === "WhatsApp") {

        alert(
            "📲 WhatsApp Order चुना गया है।\n\n" +
            "Confirm Order दबाने के बाद Order WhatsApp पर भेजा जाएगा।"
        );

    }
}


// ===============================
// CONFIRM ORDER
// ===============================

function confirmOrder() {

    const playerID =
        document.getElementById("playerID").value.trim();

    const playerName =
        document.getElementById("playerName").value.trim();


    // Player ID Check
    if (playerID === "") {

        alert("कृपया अपना BGMI Player ID डालें।");

        return;
    }


    // Player Name Check
    if (playerName === "") {

        alert("कृपया अपना Player Name डालें।");

        return;
    }


    // Payment Check
    if (paymentMethod === "") {

        alert("कृपया Payment Method चुनें।");

        return;
    }


    // Order Data
    const order = {

        item: selectedItem,

        price: selectedPrice,

        playerID: playerID,

        playerName: playerName,

        payment: paymentMethod,

        status: "Pending",

        date: new Date().toLocaleString("en-IN")

    };


    // पुराने Orders निकालो
    let orders =
        JSON.parse(
            localStorage.getItem("bgmiOrders")
        ) || [];


    // नया Order जोड़ो
    orders.push(order);


    // Order Save करो
    localStorage.setItem(
        "bgmiOrders",
        JSON.stringify(orders)
    );


    // ===============================
    // WHATSAPP ORDER
    // ===============================

    if (paymentMethod === "WhatsApp") {

        const message =

            "🎮 BGMI UC STORE ORDER\n\n" +

            "📦 Item: " +
            selectedItem + "\n" +

            "💰 Price: " +
            selectedPrice + "\n" +

            "🆔 Player ID: " +
            playerID + "\n" +

            "👤 Player Name: " +
            playerName + "\n" +

            "💳 Payment: WhatsApp\n\n" +

            "⏳ Status: Pending";


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


    // ===============================
    // UPI PAYMENT
    // ===============================

    if (paymentMethod === "UPI") {

        const upiURL =

            "upi://pay?" +

            "pa=" +
            encodeURIComponent(upiID) +

            "&pn=" +
            encodeURIComponent("BGMI UC STORE") +

            "&am=" +
            encodeURIComponent(
                selectedPrice.replace(/[₹,]/g, "")
            ) +

            "&cu=INR" +

            "&tn=" +
            encodeURIComponent(
                selectedItem +
                " - Player ID " +
                playerID
            );


        // UPI App खोलने की कोशिश
        window.location.href = upiURL;

    }


    alert(
        "✅ आपका Order सफलतापूर्वक बन गया!\n\n" +
        "📦 Item: " + selectedItem +
        "\n💰 Price: " + selectedPrice +
        "\n⏳ Status: Pending"
    );


    // Orders Update
    loadOrders();


    // Orders Page
    showPage("orders");

}


// ===============================
// LOAD ORDERS
// ===============================

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


    // कोई Order नहीं
    if (orders.length === 0) {

        orderList.innerHTML =
            '<p class="empty">अभी कोई Order नहीं है।</p>';

        return;

    }


    // Orders दिखाना
    orderList.innerHTML = "";


    // नए Order पहले दिखेंगे
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


            orderCard.innerHTML =

                "<h3>📦 " +
                order.item +
                "</h3>" +

                "<p>💰 Price: " +
                order.price +
                "</p>" +

                "<p>🆔 Player ID: " +
                order.playerID +
                "</p>" +

                "<p>👤 Player Name: " +
                order.playerName +
                "</p>" +

                "<p>💳 Payment: " +
                order.payment +
                "</p>" +

                "<p>📅 Date: " +
                order.date +
                "</p>" +

                "<p>⏳ Status: " +
                order.status +
                "</p>";


            orderList.appendChild(
                orderCard
            );

        });

}


// ===============================
// WHATSAPP SUPPORT
// ===============================

function contactWhatsApp() {

    const message =

        "Hello BGMI UC STORE, " +
        "मुझे Support चाहिए।";


    const url =

        "https://wa.me/" +

        whatsappNumber +

        "?text=" +

        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadOrders();

    }
);
