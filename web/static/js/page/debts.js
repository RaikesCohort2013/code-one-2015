
function Debt(amount, rate, period) {
    var self = this;
    self.amount = ko.observable(amount);
    self.rate = ko.observable(rate);
    self.period = ko.observable(period);
}

function DebtsViewModel() {
    var self = this;

    self.debts = ko.observableArray([
        { amount: 0, rate: 0.0, period: 0 }
    ]);

    self.addDebt = function() {
        self.debts.push(new Debt(0, 0.0, 0));
    }

    self.removeDebt = function() {
        self.debts.remove(this);
    }
}

ko.applyBindings(new DebtsViewModel());
