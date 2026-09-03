"use client";

import { useRef } from "react";
import styles from "./style.module.scss";
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export default function Maker() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const firstRef = useRef<HTMLDivElement>(null);
    const secondRef = useRef<HTMLDivElement>(null);
    const thirdRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const splits: SplitText[] = [];

            // Split heading into lines with mask
            if (headingRef.current) {
                const headingSplit = new SplitText(headingRef.current, {
                    type: "lines, words",
                    linesClass: styles.splitLine,
                });
                splits.push(headingSplit);

                gsap.set(headingRef.current, { opacity: 1 });
                gsap.set(headingSplit.words || headingSplit.lines, {
                    yPercent: 120,
                    opacity: 0,
                });
            }

            // Split paragraphs into lines
            const paraEls = [firstRef.current, secondRef.current, thirdRef.current].filter(
                Boolean
            ) as HTMLElement[];
            const paraSplits = paraEls.map((el) => {
                const p = el.querySelector("p");
                if (!p) return null;
                const s = new SplitText(p, {
                    type: "lines",
                    linesClass: styles.splitLine,
                });
                splits.push(s);
                gsap.set(p, { opacity: 1 });
                gsap.set(s.lines, { yPercent: 110, opacity: 0 });
                return s;
            });

            // Image initial state
            if (imageRef.current) {
                gsap.set(imageRef.current, {
                    clipPath: "inset(100% 0% 0% 0%)",
                    opacity: 0,
                });
            }

            // Build reveal timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
            });

            // Heading words reveal
            if (headingRef.current) {
                const headingSplit = splits[0];
                tl.to(
                    headingSplit.words || headingSplit.lines,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.1,
                        stagger: 0.02,
                        ease: "power4.out",
                    },
                    0
                );
            }

            // Image reveal
            if (imageRef.current) {
                tl.to(
                    imageRef.current,
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        opacity: 1,
                        duration: 1.3,
                        ease: "power3.inOut",
                    },
                    0.15
                );
            }

            // Paragraphs staggered reveal
            paraSplits.forEach((s, i) => {
                if (!s) return;
                tl.to(
                    s.lines,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.04,
                        ease: "power3.out",
                    },
                    0.25 + i * 0.15
                );
            });

            return () => {
                splits.forEach((s) => s.revert());
            };
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className={styles.maker}>
            <div className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.imageWrapper} ref={imageRef}>
                        <Image src="/images/maker.jpg" alt="image" fill />
                    </div>
                    <div className={styles.heading}>
                        <h1 ref={headingRef}>Essesi Studio</h1>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.para}>
                        <div className={styles.first} ref={firstRef}>
                            <p>Alberto Essesi is the founder and designer of Essesi Design Studio, with extensive experience collaborating with leading design and technology companies worldwide.</p>
                        </div>
                        <div className={styles.second} ref={secondRef}>
                            <p>He has led projects and teams focused on shaping the future of physical objects and interfaces. His work includes designing robots, drones, vehicles, architecture, collectible furniture, and objects for Michelin-starred restaurants. His background features roles as a lead designer at Tesla and head of design at Mytra.</p>
                        </div>
                        <div className={styles.third} ref={thirdRef}>
                            <p>Committed to bridging innovation and consciousness, his approach embodies the idea of connecting sentience to matter, creating intelligent, meaningful objects that blur the boundaries between thought and physicality.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}