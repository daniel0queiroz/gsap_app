import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import useTranslation from "../i18n/useTranslation";

function Showcase() {
  const sectionRef = useRef();
  const { t } = useTranslation();

  useGSAP(
    () => {
      gsap.to(".content", {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    },
    { scope: sectionRef },
  );

  const isTablet = useMediaQuery({ query: "(max-width: 1034px" });

  useGSAP(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to(".mask img", {
          transform: "scale(1.1)",
        })
        .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      <div className="media">
        <video src="/videos/game.mp4" loop muted autoPlay playsInline />
        <div className="mask">
          <img src="/mask-logo.svg" alt="" />
        </div>
      </div>
      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>{t("showcase.heading")}</h2>
            <div className="space-y-5 mt-7 pe-10">
              <p>
                {t("showcase.p1Prefix")}
                <span className="text-white">
                  {t("showcase.p1Highlight")}
                </span>
                {t("showcase.p1Suffix")}
              </p>
              <p>{t("showcase.p2")}</p>
              <p>{t("showcase.p3")}</p>
              <p className="text-primary">{t("showcase.cta")}</p>
            </div>
          </div>
          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>{t("showcase.upTo")}</p>
              <h3>{t("showcase.stat1Value")}</h3>
              <p>{t("showcase.stat1Label")}</p>
            </div>
            <div className="space-y-2">
              <p>{t("showcase.upTo")}</p>
              <h3>{t("showcase.stat2Value")}</h3>
              <p>{t("showcase.stat2Label")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;
