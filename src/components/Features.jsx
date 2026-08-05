import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import { featureLayout, featureSequence } from "../constants/index.js";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useTranslation from "../i18n/useTranslation.js";

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();
  const { t } = useTranslation();

  // Pre-load all feature videos during component mount
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      v.load();
    });
  }, []);

  useGSAP(() => {
    // ONE shared timeline for spin + content, so the reveal pace always
    // matches the actual pinned scroll distance (no more flashing by).
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // Total length of the content sequence below, so the spin can be
    // stretched to match it instead of defaulting to a 0.5s tween.
    const contentDuration = (featureSequence.length - 1) * 1.4 + 0.3 + 1;

    // 3D SPIN — stretched across the whole pinned scroll range, not just
    // GSAP's default 0.5s, so it keeps turning the entire time
    if (groupRef.current) {
      masterTimeline.to(
        groupRef.current.rotation,
        { y: Math.PI * 2, ease: "none", duration: contentDuration },
        0,
      );
    }

    // Content & Texture Sync — each box gets its own evenly-spaced window
    // so there's real time to read before the next one appears
    featureSequence.forEach((feature, index) => {
      const position = index * 1.4 + 0.3;
      masterTimeline
        .call(() => setTexture(feature.videoPath), null, position)
        .to(feature.boxClass, { opacity: 1, y: 0, duration: 1 }, position);
    });
  }, []);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">
              {t("common.loading")}
            </h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  const { t } = useTranslation();
  const featureItems = t("features.items");

  return (
    <section id="features">
      <h2>{t("features.heading")}</h2>

      {/* Pinned as a whole, so the text overlay stays locked to the 3D
          model instead of freezing wherever it was in the tall scroll
          spacer when the pin engages. */}
      <div id="f-canvas">
        <Canvas className="feature-canvas" camera={{}}>
          <StudioLights />
          <ambientLight intensity={0.5} />
          <ModelScroll />
        </Canvas>

        <div className="absolute inset-0">
          {featureLayout.map((feature, index) => (
            <div
              key={feature.id}
              className={clsx("box", `box${index + 1}`, feature.styles)}
            >
              <img src={feature.icon} alt={featureItems[index]?.highlight} />
              <p>
                <span className="text-white">
                  {featureItems[index]?.highlight}
                </span>{" "}
                {featureItems[index]?.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
