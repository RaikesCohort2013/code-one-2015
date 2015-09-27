
function Debt(amount, period, rate) {
    var self = this;
    self.amount = ko.observable(amount);
    self.rate = ko.observable(rate);
    self.period = ko.observable(period);

    self.dollarDisplay = function(num){
        return  "$" + num.toFixed(2);
    };

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
    self.multipleDebtVisible = ko.observable(false);

    self.linkTextStudent = ko.observable(readDescription);
    self.linkTextMortgage = ko.observable(readDescription);
    self.linkTextOther = ko.observable(readDescription);

    self.studentVisible = ko.observable(false);
    self.mortgageVisible = ko.observable(false);
    self.otherVisible = ko.observable(false);

    self.fullAmount = ko.observable(10000);
    self.fullPeriod = ko.observable(2);
    self.fullRate = ko.observable(3.69);
    self.fullPayment = ko.observable(432.87);

    self.amountEnabled = ko.observable(true);
    self.periodEnabled = ko.observable(true);
    self.rateEnabled = ko.observable(true);
    self.paymentEnabled = ko.observable(false);

    self.selectedResult = ko.observable('');
    self.resultOptions = ['Amount', 'Time (Years)', 'Monthly Payment'];

    self.showStudent = function() {
        if(self.studentVisible()){
            self.linkTextStudent(readDescription);
        } else {
            self.linkTextStudent(hideDescription);
        }
        self.studentVisible(!self.studentVisible());
    };
    self.showMortgage = function () {
        if(self.mortgageVisible()){
            self.linkTextMortgage(readDescription);
        } else {
            self.linkTextMortgage(hideDescription);
        }
        self.mortgageVisible(!self.mortgageVisible());
    };
    self.showOther = function () {
        if(self.otherVisible()){
            self.linkTextOther(readDescription);
        } else {
            self.linkTextOther(hideDescription);
        }
        self.otherVisible(!self.otherVisible());
    };

    self.debt = ko.observable(new Debt(10000, 2, 3.69));

    self.debts = ko.observableArray([
        new Debt(5000, 2, 3.5)
    ]);

    self.addDebt = function() {
        self.ykeys.push("Debt" + self.ykeys().length);
        self.debts.push(new Debt(5000, 2, 3.5));
    };

    self.removeDebt = function() {
        self.ykeys.pop();
        self.debts.remove(this);
    };

    self.studentDebtExample = function() {
        changeToFirstTab();
        self.debt(new Debt(26490, 10, 4.29));
    };

    function changeToFirstTab() {
        debtCalc.removeClass("in").removeClass("active");
        debtCalcTab.removeClass("active");
        fullCalc.removeClass("in").removeClass("active");
        fullCalcTab.removeClass("active");
        quickCalcTab.addClass("active");
        quickCalc.addClass("active").addClass("in");
        self.changeTab(0);
    };

    self.mortgageDebtExample = function() {
        changeToFirstTab();
        self.debt(new Debt(250000, 30, 3.89));
    };

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
        return graph;
    });

    self.changeTab = function(tab) {
        self.multipleDebtVisible(tab === 1);
    };

    self.changeResult = function() {
        var selected = self.selectedResult();
        if(selected == 'Amount'){
            self.fullAmount(self.calculateAmount());
            self.amountEnabled(false);
            self.periodEnabled(true);
            self.rateEnabled(true);
            self.paymentEnabled(true);
        } else if (selected == 'Time (Years)'){
            self.fullPeriod(self.calculatePeriod());
            self.amountEnabled(true);
            self.periodEnabled(false);
            self.rateEnabled(true);
            self.paymentEnabled(true);
        } else if (selected == 'Monthly Payment'){
            self.fullPayment(self.calculatePayment());
            self.amountEnabled(true);
            self.periodEnabled(true);
            self.rateEnabled(true);
            self.paymentEnabled(false);
        }
    };

    self.calculateAmount = function(){
        var _time = self.fullPeriod();
        var _payment = self.fullPayment();
        var _rate = self.fullRate() / 1200;
        var _amount = (_payment * (Math.pow((_rate + 1), _time) - 1)) / (_rate * Math.pow((1 + _rate), _time));
        return _amount.toFixed(2);
    };

    self.calculatePeriod = function(){
        var _payment = self.fullPayment();
        var _rate = self.fullRate() / 1200;
        var _amount = self.fullAmount();
        var _pOverAR = _payment / (_rate * _amount);
        var _time = Math.log(_pOverAR / (_pOverAR - 1)) / Math.log(1 + _rate);
        return _time.toFixed(2);
    };

    self.calculatePayment = function(){
        var _time = self.fullPeriod();
        var _rate = self.fullRate() / 1200;
        var _amount = self.fullAmount();
        var _payment = (_amount * _rate * Math.pow((1 + _rate), _time)) / (Math.pow((1 + _rate), _time) - 1);
        return _payment.toFixed(2);
    };

    self.fullPeriod.subscribe(function (oldValue) {
        self.changeResult();
    });

    self.fullAmount.subscribe(function (oldValue) {
        self.changeResult();
    });    

    self.fullRate.subscribe(function (oldValue) {
        self.changeResult();
    });

    self.fullPayment.subscribe(function (oldValue) {
        self.changeResult();
    });
}

var quickCalcTab, quickCalc, fullCalcTab, fullCalc, debtCalc, debtCalcTab;

$(document).ready(function () {
    quickCalcTab = $('#quick-calc-tab');
    quickCalc = $('#quick-calc');
    fullCalc = $('#full-calc');
    fullCalcTab = $('#full-calc-tab');
    debtCalc = $('#debt-calc');
    debtCalcTab = $('#debt-calc-tab');
});

ko.applyBindings(new DebtsViewModel());
