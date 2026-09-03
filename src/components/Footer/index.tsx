"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

const ArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className={styles.icon}
    >
        <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
    </svg>
);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const watermarkRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const footer = footerRef.current;
            if (!footer) return;

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

            // Watermark
            if (watermarkRef.current) {
                gsap.set(watermarkRef.current, { opacity: 0, y: 15 });
            }

            // Image
            if (imageRef.current) {
                gsap.set(imageRef.current, {
                    clipPath: "inset(100% 0% 0% 0%)",
                    opacity: 0,
                });
            }

            // Links
            const linkEls = linksRef.current
                ? Array.from(linksRef.current.querySelectorAll("a"))
                : [];
            gsap.set(linkEls, { opacity: 0, y: 30 });

            // Build reveal timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footer,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
            });

            // Heading words reveal
            if (headingRef.current && splits[0]) {
                tl.to(
                    splits[0].words || splits[0].lines,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.02,
                        ease: "power4.out",
                    },
                    0
                );
            }

            // Image clip-path reveal
            if (imageRef.current) {
                tl.to(
                    imageRef.current,
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        opacity: 1,
                        duration: 1.3,
                        ease: "power3.inOut",
                    },
                    0.2
                );
            }

            // Links stagger
            tl.to(
                linkEls,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.1,
                    ease: "power3.out",
                },
                0.35
            );

            // Watermark
            if (watermarkRef.current) {
                tl.to(
                    watermarkRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    0.5
                );
            }

            return () => {
                splits.forEach((s) => s.revert());
            };
        },
        { scope: footerRef }
    );

    return (
        <footer ref={footerRef} className={styles.footer}>
            <div className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.heading}>
                        <h1 ref={headingRef}>
                            Raya is
                            <br />
                            available
                            <br />
                            through
                            <br />
                            <span>Essesi Studio</span>.
                        </h1>
                    </div>

                    <div className={styles.watermark} ref={watermarkRef}>
                        <p>Made by Saurow and Frame</p>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.imageWrapper} ref={imageRef}>
                        <Image
                            src="/images/g.jpg"
                            alt="Raya chair preview"
                            fill
                            sizes="(max-width: 768px) 100vw, 220px"
                            className={styles.img}
                        />
                    </div>

                    <div className={styles.links} ref={linksRef}>
                        <Link href="/" className={styles.linkRow}>
                            <span>View Collection On Love House</span>
                            <ArrowIcon />
                        </Link>
                        <Link href="/" className={styles.linkRow}>
                            <span>Get in Touch</span>
                            <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}