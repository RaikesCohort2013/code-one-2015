

var Investment = function(amount, period, rate){
    var self = this;
    self.amount = ko.observable(amount);
    self.period = ko.observable(period);
    self.rate = ko.observable(rate);

    self.valueAtYear = function(year){
        if(year > self.period()) {
            return null;
        }
        var value = self.amount() * Math.pow((1+self.rate()/100), year);
        return value.toFixed(2);
    }
}


var InvestmentViewModel = function() {
    var self = this;

    self.linkTextStock = ko.observable('Show More');
    self.linkTextBond = ko.observable('Show More');
    self.linkTextCD = ko.observable('Show More');

    self.stocksVisible = ko.observable(false);
    self.bondsVisible = ko.observable(false);
    self.cdsVisible = ko.observable(false);

    self.showStocks = function () {
        if (self.stocksVisible()){
            self.linkTextStock('Show More');
        } else {
            self.linkTextStock('Show Less');
        }
        self.stocksVisible(!self.stocksVisible());
    };

    self.showBonds = function () {
        if (self.bondsVisible()){
            self.linkTextBond('Show More');
        } else {
            self.linkTextBond('Show Less');
        }
        self.bondsVisible(!self.bondsVisible());
    };

    self.showCDs = function () {
        if (self.cdsVisible()){
            self.linkTextCD('Show More');
        } else {
            self.linkTextCD('Show Less');
        }
        self.cdsVisible(!self.cdsVisible());
    };

    self.investments = ko.observableArray([
        new Investment(10000, 10, 9)
    ]);

    self.ykeys = ko.observableArray([0]);

    self.addInvestment = function() {
        self.ykeys.push(self.ykeys().length);
        self.investments.push(new Investment(20000, 10, 9));
    }

    self.removeInvestment = function() {
        if(self.investments().length > 1){
            self.ykeys.pop();
            self.investments.remove(this);
        }
    }

    self.maxYears = ko.computed(function(){
        return _.max(self.investments(), function(investment) {
            return investment.period();
        }).period();
    });

    self.chart = ko.computed(function() {
        var graph = [];
        var investments = self.investments();
        var years = self.maxYears();
        for (var i = 0; i < years; i++) {
            var element = { year: i }
            for (var j = 0; j < investments.length; j++) {
                 element[self.ykeys()[j]] = investments[j].valueAtYear(i);
            };
            graph.push(element);
        };
        return graph;
    });

    self.stockExample = function() {
        self.investments.push(new Investment(15000, 10, 6.9));
        self.ykeys.push(self.ykeys().length);
    }

    self.bondExample = function() {
        self.investments.push(new Investment(15000, 10, 4.9));
        self.ykeys.push(self.ykeys().length);
    }

    self.cdExample = function() {
        self.investments.push(new Investment(15000, 10, 2.9));
        self.ykeys.push(self.ykeys().length);
    }
}


ko.applyBindings(new InvestmentViewModel());
