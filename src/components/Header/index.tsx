"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import PerspectiveText from "@/ui/PerspectiveText";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

interface HeaderProps {
    ready?: boolean;
}

export default function Header({ ready = true }: HeaderProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ready || !overlayRef.current) return;

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline.to(overlayRef.current, {
            opacity: 1,
            duration: 0.3,
        });

        timeline.from(
            overlayRef.current.querySelectorAll(`.${styles.revealInner}`),
            {
                yPercent: 100,
                duration: 0.9,
                stagger: 0.08,
            },
            "-=0.1"
        );

        const splitTargets = overlayRef.current.querySelectorAll(`.${styles.splitTarget}`);
        if (splitTargets.length > 0) {
            const split = new SplitText(splitTargets, {
                type: "lines, chars",
                linesClass: styles.line,
                charsClass: styles.char,
            });

            timeline.from(
                split.chars,
                {
                    yPercent: 100,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.02,
                },
                "<0.1"
            );

            return () => split.revert();
        }
    }, { scope: overlayRef, dependencies: [ready] });

    return (
        <div className={styles.frameOverlay} ref={overlayRef}>
            <header className={styles.header}>
                <div className={styles.body}>
                    <div className={styles.logo}>
                        <h1>
                            <Link href="/">
                                <span className={styles.revealMask}>
                                    <span className={styles.revealInner}>
                                        <PerspectiveText label="Essesi Studio" />
                                    </span>
                                </span>
                            </Link>
                        </h1>
                    </div>

                    <div className={styles.tag}>
                        <Link href="/">
                            <div className={styles.tagContent}>
                                <span className={styles.revealMask}>
                                    <span className={styles.revealInner}>
                                        <PerspectiveText label="Love House" />
                                    </span>
                                </span>
                                <span className={styles.revealMask}>
                                    <span className={`${styles.revealInner} ${styles.icon}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                            <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/>
                                        </svg>
                                    </span>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            <footer className={styles.footer}>
                <div className={styles.body}>
                    <div className={styles.heading}>
                        <PerspectiveText label="Cover" />
                    </div>
                    <div className={styles.scroll}>
                        <PerspectiveText label="Scroll Down" />
                    </div>
                </div>
            </footer>
        </div>
    );
}