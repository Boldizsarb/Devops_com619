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
		"Select-lng",
		"Main Page",
		"All Pois (Points of Interest)",
		"All Pois (Points of Interest)-loggedin",
		"Users",
		"Welcome",
		"Logout",
		"LogIn",
		"login-button",
		"signup-button",
		"alertsDropdown",
		"searchbtn",
		"Search-by-region",
		"nameh3",
		"recomendbut",
		"shareBtn",
		"detePoi",
		"SignUp",
		"Enter Username",
		"Enter Password",
		"Reset Password",
		"verify-button",
		"countdown",
		"Please-enter-your-details below",
		"Please-enter-your-details-below",
		"Username is already taken!",
		"Passwords don't match!",
		"Please fill in all fields",
		"Login error:",
		"An error occurred during logout. Please try again.",
		"Profile",
		"Dev Ops",
		"Error during login:",
		"You have been logged out.",
		"Login",
		"Please check the box if you agree with our",
		"Termsofuse",
		"copyright-info",
		"Swagger API",
		"Monitoring",
		"Apache Licence",
		"cookies-consent-heading",
		"cookies-info",
		"acceptBtn",
		"declineBtn",
		"New Password",
		"Confirm Password",
		"reset-password-button",
		"profile-username",
		"profile-email",
		"profile-level",
		"users-username",
		"users-email",
		"users-level",
		"editUser",
		"deletUser",
		"add-picture",
		"uploadBtn",
		"no",
		"poidetails-input",
		"name",
		"type",
		"country",
		"region",
		"description",
		"submit",
		"poi-type",
		"poi-country",
		"poi-region",
		"poi-lon",
		"poi-lat",
		"poi-description",
		"poi-recommendations",
		"read-terms",
		"accept-terms",
		"agree-terms",
		"u-accounts-login",
		"account-creation",
		"account-security",
		"account-termination",
		"loc-based-services",
		"geoloc",
		"accuracy",
		"u-conduct",
		"u-compliance",
		"prohibited-activ",
		"intellectual-property",
		"ownership",
		"limit-liability",
		"limit-disclaimer",
		"limit-liability-2",
		"change-to-terms",
		"right-to-update",
		"governing-law",
		"terms-governed",
		"contact-us",
		"qa-terms",
		"thank-you",
		"apache-license",
		"terms-con-dist",
		"definitions",
		"licence",
		"licensor",
		"legal-entity",
		"you",
		"source",
		"object",
		"work",
		"der-works",
		"contribution",
		"contributor",
		"grant-copyright",
		"subject-terms",
		"grant-parentlicense",
		"subject-terms-2",
		"accuracy-2",
		"redistribution",
		"reproduce",
		"rep-a",
		"rep-b",
		"rep-c",
		"rep-d",
		"add-copyright-st",
		"sub-contr",
		"unless-1",
		"trademarks",
		"license-no-permission",
		"diclaimer-warranty",
		"applicable-law",
		"limit-liability-1",
		"legal-theory",
		"accept-warranty",
		"redistr",
		"end-terms",
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
