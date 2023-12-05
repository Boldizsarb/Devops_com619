i18next.use(i18nextHttpBackend).init({
	lng: "en", // Initial language
	fallbackLng: "en", // Fallback language
	debug: true, // Set to false in production
	backend: {
		loadPath: "/locales/{{lng}}/translation.json",
	},
});

function updateContent() {
	// Ensure that each of these IDs corresponds to an element in your HTML
	const translationKeys = [
		"siteHeadingUpper",
		"siteHeadingLower",
		"navHome",
		"navAbout",
		"navProducts",
		"navStore",
		"navLogin",
		"navSignUp",
		"searchPlaceholder",
		"searchButton",
		"submitReview",
		"recommendButton",
		"copyright",
		"promptPoiName",
		"promptPoiType",
		"promptPoiCountry",
		"promptPoiRegion",
		"promptPoiDesc",
		"alertNoRegion",
		"alertInvalidDetails",
		"alertNotLoggedIn",
		"alertUndefinedError",
		"alertRecommended",
		"alertInvalidReview",
		"alertInvalidID",
		"alertReviewAdded",
		"alertInvalidData",
		"tableHeaderName",
		"tableHeaderType",
		"tableHeaderCountry",
		"tableHeaderRegion",
		"tableHeaderLon",
		"tableHeaderLat",
		"tableHeaderDescription",
		"tableHeaderRec",
	];

	translationKeys.forEach((key) => {
		const element = document.getElementById(key);
		if (element) {
			if (element.tagName === "INPUT" && element.type === "text") {
				element.setAttribute("placeholder", i18next.t(key));
			} else if (element.tagName === "INPUT" && element.type === "submit") {
				element.value = i18next.t(key);
			} else {
				element.textContent = i18next.t(key);
			}
		}
	});
}

function changeLanguage(lng) {
	i18next.changeLanguage(lng, (err) => {
		if (err) {
			console.error("Error changing language:", err);
			return;
		}
		updateContent();
	});
}

window.changeLanguage = changeLanguage; // Make it available globally
