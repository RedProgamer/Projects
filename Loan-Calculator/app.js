document.querySelector('#loan-form').addEventListener('submit', function(e) {
    
    // show loading, hide results
    document.querySelector('#results').style.display = 'none';
    
    document.querySelector('#loading').style.display = 'block';
    setTimeout(calcResult, 1500);

    e.preventDefault();
});

function calcResult() {
    
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');


    const principal = parseFloat(amount.value);
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calcPayment = parseFloat(years.value) * 12;

    // Monthly payments
    const x = Math.pow(1 + calcInterest, calcPayment);
    const monthly = (principal * x * calcInterest) / (x - 1);
    
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calcPayment).toFixed(2);
        totalInterest.value = ((monthly * calcPayment) - principal).toFixed(2);

        document.querySelector('#results').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';

        
    }else {
        showError('Check your numbers');
    }
    
    // e.preventDefault();
}

function showError(errorMsg) {

    document.querySelector('#results').style.display = 'none';
    
    document.querySelector('#loading').style.display = 'none';

    const errorDiv = document.createElement('div');

    // UI elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    errorDiv.className = 'alert alert-danger';
    
    // Append to div
    errorDiv.appendChild(document.createTextNode(errorMsg));

    // Insert Error msg
    card.insertBefore(errorDiv, heading);

    // Clear Error
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}