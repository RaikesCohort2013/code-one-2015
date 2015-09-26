var retirementModel = function () {
	var self = this;
	self.linkText401k = ko.observable('Show More');
	self.linkTextIra = ko.observable('Show More');
	self.linkTextInvesting = ko.observable('Show More');

	self.basic401kVisible = ko.observable(false);
	self.basicInvestingVisible = ko.observable(false);

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
			self.linkText401k('Show More');
		} else {
			self.linkText401k('Show Less');
		}
		self.basic401kVisible(!self.basic401kVisible());
	};
	self.showBasicIra = function () {
		if (self.basicIraVisible()) {
			self.linkTextIra('Show More');
		} else {
			self.linkTextIra('Show Less');
		}
		self.basicIraVisible(!self.basicIraVisible());
	};
	self.showBasicInvesting = function () {
		if (self.basicInvestingVisible()) {
			self.linkTextInvesting('Show More');
		} else {
			self.linkTextInvesting('Show Less');
		}
		self.basicInvestingVisible(!self.basicInvestingVisible());
	};

	new Morris.Line({
		element: 'savingsChart',

		data: [
			{ year: '0', value: 0 },
		    { year: '5', value: 28754 },
		    { year: '15', value: 125645 },
		    { year: '25', value: 316245 },
		    { year: '35', value: 691184 }
		],
	  
		xkey: 'year',
		xLabels: ["year"],
		ykeys: ['value'],
		labels: ['Value'],
		lineColors: ['#17ce6c'],
		parseTime: false
	});

	self.compoundInterest = ko.computed(function () {
		var values = [];
		if (years >= 1) values.push(computeCompoundForYear(1))
		if (years >= 5) values.push(computeCompoundForYear(5));
		if (years >= 10) values.push(computeCompoundForYear(10));
		if (years >= 20) values.push(computeCompoundForYear(20));
		if (years >= 50) values.push(computeCompoundForYear(50));

		var compoundInterest = computeCompoundForYear(self.numberYears());
		if (years != 1 && years != 5 && years != 10 && years != 20 && years != 50) values.push(compoundInterest);

		return compoundInterest;
	});

	function computeCompoundForYear(years) {
		var compoundInterestForPrincipal = self.initialInvestment()
			* Math.pow(
				(1 + (self.annualRate() / 100 / self.numberOfTimesCompoundedYearly())),
				self.numberOfTimesCompoundedYearly() * years
			);

		var futureValueOfASeries = self.monthlyAddition()
			* ((Math.pow(1 + (self.annualRate() / 100 / self.numberOfTimesCompoundedYearly()), self.numberOfTimesCompoundedYearly() * years) - 1)
			/ (self.annualRate() / 100 / self.numberOfTimesCompoundedYearly()));

		return compoundInterestForPrincipal + futureValueOfASeries;
	};
};

ko.applyBindings(new retirementModel());