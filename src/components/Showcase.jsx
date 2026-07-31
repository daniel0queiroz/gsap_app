import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

function Showcase() {
  const sectionRef = useRef();

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
            <h2>Rocket Chip</h2>
            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo eveniet atque, assumenda itaque repudiandae doloribus
                doloremque maxime tenetur, sit quis, quisquam libero ullam
                voluptatum dolores culpa dolor! Obcaecati, eius ullam.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                totam cumque dignissimos explicabo corrupti fugit laboriosam
                unde id eius deleniti optio facere aperiam quia hic sed ullam
                non culpa laborum.
              </p>
              <p className="text-primary">
                Learn more about Apple Intelligence
              </p>
            </div>
          </div>
          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;
