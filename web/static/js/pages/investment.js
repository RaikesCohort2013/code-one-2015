var investmentModel = function() {
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
};

ko.applyBindings(new investmentModel());