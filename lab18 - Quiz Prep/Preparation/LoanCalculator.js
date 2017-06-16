function LoanCalculator(principal, rate, payments, years) {
    //    "use strict";
    //-- FIELDS --//
    this.principal = principal;
    this.rate = rate;
    this.payments = payments;
    this.years = years;

    //    console.log("principal", this.principal);
    //    console.log("rate", this.rate);
    console.log("payments:", this.payments);
    //    console.log("years", this.years);

    //-- STATIC VARIABLES --//
    var bigN = numberOfPayments();
    console.log("bigN", this.bigN);

    //-- METHODS --//
    this.paymentAmount = fnPaymentAmount;
    this.totalPayment = fnTotalPayment;


    //-- METHODS FUNCTIONS --//
    function fnPaymentAmount() {
        return (this.rate * this.principal) / (1 - Math.pow(1 + this.rate, -bigN));
    };

    function fnTotalPayment() {
        return this.paymentAmount * bigN - this.principal;
    };

    //-- STATIC METHODS --//
    function numberOfPayments() {
        if (this.payments == "monthly")
        return 12 * this.years;
        
        if (this.payments == "bi_weekly")
            return 26 * this.years;
        if (this.payments == "weekly")
            return 52 * this.years;
        return years;
    }
 
}


//P = ( r * A ) / ( 1 - (1+r)^(-N)) 
//Where, 
//P = Payment Amount 
//A = Loan Amount  
//r = Rate of Interest (compounded) 
//N = Number of Payments  

//Rate of Interest Compounded is,
//If Monthly,  r = i / 1200 and N = n * 12 
//If Quarterly,  r = i / 400 and N = n * 4 
//If Half yearly,  r = i / 200 and N = n * 2 
//If Yearly,  r = i / 100 and N = n


//
//The total amount of interest I that will be paid over the lifetime of the loan is the difference of the total payment amount (cN) and the loan principal (P):
//
//I = c * N - P
//
//where 
//c is the fixed monthly payment, 
//N is the number of payments that will be made, and 
//P is the initial principal balance on the loan.
