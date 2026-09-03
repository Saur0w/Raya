"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import Wood from "@/components/Chap/Wood";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

interface LandingProps {
    ready?: boolean;
}

export default function Landing({ ready = true }: LandingProps) {
    const landingRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const imageInnerRef = useRef<HTMLDivElement>(null);

    const bgWrapperRef = useRef<HTMLDivElement>(null);
    const cornerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ready || !headingRef.current || !paraRef.current) return;

        const splitH = new SplitText(headingRef.current, {
            type: "lines, words",
            linesClass: styles.splitLine,
        });

        const splitP = new SplitText(paraRef.current, {
            type: "lines",
            linesClass: styles.splitLine,
        });

        gsap.set(splitH.words, { yPercent: 110, opacity: 0 });
        gsap.set(splitP.lines, { yPercent: 100, opacity: 0 });
        gsap.set(imageWrapRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(imageInnerRef.current, { scale: 1.12 });
        gsap.set([headingRef.current, paraRef.current], { opacity: 1 });

        const introTl = gsap.timeline({ delay: 0.15 });

        introTl
            .to(splitH.words, {
                yPercent: 0,
                opacity: 1,
                duration: 1.0,
                stagger: 0.03,
                ease: "power4.out",
            })
            .to(imageWrapRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.1,
                ease: "expo.inOut",
            }, 0.25)
            .to(imageInnerRef.current, {
                scale: 1,
                duration: 1.6,
                ease: "power3.out",
            }, 0.25)
            .to(splitP.lines, {
                yPercent: 0,
                opacity: 1,
                duration: 0.75,
                stagger: 0.09,
                ease: "power3.out",
            }, 0.55);

        const peelTl = gsap.timeline({
            scrollTrigger: {
                trigger: landingRef.current,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
        });

        peelTl
            .to([bgWrapperRef.current, cornerRef.current], {
                width: "3000px",
                height: "3000px",
                ease: "none",
            }, 0);

        return () => {
            splitH.revert();
            splitP.revert();
        };

    }, {
        scope: landingRef,
        dependencies: [ready],
    });

    return (
        <section className={styles.landingWrapper} ref={landingRef}>
            <div className={styles.frontPage}>
                <div className={styles.left}>
                    <h1 ref={headingRef}>
                        Built for stillness.<br />
                        Designed to last in<br />
                        rooms that mean<br />
                        something.
                    </h1>
                    <p className={styles.para} ref={paraRef}>
                        For when the day finally slows down.<br />
                        When the room gets quiet and everything that<br />
                        mattered stops mattering.
                        Raya was made for<br /> exactly this.
                    </p>
                </div>

                <div className={styles.right}>
                    <div className={styles.imageWrap} ref={imageWrapRef}>
                        <div className={styles.imageInner} ref={imageInnerRef}>
                            <Image
                                src="/images/landing.jpg"
                                alt="Raya lounge chair"
                                fill
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bgWrapper} ref={bgWrapperRef}>
                <div className={styles.bg}>
                    <Wood />
                </div>
            </div>

            <div className={styles.corner} ref={cornerRef} />
        </section>
    );
}