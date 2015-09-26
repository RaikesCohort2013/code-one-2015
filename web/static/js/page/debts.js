
function Debt(amount, period, rate) {
    var self = this;
    self.amount = ko.observable(amount);
    self.rate = ko.observable(rate);
    self.period = ko.observable(period);

    self.dollarDisplay = function(num){
        return  "$" + num.toFixed(2);
    }

    self.payment = ko.computed(function(){
        var interest = self.rate() / 1200;
        var months = self.period() * 12;
        var payment = (self.amount() * interest * Math.pow((1 + interest), months)) / (Math.pow((1 + interest), months) - 1);
        return payment;
    });

    self.paymentFormatted = ko.computed(function(){
        return  "$" + self.payment().toFixed(2);
    });

    self.area = ko.computed(function(){
        var graph = [];
        var remaining = self.amount();
        var payment = self.payment();
        var rate = self.rate() / 100;
        var year = 0;
        while(remaining > 0){
            graph.push({ year: year, value: remaining.toFixed(2) });
            remaining = remaining * (1+rate) - payment*12;
            year++;
        }
        return graph;
    });
}

function DebtsViewModel() {
    var self = this;

    self.debt = ko.observable(new Debt(10000, 2, 3.69));

    self.debts = ko.observableArray([
        new Debt(5000, 2, 3.5)
    ]);

    self.addDebt = function() {
        self.debts.push(new Debt(5000, 2, 3.5));
    }

    self.removeDebt = function() {
        self.debts.remove(this);
    }

    self.studentDebtExample = function() {
        self.debt(new Debt(26490, 10, 4.29));
    }

    self.mortgageDebtExample = function() {
        self.debt(new Debt(250000, 30, 3.89));
    }
}

ko.applyBindings(new DebtsViewModel());
