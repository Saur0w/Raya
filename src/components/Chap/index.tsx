"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

interface ChapProps {
    ready?: boolean;
}

export default function Chap({ ready = true }: ChapProps) {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !imagesRef.current.includes(el)) {
            imagesRef.current.push(el);
        }
    };

    useGSAP(() => {
        if (!ready) return;

        if (textRef.current) {
            const split = new SplitText(textRef.current, { type: "lines,words" });

            gsap.from(split.words, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 85%",
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.04,
                ease: "power3.out",
            });
        }

        imagesRef.current.forEach((img) => {
            gsap.fromTo(
                img,
                { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", scale: 1.1 },
                {
                    scrollTrigger: {
                        trigger: img,
                        start: "top 85%",
                    },
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                }
            );
        });
    }, { scope: containerRef, dependencies: [ready] });

    return (
        <section className={styles.chap} ref={containerRef}>
            <div className={styles.left}>
                <div className={styles.imageWrapper} ref={addToRefs}>
                    <Image src="/images/red.jpg" alt="room" fill />
                </div>
                <div className={`${styles.imageWrapper} ${styles.offsetImage}`} ref={addToRefs}>
                    <Image src="/images/brown.jpg" alt="room" fill />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.container1}>
                    <h3 className={styles.para} ref={textRef}>
                        Warm, organic, the Raya<br /> that feels like home.
                    </h3>
                    <div className={styles.imageWrapper} ref={addToRefs}>
                        <Image src="/images/two.png" alt="two" fill />
                    </div>
                </div>
                <div className={styles.imageWrapper2} ref={addToRefs}>
                    <Image src="/images/sesi.jpg" alt="two" fill />
                </div>
            </div>
        </section>
    );
}