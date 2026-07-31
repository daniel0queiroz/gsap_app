import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel14 from "../models/Macbook-14";
import MacbookModel16 from "../models/Macbook-16";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const moveGroup = (group, x) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

function ModelSwitcher({ scale, isMobile }) {
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  const smallMackbookRef = useRef();
  const largeMackbookRef = useRef();

  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMackbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMackbookRef.current, 0);

      fadeMeshes(smallMackbookRef.current, 0);
      fadeMeshes(largeMackbookRef.current, 1);
    } else {
      moveGroup(smallMackbookRef.current, 0);
      moveGroup(largeMackbookRef.current, OFFSET_DISTANCE);

      fadeMeshes(smallMackbookRef.current, 1);
      fadeMeshes(largeMackbookRef.current, 0);
    }
  }, [scale]);

  const controlsConfig = {
    speed: 1,
    zoom: 1,
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMackbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
      <PresentationControls {...controlsConfig}>
        <group ref={smallMackbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
}

export default ModelSwitcher;
