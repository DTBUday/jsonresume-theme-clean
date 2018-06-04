function render(resume) {
	var addressAttrs = ['address', 'city', 'region', 'countryCode', 'postalCode'];
	var addressValues = _(addressAttrs).map(function(key) {
	        return resume.basics.location[key];
	});
	resume.basics.computed_location = _.compact(addressValues).join(', ');

	resume.basics.picture = utils.getUrlForPicture(resume);

	return pug.renderFile(__dirname + '/index.pug', {
		resume: resume,
		css: css,
		_: _
	});
}

module.exports = {
	render: render
};
