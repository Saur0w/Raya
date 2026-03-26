"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface DesProps {
    ready?: boolean;
}

export default function Des({ ready = true }: DesProps) {
    const sectionRef    = useRef<HTMLElement>(null);
    const headingRef    = useRef<HTMLHeadingElement>(null);
    const paraRef       = useRef<HTMLParagraphElement>(null);
    const imgMainWrap   = useRef<HTMLDivElement>(null);
    const imgMainInner  = useRef<HTMLDivElement>(null);
    const imgSmallWrap  = useRef<HTMLDivElement>(null);
    const imgSmallInner = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ready || !headingRef.current || !paraRef.current) return;

        const splitH = new SplitText(headingRef.current, {
            type      : "lines, words",
            linesClass: styles.splitLine,
        });
        const splitP = new SplitText(paraRef.current, {
            type      : "lines",
            linesClass: styles.splitLine,
        });

        gsap.set(splitH.words,          { yPercent: 105, opacity: 0 });
        gsap.set(splitP.lines,          { yPercent: 100, opacity: 0 });
        gsap.set(imgMainWrap.current,   { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(imgMainInner.current,  { scale: 1.08 });
        gsap.set(imgSmallWrap.current,  { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(imgSmallInner.current, { scale: 1.1 });

        gsap.timeline({
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }).to(splitH.words, {
            yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.022, ease: "power4.out",
        });

        gsap.timeline({
            scrollTrigger: { trigger: imgMainWrap.current, start: "top 82%", once: true },
        })
            .to(imgMainWrap.current,  { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" })
            .to(imgMainInner.current, { scale: 1, duration: 2.0, ease: "power3.out" }, 0);

        gsap.timeline({
            scrollTrigger: { trigger: paraRef.current, start: "top 88%", once: true },
        }).to(splitP.lines, {
            yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        });

        gsap.timeline({
            scrollTrigger: { trigger: imgSmallWrap.current, start: "top 90%", once: true },
        })
            .to(imgSmallWrap.current,  { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "expo.inOut" })
            .to(imgSmallInner.current, { scale: 1, duration: 1.5, ease: "power3.out" }, 0);

        return () => { splitH.revert(); splitP.revert(); };

    }, { scope: sectionRef, dependencies: [ready] });

    return (
        <section className={styles.des} ref={sectionRef}>
            <div className={styles.left}>
                <h2 className={styles.heading} ref={headingRef}>
                    Walnut wood, shaped into a single continuous<br />
                    curve. No joints. No interruptions. <br />Just form
                    following the body.
                </h2>

                <div className={styles.bottom}>
                    <p className={styles.para} ref={paraRef}>
                        The seat is low.<br />
                        The recline is deep.<br />
                        You don&#39;t sit in Raya,<br />
                        you settle into it.
                    </p>

                    <div className={styles.imgSmallWrap} ref={imgSmallWrap}>
                        <div className={styles.imgSmallInner} ref={imgSmallInner}>
                            <Image
                                src="/images/se.jpg"
                                alt="Raya in room"
                                fill
                                sizes="22vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.right}>
                <div className={styles.imgMainWrap} ref={imgMainWrap}>
                    <div className={styles.imgMainInner} ref={imgMainInner}>
                        <Image
                            src="/images/wal.jpg"
                            alt="Raya — walnut curve"
                            fill
                            sizes="40vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}