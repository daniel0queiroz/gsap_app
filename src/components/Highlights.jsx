import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useTranslation from "../i18n/useTranslation";

const Highlights = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.to([".left-column", ".right-column"], {
      scrollTrigger: {
        trigger: "#highlights",
        start: isMobile ? "bottom bottom" : "top center",
      },
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="highlights">
      <h2>{t("highlights.heading")}</h2>
      <h3>{t("highlights.subheading")}</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="Laptop" />
            <p>{t("highlights.card1")}</p>
          </div>
          <div>
            <img src="/sun.png" alt="Sun" />
            <p>
              {t("highlights.card2Line1")} <br />
              {t("highlights.card2Line2")} <br />
              {t("highlights.card2Line3")}
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="accent-gradient">
            <img src="/ai.png" alt="AI" />
            <p>
              {t("highlights.card3Prefix")} <br />
              <span>{t("highlights.card3Highlight")}</span>
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="Battery" />
            <p>
              {t("highlights.card4Prefix")}
              <span className="green-gradient">
                {" "}
                {t("highlights.card4Highlight")}{" "}
              </span>
              {t("highlights.card4Mid")}
              <span className="text-dark-100">
                {" "}
                {t("highlights.card4Suffix")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Highlights;
