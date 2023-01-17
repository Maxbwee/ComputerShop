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
// Checks the loan payment by getting the work balance * 0,1. 
// After that adds the 0,1 value to the outstanding loan and the rest to the bank balance
const handleBankBtn = () => {

    const loanAmount = currentLoanAmount;
    
    if(loanAmount > 0) {
        const payLoan = workBalance * 0.1;
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
// If the loan amount reaches 0 by only banking and not pressing RepayLoan button 
// then the Repay Loan button is hidden through this function
const changeLoanAmount = newLoanAmount => {
    currentLoanAmount = newLoanAmount;
    changeLoanOnScreen();
    if(currentLoanAmount <= 0) {
        outstandingLoanElement.style.display = "none";
        repayLoanButtonElement.style.visibility = "hidden";
        
    }
}


// Function for taking a loan. It should check that you may not take a loan if you already have one
// and it should check that the loan amount is not double the total salary

const handleLoan = () => {
    
    let totalLoan = prompt("Please enter how much money you would like to loan: ");
    
    if (currentLoanAmount <= 0 && bankBalance * 2 >= totalLoan) {
        currentLoanAmount += totalLoan;
        updateBankBalance(parseInt(totalLoan));
        console.log(currentLoanAmount);
    } else {
        alert("You do not meet the requirements of taking a loan.")
    }
    
    getLoanAmount(totalLoan);
    showRepayLoanButton();
}


// Gets the current loan amount due
const getLoanAmount = (totalLoan) => outstandingLoanElement.innerText = `Current loan amount ${totalLoan} €`;

// Function that handles the loan payment. If there is any left over it is added to the bank balance
// If the loan amount reaches 0 the Repay Loan button is hidden.
const handleRepayLoan = () => {
    
    
    const leftOver = workBalance - currentLoanAmount;
    
    if(leftOver > 0 ) {
        changeBalanceAmount(leftOver);
        changeLoanAmount(0);
        repayLoanButtonElement.style.visibility = "hidden";
    } 
    else { 
        changeLoanAmount(currentLoanAmount - workBalance);
        
    }
    
    console.log(workBalance);
    console.log(currentLoanAmount);
    resetWorkBalance();
    
}

// Function that should make the repay loan button appear while there is a loan active.
const showRepayLoanButton = () => {
    repayLoanButtonElement.style.visibility = "visible";
}


// Function to buy selected laptops. If the user doesnt have enough money
// The user will be shown an alert message saying they dont have enough money.
// If the user has enough money they will be shown a message that they have bought
// the selected laptopt and money will be deducted from their bank balance

const buyLaptop = () => {
    
    const selectedLaptop = laptops[laptopsElement.selectedIndex];
    const laptopName = selectedLaptop.title;
    const totalPrice = selectedLaptop.price;
    
    if(bankBalance >= totalPrice) {
        alert(`You are now the owner of ${laptopName}`)
        const newBalance = bankBalance -= totalPrice
        changeBalanceAfterBuy(newBalance);
        console.log(newBalance);    
    } else {
        alert(`You do not have enough money! You need to work more`)
    }
    
    
}

// Function to reset the users work balance amount
const resetWorkBalance = () => {
    workBalance = 0;
    workBalanceElement.innerText = `${workBalance} €`
}

const updateBankBalance = (totalLoan) => {
    const loanBank = parseInt(totalLoan += bankBalance);
    bankBalance = loanBank;
    console.log(loanBank);
    console.log(currentLoanAmount);
    bankBalanceElement.innerText = `${loanBank} €`
}
// function to add the loan amount to the users bank balance
const changeBalanceAmount = (leftOver) => {
   const addLoan = (leftOver += bankBalance);
   bankBalanceElement.innerText = `${addLoan} €`; 

}


// function to change the bankbalance when clicking bank button
const changeBankBalanceAmount = () => {
    let totalBankBalance = (bankBalance += workBalance)
    bankBalanceElement.innerText = `${totalBankBalance} €`
}

// function that handles updating the balance after the user has bought the laptop
const changeBalanceAfterBuy = (newBalance) => {

    bankBalanceElement.innerText = `${newBalance} €`
}

// function that should show the current loan amount due on screen.
const changeLoanOnScreen = () => {
    
    outstandingLoanElement.innerText = `Current loan amount ${currentLoanAmount} €`
}

// Event listeners for every element
laptopsElement.addEventListener("change", handleLaptopChange);
workButtonElement.addEventListener("click", handleWorkBtn);
bankButtonElement.addEventListener("click", handleBankBtn);
loanButtonElement.addEventListener("click", handleLoan);
buyButtonElement.addEventListener("click", buyLaptop);
repayLoanButtonElement.addEventListener("click", handleRepayLoan);
