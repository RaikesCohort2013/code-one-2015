
function Debt(amount, rate, period) {
    var self = this;
    self.amount = ko.observable(amount);
    self.rate = ko.observable(rate);
    self.period = ko.observable(period);
}

function DebtsViewModel() {
    var self = this;

    self.amount = ko.observable(10000);
    self.period = ko.observable(24);
    self.rate = ko.observable(5.5);

    self.dollarDisplay = function(num){
        return  "$" + num.toFixed(2);
    }

    self.payment = ko.computed(function(){
        var interest = self.rate() / 100;
        var payment = (self.amount() * interest * Math.pow((1 + interest), self.period())) / (Math.pow((1 + interest), self.period()) - 1);
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
}

ko.applyBindings(new DebtsViewModel());
