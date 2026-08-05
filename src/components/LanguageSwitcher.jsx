import clsx from "clsx";
import useTranslation from "../i18n/useTranslation";
import { languageOptions } from "../i18n/translations";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="language-switcher">
      {languageOptions.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={clsx(code === language && "active")}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
