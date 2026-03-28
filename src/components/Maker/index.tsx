"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);
}

interface MakerProps {
    ready?: boolean;
}

export default function Maker({ ready = true }: MakerProps) {
    const sectionRef   = useRef<HTMLElement>(null);
    const imgWrap      = useRef<HTMLDivElement>(null);
    const imgInner     = useRef<HTMLDivElement>(null);
    const wordEssesi   = useRef<HTMLSpanElement>(null);
    const wordStudio   = useRef<HTMLSpanElement>(null);
    const para1Ref     = useRef<HTMLParagraphElement>(null);
    const para2Ref     = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        if (!ready) return;

        const splitP1 = new SplitText(para1Ref.current!, {
            type: "lines",
            linesClass: styles.splitLine,
        });
        const splitP2 = new SplitText(para2Ref.current!, {
            type: "lines",
            linesClass: styles.splitLine,
        });

        gsap.set(imgWrap.current,    { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(imgInner.current,   { scale: 1.06 });
        gsap.set(wordEssesi.current, { yPercent: 110, opacity: 0 });
        gsap.set(wordStudio.current, { yPercent: 110, opacity: 0 });
        gsap.set(splitP1.lines,      { yPercent: 100, opacity: 0 });
        gsap.set(splitP2.lines,      { yPercent: 100, opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start  : "top 78%",
                once   : true,
            },
        });

        tl
            .to(imgWrap.current, {
                clipPath : "inset(0% 0% 0% 0%)",
                duration : 1.3,
                ease     : "expo.inOut",
            })
            .to(imgInner.current, {
                scale    : 1,
                duration : 2.0,
                ease     : "power3.out",
            }, 0)

            .to(wordEssesi.current, {
                yPercent : 0,
                opacity  : 1,
                duration : 0.85,
                ease     : "power4.out",
            }, 0.4)

            .to(wordStudio.current, {
                yPercent : 0,
                opacity  : 1,
                duration : 0.85,
                ease     : "power4.out",
            }, 0.58)

            .to(splitP1.lines, {
                yPercent : 0,
                opacity  : 1,
                duration : 0.8,
                stagger  : 0.06,
                ease     : "power3.out",
            }, 0.35)

            .to(splitP2.lines, {
                yPercent : 0,
                opacity  : 1,
                duration : 0.8,
                stagger  : 0.06,
                ease     : "power3.out",
            }, 0.65);

        return () => {
            splitP1.revert();
            splitP2.revert();
        };

    }, { scope: sectionRef, dependencies: [ready] });

    return (
        <section className={styles.maker} ref={sectionRef}>
            <div className={styles.left}>
                <div className={styles.imgWrap} ref={imgWrap}>
                    <div className={styles.imgInner} ref={imgInner}>
                        <Image
                            src="/images/maker.jpg"
                            alt="Essesi Studio founders"
                            fill
                            sizes="44vw"
                            priority
                        />
                    </div>
                </div>

                <div className={styles.titleBlock}>
                    <div className={styles.titleLineWrap}>
                        <span className={styles.titleWord} ref={wordEssesi}>
                            Essesi
                        </span>
                    </div>
                    <div className={styles.titleLineWrap}>
                        <span className={styles.titleWord} ref={wordStudio}>
                            Studio
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <p className={styles.para} ref={para1Ref}>
                    Alberto Essesi is the founder and designer
                    of Essesi Design Studio, with extensive
                    experience collaborating with leading
                    design and technology companies worldwide.
                    <br /><br />
                    He has led projects and teams focused on
                    shaping the future of physical objects and
                    interfaces. His work includes designing
                    robots, drones, vehicles, architecture,
                    collectible furniture, and objects for
                    Michelin-starred restaurants. His background
                    features roles as a lead designer at Tesla
                    and head of design at Mytra.
                </p>

                <p className={styles.para} ref={para2Ref}>
                    Committed to bridging innovation and consciousness,
                    his approach embodies the idea of connecting
                    sentience to matter, creating intelligent, meaningful
                    objects that blur the boundaries between thought
                    and physicality.
                </p>
            </div>

        </section>
    );
}