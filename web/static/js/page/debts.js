
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

    self.principalValues = ko.computed(function(){
        var values = []
        var remaining = +self.amount();
        var payment = self.payment();
        var rate = self.rate() / 100;
        while(remaining > 0){
            values.push(remaining.toFixed(2));
            remaining = remaining * (1+rate) - payment*12;
        }
        return values;
    });

    self.area = ko.computed(function(){
        var graph = [];
        var values = self.principalValues();
        for (var i = 0; i < values.length; i++) {
            graph.push({ year: i, value: values[i] });
        };
        return graph;
    });
}

function DebtsViewModel() {
    var self = this;
    self.quickCalcVisible = ko.observable(true);

    self.debt = ko.observable(new Debt(10000, 2, 3.69));

    self.debts = ko.observableArray([
        new Debt(5000, 2, 3.5)
    ]);

    self.addDebt = function() {
        self.debts.push(new Debt(5000, 2, 3.5));
        self.ykeys.push("Debt" + self.ykeys().length);
    }

    self.removeDebt = function() {
        self.debts.remove(this);
        self.ykeys.remove(ykeys.length-1);
    }

    self.studentDebtExample = function() {
        self.debt(new Debt(26490, 10, 4.29));
    }

    self.mortgageDebtExample = function() {
        self.debt(new Debt(250000, 30, 3.89));
    }

    self.ykeys = ko.observableArray(["Debt0"]);

    self.debtsChart = ko.computed(function(){
        var graph = [];
        var longestArray = _.max(self.debts(), function(debt) {
            return debt.principalValues().length;
        });
        var length = longestArray.principalValues().length;
        for (var i = 0; i < length; i++) {
            var element = {year:i};

            for (var j = 0; j < self.debts().length; j++) {
                var values = self.debts()[j].principalValues();
                if(values.length > i){
                    element["Debt" + j] = values[i];
                } else {
                    element["Debt" + j] = null;
                }
            }
            graph.push(element);
        }
        console.log(graph);
        return graph;
    });

    self.changeGraph = function (tab) {
        if (tab === 0) {
            self.quickCalcVisible(true);
        } else if (tab === 1) {
            self.quickCalcVisible(false);
        }
    };
}

ko.applyBindings(new DebtsViewModel());
