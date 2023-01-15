const laptopsElement = document.getElementById("laptops");
const laptopSpecsElement = document.getElementById("laptop-specs");
const workBalanceElement = document.getElementById("work-balance");
const bankBalanceElement = document.getElementById("bank-balance");
const workButtonElement = document.getElementById("work-btn");
const bankButtonElement = document.getElementById("bank-btn");
const loanButtonElement = document.getElementById("loan-btn");
const buyButtonElement = document.getElementById("buy-btn");
const laptopNameElement = document.getElementById("laptop-name");
const laptopDescElement = document.getElementById("laptop-desc");
const laptopPriceElement = document.getElementById("laptop-price");


let laptops = []; 
let workBalance = 0;
let bankBalance = 0;

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptops(laptops))

const addLaptops = (laptops) => {
    laptops.forEach(x => addLaptopDropDown(x));
    laptopSpecsElement.innerText = laptops[0].specs.join('\n');
}

const addLaptopDropDown = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);

}

const handleLaptopChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    laptopSpecsElement.innerText = selectedLaptop.specs.join('\n');

}

laptopsElement.addEventListener("change", handleLaptopChange);
