const laptopsElement = document.getElementById("laptops");
const laptopSpecsElement = document.getElementById("laptop-specs");
const workBalanceElement = document.getElementById("work-balance");
const bankBalanceElement = document.getElementById("bank-balance");
const workButtonElement = document.getElementById("work-btn");
const bankButtonElement = document.getElementById("bank-btn");
const loanButtonElement = document.getElementById("loan-btn");
const repayLoanButtonElement = document.getElementById("repay-loan-btn");
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


// Function for adding the work balance amount to the bank balance 
// should also check for outstanding loan

const handleBankBtn = () => {

    const loanAmount = currentLoanAmount;
    
    if(loanAmount > 0) {
        const payLoan = bankBalance * 0.1;
        bankBalance -= payLoan;
        if(payLoan > loanAmount) {
            bankBalance += (payLoan - loanAmount);
            changeLoanAmount(0);
        } else {
            changeLoanAmount(loanAmount - payLoan);
        }
    }
    

    changeBankBalanceAmount();
    resetWorkBalance();
}


// Changes the loan amount on screen
const changeLoanAmount = newLoanAmount => {
    currentLoanAmount = newLoanAmount;
    changeLoanOnScreen();
    if(currentLoanAmount <= 0) {
        outstandingLoanElement.style.display = "none";
        showRepayLoanButton();
    }
}

// Gets the current loan amount due
const getLoanAmount = () => outstandingLoanElement.innerText = `Current loan amount ${currentLoanAmount.toFixed(2)} €`;

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

    getLoanAmount();
    changeLoanOnScreen();
    
    //outstandingLoanElement.innerText = `Current loan amount: ${parseInt(totalLoan).toFixed(2)} €`
}

const handleRepayLoan = () => {

}


// Function to reset the users work balance amount
const resetWorkBalance = () => {
    workBalance = 0;
    workBalanceElement.innerText = `${workBalance} €`
}
// function to add the loan amount to the users bank balance
const changeBalanceAmount = (totalLoan) => {
   const addLoan = (totalLoan += bankBalance);
   
   bankBalanceElement.innerText = `${addLoan} €`; 

}

// function to change the bankbalance when clicking bank button
const changeBankBalanceAmount = () => {
   let totalBankBalance = (bankBalance += workBalance)
    bankBalanceElement.innerText = `${totalBankBalance} €`
}

const changeLoanOnScreen = () => {
    
    outstandingLoanElement.innerText = `Current loan amount ${currentLoanAmount.toFixed(2)} €`
}


const showRepayLoanButton = () => {
    if(outstandingLoanElement.style.display === "inline") {
        repayLoanButtonElement.style.display = "none";
    } else {
        repayLoanButtonElement.style.display === "inline";
    }
}

// Event listeners for every element
laptopsElement.addEventListener("change", handleLaptopChange);
workButtonElement.addEventListener("click", handleWorkBtn);
bankButtonElement.addEventListener("click", handleBankBtn);
loanButtonElement.addEventListener("click", handleLoan);
