module.exports = {
	locales: ["en", "vi"],
	defaultLocale: "en",
	pages: {
		"*": ["common"],
	},
	loadLocaleFrom: (lang) =>
		import(`./translations/${lang}/common.json`).then((m) => m.default),
};
