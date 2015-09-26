
function Debt(amount, rate, period) {
    var self = this;
    self.amount = ko.observable(amount);
    self.rate = ko.observable(rate);
    self.period = ko.observable(period);
}

function DebtsViewModel() {
    var self = this;

    self.amount = ko.observable(10000);
    self.time = ko.observable(24);
    self.rate = ko.observable(5.5);

    self.dollarDisplay = function(num){
        return  "$" + num.toFixed(2);
    }

    self.payment = ko.computed(function(){
        //TO-DO get this function working
        var payment = 69;
        return self.dollarDisplay(payment);
    });

    self.debts = ko.observableArray([
        new Debt(5000, 3.5, 24)
    ]);

    self.addDebt = function() {
        self.debts.push(new Debt(5000, 3.5, 24));
    }

    self.removeDebt = function() {
        self.debts.remove(this);
    }

    self.studentDebtExample = function() {
        self.amount(26490);
        self.time(10);
        self.rate(4.29);
    }

    self.mortgageDebtExample = function() {
        self.amount(250000);
        self.time(30);
        self.rate(3.89);
    }
}

ko.applyBindings(new DebtsViewModel());
