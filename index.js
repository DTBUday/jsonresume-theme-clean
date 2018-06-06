var _ = require('underscore');
var utils = require('jsonresume-themeutils');
var pug = require('pug');
var fs = require('fs');
var moment = require('moment');

utils.setConfig({
    date_format: 'YYYY'
});

function render(resume) {
	var css = fs.readFileSync(__dirname + '/assets/css/theme.css', 'utf-8');

	var addressAttrs = ['address', 'city', 'region', 'countryCode', 'postalCode'];
	var addressValues = _(addressAttrs).map(function(key) {
	        return resume.basics.location[key];
	});
	resume.basics.computed_location = _.compact(addressValues).join(', ');

	resume.basics.picture = utils.getUrlForPicture(resume);

	_.each(resume.work, function(exp) {
		if (exp.startDate) {
          exp.startDate = utils.getFormattedDate(exp.startDate);
        }

        if (exp.endDate) {
          exp.endDate = utils.getFormattedDate(exp.endDate);
		}
	});

	_.each(resume.education, function(school) {
		if (school.startDate) {
			school.startDate = utils.getFormattedDate(school.startDate);
		}

		if (school.endDate) {
			school.endDate = utils.getFormattedDate(school.endDate);
		}
	});

	resume.languages.master = [];
	resume.languages.advanced = [];
	resume.languages.intermediate = [];

	_.each(resume.skills, function(skill) { 
		if (skill.level === 'Advanced') {
			_.each(skill.keywords, function(lang) {
				resume.languages.advanced.push(lang);
			}
		}

		if (skill.level === 'Intermediate') {
			_.each(skill.keywords, function(lang) {
				resume.languages.intermediate.push(lang);
			}
		}

		if (skill.level === 'Master') {
			_.each(skill.keywords, function(lang) {
				resume.languages.intermediate.push(lang);
			}
		}
	});

	resume.languages.advance = _.compact(resume.languages.advance).join(', ');
	resume.languages.intermediate = _.compact(resume.languages.intermediate).join(', ');

	_.each(resume.awards, function(award) {
		if (award.date) {
			award.date = utils.getFormattedDate(award.date, "MMM DD");
		}
	});

	return pug.renderFile(__dirname + '/index.pug', {
		resume: resume,
		css: css,
		_: _
	});
}

module.exports = {
	render: render
};
