"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export default function Alum() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const headingAtHomeRef = useRef<HTMLHeadingElement>(null);
    const imageTopRef = useRef<HTMLDivElement>(null);
    const headingThatTreatRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const headingInRoomsRef = useRef<HTMLHeadingElement>(null);
    const imageRedRef = useRef<HTMLDivElement>(null);
    const headingObjectsRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            // 1. Text splits with line masking
            const headings = [
                headingAtHomeRef.current,
                headingInRoomsRef.current,
                headingThatTreatRef.current,
                headingObjectsRef.current,
            ].filter(Boolean) as HTMLElement[];

            const splits = headings.map((el) => {
                return new SplitText(el, {
                    type: "lines, words",
                    linesClass: styles.splitLine,
                });
            });

            const descSplit = descriptionRef.current
                ? new SplitText(descriptionRef.current, {
                    type: "lines",
                    linesClass: styles.splitLine,
                })
                : null;

            const headingWords = splits.flatMap((s) => s.words || s.lines);
            const descLines = descSplit?.lines || [];

            // Set initial visibility
            gsap.set(headings, { opacity: 1 });
            gsap.set(headingWords, { yPercent: 120, opacity: 0 });
            if (descriptionRef.current) gsap.set(descriptionRef.current, { opacity: 1 });
            gsap.set(descLines, { yPercent: 120, opacity: 0 });

            if (bgRef.current) {
                gsap.set(bgRef.current, { scale: 1.1, transformOrigin: "50% 50%" });
            }

            // 2. Editorial Reveal when section enters viewport
            const revealTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                },
            });

            revealTl
                .to(
                    headingWords,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.1,
                        stagger: 0.015,
                        ease: "power4.out",
                    },
                    0
                )
                .to(
                    descLines,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.0,
                        stagger: 0.04,
                        ease: "power3.out",
                    },
                    0.15
                )
                .from(
                    imageTopRef.current,
                    {
                        scale: 0.9,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.out",
                    },
                    0.1
                )
                .from(
                    imageRedRef.current,
                    {
                        scale: 0.9,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.out",
                    },
                    0.2
                );

            // 3. Fluid Parallax Scrub (differential floating depth)
            const scrubTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                },
            });

            // Background depth
            if (bgRef.current) {
                scrubTl.fromTo(
                    bgRef.current,
                    { yPercent: -5, scale: 1.08 },
                    { yPercent: 5, scale: 1.15, ease: "none" },
                    0
                );
            }

            // Foreground images float with distinct speeds
            if (imageTopRef.current) {
                scrubTl.fromTo(
                    imageTopRef.current,
                    { y: -35, rotate: -1 },
                    { y: 35, rotate: 1, ease: "none" },
                    0
                );
            }

            if (imageRedRef.current) {
                scrubTl.fromTo(
                    imageRedRef.current,
                    { y: -50, rotate: 1 },
                    { y: 50, rotate: -1, ease: "none" },
                    0
                );
            }

            // Subtle float on headings and description (no clipping)
            if (headingAtHomeRef.current) {
                scrubTl.fromTo(headingAtHomeRef.current, { y: 0 }, { y: 15, ease: "none" }, 0);
            }
            if (headingInRoomsRef.current) {
                scrubTl.fromTo(headingInRoomsRef.current, { y: 0 }, { y: 18, ease: "none" }, 0);
            }
            if (headingThatTreatRef.current) {
                scrubTl.fromTo(headingThatTreatRef.current, { y: -12 }, { y: 12, ease: "none" }, 0);
            }
            if (headingObjectsRef.current) {
                scrubTl.fromTo(headingObjectsRef.current, { y: -18 }, { y: 18, ease: "none" }, 0);
            }
            if (descriptionRef.current) {
                scrubTl.fromTo(descriptionRef.current, { y: -8 }, { y: 8, ease: "none" }, 0);
            }

            return () => {
                splits.forEach((s) => s.revert());
                descSplit?.revert();
            };
        },
        { scope: sectionRef }
    );

    return (
        <section className={styles.alum} ref={sectionRef}>
            <div className={styles.bgImg} ref={bgRef}>
                <Image
                    src="/images/h.jpg"
                    alt="Architectural background"
                    fill
                    priority
                    className={styles.img}
                />
            </div>
            <div className={styles.bgOverlay} />

            <div className={styles.body}>
                <div className={styles.left}>
                    <h1 className={styles.headingAtHome} ref={headingAtHomeRef}>
                        At home
                    </h1>

                    <div className={styles.imageTop} ref={imageTopRef}>
                        <Image
                            src="/images/t.jpg"
                            alt="Sculptural chair on white backdrop"
                            fill
                            sizes="(max-width: 1200px) 25vw, 300px"
                            className={styles.img}
                        />
                    </div>

                    <h2 className={styles.headingThatTreat} ref={headingThatTreatRef}>
                        that treat
                    </h2>

                    <p className={styles.description} ref={descriptionRef}>
                        Crafted specifically for interiors that have a unique story to
                        tell, our designs bring character and charm to every space. Each
                        element is thoughtfully curated to create an atmosphere that
                        resonates with your personal style.
                    </p>
                </div>

                <div className={styles.right}>
                    <h2 className={styles.headingInRooms} ref={headingInRoomsRef}>
                        in rooms
                    </h2>

                    <div className={styles.imageRed} ref={imageRedRef}>
                        <Image
                            src="/images/o.jpg"
                            alt="Lounge chair in crimson room"
                            fill
                            sizes="(max-width: 1200px) 25vw, 290px"
                            className={styles.img}
                        />
                    </div>

                    <h1 className={styles.headingObjects} ref={headingObjectsRef}>
                        objects
                        <br />
                        as art.
                    </h1>
                </div>
            </div>
        </section>
    );
}