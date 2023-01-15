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
const laptopImgElement = document.getElementById("laptop-img");


let laptops = []; 
let workBalance = 0;
let bankBalance = 0;
let price = 0;

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptops(laptops))

const addLaptops = (laptops) => {
    laptops.forEach(x => addLaptopDropDown(x));
    let imgSrc = "https://hickory-quilled-actress.glitch.me/assets/images/1.png";
    laptopSpecsElement.innerText = laptops[0].specs.join('\n');
    laptopNameElement.innerText = laptops[0].title;
    laptopDescElement.innerText = laptops[0].description;
    laptopPriceElement.innerText = laptops[0].price + " EUR";
    laptopImgElement.src = imgSrc;
}

const addLaptopDropDown = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);

}

const handleLaptopChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    let imgSrc = "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;
    laptopSpecsElement.innerText = selectedLaptop.specs.join('\n');
    laptopNameElement.innerText = selectedLaptop.title;
    laptopDescElement.innerText = selectedLaptop.description;
    laptopPriceElement.innerText = selectedLaptop.price + " EUR";
    laptopImgElement.src = imgSrc;

}

const handleLaptopInfo = e => {

}

laptopsElement.addEventListener("change", handleLaptopChange);

