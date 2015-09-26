
function Debt(amount, rate, period) {
    var self = this;
    self.amount = ko.observable(amount);
    self.rate = ko.observable(rate);
    self.period = ko.observable(period);
}

function DebtsViewModel() {
    var self = this;

    self.amount = ko.observable(10000);
    self.period = ko.observable(2);
    self.rate = ko.observable(5.5);

    self.dollarDisplay = function(num){
        return  "$" + num.toFixed(2);
    }

    self.payment = ko.computed(function(){
        var interest = self.rate() / 1200;
        var months = self.period() * 12;
        var payment = (self.amount() * interest * Math.pow((1 + interest), months)) / (Math.pow((1 + interest), months) - 1);
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
        self.period(10);
        self.rate(4.29);
    }

    self.mortgageDebtExample = function() {
        self.amount(250000);
        self.period(30);
        self.rate(3.89);
    }
}

ko.applyBindings(new DebtsViewModel());
