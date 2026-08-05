import useMacbookStore from "../store";
import { translations } from "./translations";

const useTranslation = () => {
  const language = useMacbookStore((state) => state.language);
  const setLanguage = useMacbookStore((state) => state.setLanguage);

  const t = (path) =>
    path
      .split(".")
      .reduce((value, key) => value?.[key], translations[language]) ?? path;

  return { t, language, setLanguage };
};

export default useTranslation;
