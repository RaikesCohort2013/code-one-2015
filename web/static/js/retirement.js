var retirementModel = function () {
	var self = this;
	self.moreIraVisible = ko.observable(false);

	self.showMoreIra = function () {
		self.moreIraVisible(!self.moreIraVisible());
	};
};

ko.applyBindings(new retirementModel());