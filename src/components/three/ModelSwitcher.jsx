import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 0.6;

function ModelSwitcher({ scale }) {
  const groupRef = useRef();
  const isFirstRun = useRef(true);

  useGSAP(() => {
    if (!groupRef.current) return;

    if (isFirstRun.current) {
      groupRef.current.scale.setScalar(scale);
      isFirstRun.current = false;
      return;
    }

    gsap.to(groupRef.current.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: ANIMATION_DURATION,
      ease: "power2.out",
    });
  }, [scale]);

  const controlsConfig = {
    speed: 1,
    zoom: 1,
    polar: [-0.05, 0.22],
    azimuth: [-Math.PI / 3, Math.PI / 3],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <PresentationControls {...controlsConfig}>
      <group ref={groupRef}>
        <MacbookModel16 />
      </group>
    </PresentationControls>
  );
}

export default ModelSwitcher;
