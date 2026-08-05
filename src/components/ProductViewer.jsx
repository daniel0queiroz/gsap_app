import clsx from "clsx";
import useMacbookStore from "../store";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";

import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";
import useTranslation from "../i18n/useTranslation";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ResizeIcon = () => (
  <svg {...iconProps}>
    <path d="M4 14v6h6M20 10V4h-6M20 4l-7 7M4 20l7-7" />
  </svg>
);

const RecolorIcon = () => (
  <svg {...iconProps}>
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.2 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Z" />
    <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="11" cy="7" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const ThemeIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="3.5" />
    <path
      strokeLinecap="round"
      d="M12 3v2M12 19v2M5 5l1.4 1.4M17.6 17.6L19 19M3 12h2M19 12h2M5 19l1.4-1.4M17.6 6.4L19 5"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
    />
  </svg>
);

const ProductViewer = () => {
  const { color, scale, setColor, setScale, screenTheme, setScreenTheme } =
    useMacbookStore();
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isCompact = scale === 0.07;
  const isLight = screenTheme === "light";

  return (
    <section id="product-viewer">
      <div className="intro">
        <p className="eyebrow">{t("productViewer.eyebrow")}</p>
        <h2>{t("productViewer.heading")}</h2>
        <p className="lede">{t("productViewer.intro")}</p>
        <p className="subline">{t("productViewer.subline")}</p>
      </div>

      <div className="stage">
        <Canvas
          id="canvas"
          camera={{ position: [0, 1.4, 7], fov: 40, near: 0.1, far: 100 }}
        >
          <StudioLights />

          <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} />
        </Canvas>

        <div className="capabilities">
          <div className="capability capability-left">
            <div className="capability-header">
              <span className="capability-icon">
                <ResizeIcon />
              </span>
              <div>
                <p className="capability-label">
                  {t("productViewer.capability.resize.label")}
                </p>
                <p className="capability-caption">
                  {t("productViewer.capability.resize.caption")}
                </p>
              </div>
            </div>
            <div className="segmented">
              <div
                className={clsx(
                  "segmented-indicator",
                  !isCompact && "translate-x-full",
                )}
              />
              <button
                onClick={() => setScale(0.07)}
                className={clsx(isCompact && "active")}
                aria-label="Decrease size"
              >
                −
              </button>
              <button
                onClick={() => setScale(0.09)}
                className={clsx(!isCompact && "active")}
                aria-label="Increase size"
              >
                +
              </button>
            </div>
          </div>

          <div className="capability capability-right">
            <div className="capability-header">
              <span className="capability-icon">
                <ThemeIcon />
              </span>
              <div>
                <p className="capability-label">
                  {t("productViewer.capability.theme.label")}
                </p>
                <p className="capability-caption">
                  {t("productViewer.capability.theme.caption")}
                </p>
              </div>
            </div>
            <div className="segmented">
              <div
                className={clsx(
                  "segmented-indicator",
                  isLight && "translate-x-full",
                )}
              />
              <button
                onClick={() => setScreenTheme("dark")}
                className={clsx(!isLight && "active")}
                aria-label="Dark display"
              >
                <MoonIcon />
              </button>
              <button
                onClick={() => setScreenTheme("light")}
                className={clsx(isLight && "active")}
                aria-label="Light display"
              >
                <SunIcon />
              </button>
            </div>
          </div>

          <div className="capability capability-bottom">
            <div className="capability-header">
              <span className="capability-icon">
                <RecolorIcon />
              </span>
              <div>
                <p className="capability-label">
                  {t("productViewer.capability.recolor.label")}
                </p>
                <p className="capability-caption">
                  {t("productViewer.capability.recolor.caption")}
                </p>
              </div>
            </div>
            <div className="swatches">
              <button
                onClick={() => setColor("#adb5bd")}
                className={clsx(
                  "bg-neutral-300",
                  color === "#adb5bd" && "active",
                )}
                aria-label="Space gray finish"
              />
              <button
                onClick={() => setColor("#2e2c2e")}
                className={clsx(
                  "bg-neutral-900",
                  color === "#2e2c2e" && "active",
                )}
                aria-label="Midnight finish"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductViewer;
