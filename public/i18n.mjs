import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
	.use(Backend) // loads translations from the server
	.use(LanguageDetector) // detect user language
	.use(initReactI18next) // pass the i18n instance to react-i18next
	.init({
		lng: "ar", // initial language
		fallbackLng: "en", // fallback language
		debug: true,
		react: {
			useSuspense: true,
		},
	});

export default i18n;
