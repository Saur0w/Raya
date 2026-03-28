"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);
}

interface OutroProps {
    ready?: boolean;
}

export default function Outro({ ready = true }: OutroProps) {
    const sectionRef   = useRef<HTMLElement>(null);
    const textRef      = useRef<HTMLSpanElement>(null);
    const studioRef    = useRef<HTMLSpanElement>(null);
    const creditRef    = useRef<HTMLSpanElement>(null);
    const imgWrap      = useRef<HTMLDivElement>(null);
    const imgInner     = useRef<HTMLDivElement>(null);
    const link1Ref     = useRef<HTMLAnchorElement>(null);
    const link2Ref     = useRef<HTMLAnchorElement>(null);

    useGSAP(() => {
        if (!ready || !textRef.current) return;

        const splitH = new SplitText(textRef.current, {
            type      : "lines, words",
            linesClass: styles.splitLine,
        });

        gsap.set(splitH.words,         { yPercent: 110, opacity: 0 });
        gsap.set(studioRef.current,    { yPercent: 110, opacity: 0 });
        gsap.set(imgWrap.current,      { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(imgInner.current,     { scale: 1.1, opacity: 0 });
        gsap.set(link1Ref.current,     { yPercent: 100, opacity: 0 });
        gsap.set(link2Ref.current,     { yPercent: 100, opacity: 0 });
        gsap.set(creditRef.current,    { opacity: 0, y: 8 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start  : "top 75%",
                once   : true,
            },
        });

        tl
            .to(splitH.words, {
                yPercent : 0,
                opacity  : 1,
                duration : 1.2,
                stagger  : 0.04,
                ease     : "power4.out",
            })

            .to(studioRef.current, {
                yPercent : 0,
                opacity  : 1,
                duration : 0.9,
                ease     : "power4.out",
            }, "-=0.35")

            .to(imgWrap.current, {
                clipPath : "inset(0% 0% 0% 0%)",
                duration : 1.1,
                ease     : "expo.inOut",
            }, 0.3)
            .to(imgInner.current, {
                scale    : 1,
                opacity  : 1,
                duration : 1.6,
                ease     : "power3.out",
            }, 0.3)

            .to(link1Ref.current, {
                yPercent : 0,
                opacity  : 1,
                duration : 0.7,
                ease     : "power3.out",
            }, 0.75)
            .to(link2Ref.current, {
                yPercent : 0,
                opacity  : 1,
                duration : 0.7,
                ease     : "power3.out",
            }, 0.9)

            .to(creditRef.current, {
                opacity  : 1,
                y        : 0,
                duration : 0.55,
                ease     : "power2.out",
            }, 1.0);

        gsap.to(imgInner.current, {
            y    : -18,
            ease : "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start  : "top bottom",
                end    : "bottom top",
                scrub  : 2,
            },
        });

        return () => splitH.revert();

    }, { scope: sectionRef, dependencies: [ready] });

    return (
        <section className={styles.outro} ref={sectionRef}>

            <div className={styles.left}>
                <h2 className={styles.heading}>
                    <span ref={textRef}>
                        Raya is<br />
                        available<br />
                        through<br />
                    </span>

                    <span className={styles.studioWrap}>
                        <span className={styles.studio} ref={studioRef}>
                            Essesi Studio
                        </span>.
                    </span>
                </h2>

                <span className={styles.credit} ref={creditRef}>
                    Made by Frame &amp; Stan
                </span>
            </div>

            <div className={styles.right}>
                <div className={styles.imgWrap} ref={imgWrap}>
                    <div className={styles.imgInner} ref={imgInner}>
                        <Image
                            src="/images/g.jpg"
                            alt="Raya lounge chair"
                            fill
                            sizes="30vw"
                        />
                    </div>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkWrap}>
                        <Link
                            href="/"
                            className={styles.link}
                            ref={link1Ref}
                            target="_blank"
                        >
                            View collection on Love House ↗
                        </Link>
                    </div>
                    <div className={styles.linkWrap}>
                        <Link
                            href="/"
                            ref={link2Ref}
                        >
                            Get in touch ↗
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
}