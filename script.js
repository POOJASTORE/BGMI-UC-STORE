// ===============================
// BGMI UC STORE - JAVASCRIPT
// ===============================

// चुना हुआ पैकेज
let selectedItem = "";
let selectedPrice = "";
let paymentMethod = "";

// ===============================
// PAGE CHANGE
// ===============================

function showPage(pageId) {

    // सभी पेज छुपाओ
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // चुना हुआ पेज दिखाओ
    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // ऊपर से पेज दिखाओ
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

    document.getElementById("selectedPackage").innerText =
        "💎 " + packageName + " — " + price;

    showPage("checkout");
}


// ===============================
// BUY BGMI ID
// ===============================

function buyID(accountName, price) {

    selectedItem = accountName;
    selectedPrice = price;

    document.getElementById("selectedPackage").innerText =
        "🎮 " + accountName + " — " + price;

    showPage("checkout");
}


// ===============================
// PAYMENT METHOD
// ===============================

function selectPayment(method) {

    paymentMethod = method;

    if (method === "UPI") {

        alert(
            "UPI Payment चुना गया है।\n\n" +
            "अगले स्टेप में यहाँ आपका UPI ID और QR Code जोड़ा जाएगा।"
        );

    }

    if (method === "WhatsApp") {

        alert(
            "WhatsApp Order चुना गया है।\n\n" +
            "Confirm Order दबाने पर WhatsApp पर Order भेजा जाएगा।"
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
        JSON.parse(localStorage.getItem("bgmiOrders")) || [];


    // नया Order जोड़ो
    orders.push(order);


    // Save Order
    localStorage.setItem(
        "bgmiOrders",
        JSON.stringify(orders)
    );


    // WhatsApp Order
    if (paymentMethod === "WhatsApp") {

        const message =
            "🎮 BGMI UC STORE ORDER%0A%0A" +

            "📦 Item: " + selectedItem + "%0A" +

            "💰 Price: " + selectedPrice + "%0A" +

            "🆔 Player ID: " + playerID + "%0A" +

            "👤 Player Name: " + playerName + "%0A" +

            "💳 Payment: WhatsApp%0A%0A" +

            "⏳ Status: Pending";


        // यहाँ अपना WhatsApp नंबर डालना है
        const whatsappNumber = "91XXXXXXXXXX";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            message;


        window.open(
            whatsappURL,
            "_blank"
        );

    }


    alert(
        "✅ आपका Order सफलतापूर्वक बन गया!\n\n" +
        "Status: Pending"
    );


    // Orders दिखाओ
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


    let orders =
        JSON.parse(localStorage.getItem("bgmiOrders")) || [];


    // कोई Order नहीं
    if (orders.length === 0) {

        orderList.innerHTML =
            '<p class="empty">अभी कोई Order नहीं है।</p>';

        return;

    }


    // Orders दिखाना
    orderList.innerHTML = "";


    orders.reverse().forEach(function(order) {

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

    // यहाँ अपना WhatsApp नंबर डालना है
    const whatsappNumber =
        "91XXXXXXXXXX";


    const message =
        "Hello BGMI UC STORE, मुझे Support चाहिए।";


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
