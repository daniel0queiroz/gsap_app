import { create } from "zustand";

const getDefaultLanguage = () => {
  const browserLanguage = navigator.language?.slice(0, 2).toLowerCase();
  if (browserLanguage === "pt") return "pt";
  if (browserLanguage === "es") return "es";
  return "en";
};

const useMacbookStore = create((set) => ({
  color: "#2e2c2e",
  setColor: (color) => set({ color }),

  scale: 0.09,
  setScale: (scale) => set({ scale }),

  texture: "/videos/feature-1.mp4",
  setTexture: (texture) => set({ texture }),

  screenTheme: "dark",
  setScreenTheme: (screenTheme) => set({ screenTheme }),

  language: getDefaultLanguage(),
  setLanguage: (language) => set({ language }),

  reset: () =>
    set({
      color: "#2e2c2e",
      scale: 0.09,
      texture: "/videos/feature-1.mp4",
      screenTheme: "dark",
    }),
}));

export default useMacbookStore;
