

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
		"Main Page",
		"All Pois (Points of Interest)",
		"Users",
		"Welcome",
		"Logout",
		"LogIn",
		"SignUp",
		"Enter Username",
		"Enter Password",
		"Reset Password",
		"Please enter your details below",
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
		"Sign Up",
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
