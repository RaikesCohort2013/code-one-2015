
var retirementModel = function () {
	var self = this;
	self.linkText401k = ko.observable(readDescription);
	self.linkTextIra = ko.observable(readDescription);

	self.basic401kVisible = ko.observable(false);

	self.basicIraVisible = ko.observable(false);
	self.moreIraVisible = ko.observable(false);

	self.monthlyAddition = ko.observable(100);
	self.initialInvestment = ko.observable(100);
	self.annualRate = ko.observable(1.0);
	self.numberYears = ko.observable(10);
	self.numberOfTimesCompoundedYearly = ko.observable(1);
	self.coumpoundInterestValues = ko.observableArray([]);

	self.showMoreIra = function () {
		self.moreIraVisible(!self.moreIraVisible());
	};
	self.show401k = function () {
		if (self.basic401kVisible()) {
			self.linkText401k(readDescription);
		} else {
			self.linkText401k(hideDescription);
		}
		self.basic401kVisible(!self.basic401kVisible());
	};
	self.showBasicIra = function () {
		if (self.basicIraVisible()) {
			self.linkTextIra(readDescription);
		} else {
			self.linkTextIra(hideDescription);
		}
		self.basicIraVisible(!self.basicIraVisible());
	};

	self.compoundInterest = ko.computed(function () {
		var values = [];
		var years = self.numberYears();
		for (var i = 0; i <= years; i++) {
			values.push(computeCompoundForYear(i));
		}
		self.coumpoundInterestValues(values);
		return values[values.length-1].value;
	});

	self.compoundInterestFormatted = ko.computed(function(){
		return "$" + self.compoundInterest();
	});

	function computeCompoundForYear(years) {
		if (years > 0) {
			var compoundInterestForPrincipal = self.initialInvestment()
				* Math.pow(
					(1 + (self.annualRate() / 100 / self.numberOfTimesCompoundedYearly())),
					self.numberOfTimesCompoundedYearly() * years
				);

			var futureValueOfASeries = self.monthlyAddition()
				* ((Math.pow(1 + (self.annualRate() / 100 / self.numberOfTimesCompoundedYearly()), self.numberOfTimesCompoundedYearly() * years) - 1)
				/ (self.annualRate() / 100 / self.numberOfTimesCompoundedYearly()));

			var total = compoundInterestForPrincipal + futureValueOfASeries

			return { value: total.toFixed(2), year: years };
		} else {
			return { value: self.initialInvestment(), year: years };
		}
	};

	self.load401kExample = function(){
		self.monthlyAddition(1200);
		self.initialInvestment(0);
		self.annualRate(5.25);
		self.numberYears(40);
		self.numberOfTimesCompoundedYearly(1);
	}

	self.loadIRAExample = function(){
		self.monthlyAddition(1100);
		self.initialInvestment(2000);
		self.annualRate(6.9);
		self.numberYears(40);
		self.numberOfTimesCompoundedYearly(1);
	}
};

ko.applyBindings(new retirementModel());