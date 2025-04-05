import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Languages } from "lucide-react";

export default function LanguageSwitch({
  variant = "default",
}: {
  variant?: "default" | "compact" | "icon-only";
}) {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  // Determine which language will be switched to
  const targetLanguage = language === "en" ? "ar" : "en";
  const targetLanguageName = language === "en" ? "العربية" : "English";

  // Different styling based on variant
  const getButtonClasses = () => {
    const baseClasses =
      "flex items-center justify-center transition-colors z-50";

    switch (variant) {
      case "compact":
        return `${baseClasses} gap-1 px-2 py-1 rounded-full bg-[#233054] text-white hover:bg-[#1a2440] shadow-md fixed bottom-4 right-4 md:static md:rounded-lg`;
      case "icon-only":
        return `${baseClasses} w-10 h-10 rounded-full bg-[#233054] text-white hover:bg-[#1a2440] shadow-md fixed bottom-4 right-4 md:static`;
      default:
        return `${baseClasses} gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 bg-white md:bg-transparent shadow-md md:shadow-none fixed bottom-4 right-4 md:static`;
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className={getButtonClasses()}
      aria-label={`Switch to ${targetLanguageName}`}
    >
      <Languages className={variant === "icon-only" ? "h-5 w-5" : "h-5 w-5"} />
      {variant !== "icon-only" && (
        <span
          className={`font-medium ${variant === "compact" ? "text-xs" : "text-sm"}`}
        >
          {variant === "compact"
            ? targetLanguage.toUpperCase()
            : targetLanguageName}
        </span>
      )}
    </button>
  );
}
