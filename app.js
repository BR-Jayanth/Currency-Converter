const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {
    // populating select with options
    for (code in countryList) {
        let newoption = document.createElement("option");
        newoption.setAttribute("value", code);
        newoption.innerText = code;
        select.appendChild(newoption);
        if (select.name === "from" && code === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newoption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    //  updates flag when select changed
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

const updateExchangeRate = async () => {
    // operation on button click
    let amount = document.querySelector("form input");
    let amountValue = amount.value;
    if (amountValue == 1 || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = rate * amountValue;
    document.querySelector(".msg").innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}
btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();

});
//intial loading
const body=document.querySelector("body");
body.onload= () => {
    updateExchangeRate();
};