"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

interface LoungeProps {
    ready?: boolean;
}

export default function Aluminum({ ready = true}: LoungeProps) {
    const loungeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const imgMainWrap = useRef<HTMLDivElement>(null);
    const imgMainInner = useRef<HTMLDivElement>(null);
    const imgSmallWrap = useRef<HTMLDivElement>(null);
    const imgSmallInner = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ready) return;

        const splitH = new SplitText(headingRef.current, { type: "chars", charsClass: styles.splitChar });
        const splitP = new SplitText(paraRef.current, { type: "lines", linesClass: styles.splitLine });

        gsap.set(splitH.chars, { yPercent: 110 });
        gsap.set(splitP.lines, { yPercent: 105, opacity: 0 });
        gsap.set([imgMainWrap.current, imgSmallWrap.current], { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(imgMainInner.current, { scale: 1.15 });
        gsap.set(imgSmallInner.current, { scale: 1.2 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: loungeRef.current,
                start: "top 80%",
                once: true
            }
        });

        tl.to(imgMainWrap.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.inOut"
        })
            .to(imgMainInner.current, {
                scale: 1,
                duration: 2.2,
                ease: "power3.out"
            }, 0)

            .to(splitH.chars, {
                yPercent: 0,
                opacity: 1,
                duration: 0.8,
                stagger: {
                    each: 0.028,
                    from: "start",
                },
                ease: "power2.out",
            }, 0.2)
            .to(splitP.lines, {
                yPercent: 0,
                opacity: 1,
                duration: 0.8,
                stagger: {
                    each: 0.03,
                    from: "start",
                },
                ease: "power3.out"
            }, 0.7)

            .to(imgSmallWrap.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.0,
                ease: "expo.inOut"
            }, 0.9)
            .to(imgSmallInner.current, {
                scale: 1,
                duration: 1.5,
                ease: "power3.out"
            }, 0.9);

        gsap.fromTo(imgMainWrap.current,
            { clipPath: "inset(0% 0% 0% 0%)" },
            {
                clipPath : "inset(100% 0% 0% 0%)",
                ease     : "none",
                scrollTrigger: {
                    trigger: loungeRef.current,
                    start  : "top top",
                    end    : "bottom top",
                    scrub  : 1.5,
                },
            }
        );

        return () => {
            splitH.revert();
            splitP.revert();
        };

    }, {
        scope: loungeRef,
        dependencies: [ready]
    });
    return (
        <section className={styles.aluminum} ref={loungeRef}>
            <div className={styles.headingWrap}>
                <h2 className={styles.heading} ref={headingRef}>
                    M-Raya Lounge
                </h2>
            </div>

            <div className={styles.imgMainWrap} ref={imgMainWrap}>
                <div className={styles.imgMainInner} ref={imgMainInner}>
                    <Image
                        src="/images/m.jpg"
                        alt="M-Raya aluminum lounge chair"
                        fill
                        sizes="50vw"
                        priority
                    />
                </div>
            </div>

            <div className={styles.rightCol}>
                <p className={styles.para} ref={paraRef}>
                    Imagine a sleek, polished aluminum surface that<br />
                    catches the light just right. It features the same<br />
                    elegant curve as before, but this time, it boasts a<br />
                    significantly lighter weight, making it easier to<br />
                    handle and more versatile for various<br />
                    applications. This transformation not only<br />
                    enhances its aesthetic appeal but also improves<br />
                    functionality, allowing for innovative uses that <br />
                    were previously unfeasible.
                </p>

                <div className={styles.imgSmallWrap} ref={imgSmallWrap}>
                    <div className={styles.imgSmallInner} ref={imgSmallInner}>
                        <Image
                            src="/images/s.jpg"
                            alt="Aluminum detail — staircase view"
                            fill
                            sizes="24vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}