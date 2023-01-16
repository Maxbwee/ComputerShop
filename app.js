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
const outstandingLoanElement = document.getElementById("outstanding-loan");

// Variables used in the project
let laptops = []; 
let workBalance = 0;
let bankBalance = 0;
let price = 0;
let currentLoanAmount = 0;

// Function for fetching all laptops from the API
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptops(laptops))

// Adds information about a single laptop onto the screen. Static data shows the first laptop
// in the list when the user opens the webpage for the first time.
const addLaptops = (laptops) => {
    laptops.forEach(x => addLaptopDropDown(x));
    let imgSrc = "https://hickory-quilled-actress.glitch.me/assets/images/1.png";
    laptopSpecsElement.innerText = laptops[0].specs.join('\n');
    laptopNameElement.innerText = laptops[0].title;
    laptopDescElement.innerText = laptops[0].description;
    laptopPriceElement.innerText = laptops[0].price + " EUR";
    laptopImgElement.src = imgSrc;
}

// Adds a laptop to the select menu
const addLaptopDropDown = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);

}

// Changes the laptop information when the users selects from different choices in the dropdown menu
const handleLaptopChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    let imgSrc = "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;
    laptopSpecsElement.innerText = selectedLaptop.specs.join('\n');
    laptopNameElement.innerText = selectedLaptop.title;
    laptopDescElement.innerText = selectedLaptop.description;
    laptopPriceElement.innerText = selectedLaptop.price + " EUR";
    laptopImgElement.src = imgSrc;

}

// Function for the work button that adds 100 € every time the user clicks the work button
const handleWorkBtn = () => {
 workBalance += 100;

 const workBalanceTotal = workBalance;
 
 workBalanceElement.innerText = `${workBalanceTotal} €`


}


// Function for adding the work amount to the bank balance

const handleBankBtn = () => {

    const bankBalanceTotal = bankBalance;
    const loanAmount = currentLoanAmount;

    if(loanAmount > 0) {
        const payLoan = bankBalanceTotal * 0.1;
        bankBalanceTotal - payLoan;
        if(payLoan > loanAmount) {
            bankBalanceTotal += (payLoan - loanAmount);

        }
    }

    const totalBankBalance = bankBalanceTotal + workBalance;

    bankBalanceElement.innerText = `${totalBankBalance}  €`


    resetWorkBalance();
}


// Function for taking a loan. It should check that you may not take a loan if you already have one
// and it should check that the loan amount is not double the total salary
const handleLoan = () => {

    const totalLoan = prompt("Please enter how much money you would like to loan: ");
    
    if (currentLoanAmount <= 0 && bankBalance * 2 >= totalLoan) {
        currentLoanAmount += totalLoan;
        changeBalanceAmount(totalLoan);
    } else {
        alert("You do not meet the requirements of taking a loan")
    }

    outstandingLoanElement.innerText = `Total loan amount: ${totalLoan} €`
}


// Function to reset the users work balance amount
const resetWorkBalance = () => {
    workBalance = 0;
    workBalanceElement.innerText = `${workBalance} €`
}
// function to add the loan amount to the users bank balance
const changeBalanceAmount = () => {
   const addLoan = totalLoan + bankBalance;
   bankBalanceElement.innerText = `${addLoan} €`; 

}

// Event listeners for every element
laptopsElement.addEventListener("change", handleLaptopChange);
workButtonElement.addEventListener("click", handleWorkBtn);
bankButtonElement.addEventListener("click", handleBankBtn);
loanButtonElement.addEventListener("click", handleLoan);