var retirementModel = function () {
	var self = this;
	self.linkText401k = ko.observable('Show More');
	self.linkTextIra = ko.observable('Show More');
	self.linkTextInvesting = ko.observable('Show More');

	self.basic401kVisible = ko.observable(false);
	self.basicInvestingVisible = ko.observable(false);
	self.moreInvestingVisible = ko.observable(false);

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
	self.showMoreInvesting = function () {
		self.moreInvestingVisible(!self.moreInvestingVisible());
	}

	/*new Morris.Line({
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
	});*/

	self.compoundInterest = ko.computed(function () {
		var values = [];
		var years = self.numberYears();
		for (var i = 0; i < years - 1; i++) {
			values.push(computeCompoundForYear(i));
		}

		var compoundInterest = computeCompoundForYear(years);
		values.push(compoundInterest);

		self.coumpoundInterestValues(values);

		return compoundInterest.value;
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
};

ko.applyBindings(new retirementModel());