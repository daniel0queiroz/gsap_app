import { useEffect, useRef } from "react";
import useTranslation from "../i18n/useTranslation";

const Hero = () => {
  const videoRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 3;
  }, []);

  return (
    <section id="hero">
      <div>
        <h1>Nova3D Studio</h1>
        <p className="tagline">{t("hero.tagline")}</p>
      </div>
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
      ></video>

      <button>{t("hero.cta")}</button>

      <p>{t("hero.price")}</p>
    </section>
  );
};

export default Hero;
