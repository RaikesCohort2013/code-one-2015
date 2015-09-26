var retirementModel = function () {
	var self = this;
	self.linkText401k = ko.observable('Show More');
	self.linkTextIra = ko.observable('Show More');
	self.linkTextInvesting = ko.observable('Show More');

	self.basic401kVisible = ko.observable(false);
	self.basicInvestingVisible = ko.observable(false);

	self.basicIraVisible = ko.observable(false);
	self.moreIraVisible = ko.observable(false);

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
		labels: ['Value', 'Year'],
		lineColors: ['#17ce6c'],
		parseTime: false
	});
};

ko.applyBindings(new retirementModel());