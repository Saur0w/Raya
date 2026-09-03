"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

interface HudProps {
    ready?: boolean;
}

export default function Hud({ ready = true }: HudProps) {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!ready || !containerRef.current) return;

            const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

            tl.from(`.${styles.paperBorder}`, {
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
            })
                .from(`.${styles.lineHorizontal}`, {
                    scaleX: 0,
                    duration: 1.2,
                    stagger: 0.1,
                }, "-=0.2")
                .from(`.${styles.lineVertical}`, {
                    scaleY: 0,
                    duration: 1.2,
                    stagger: 0.08,
                }, "-=0.8");
        },
        { scope: containerRef, dependencies: [ready] }
    );

    return (
        <section ref={containerRef} className={styles.hud} aria-hidden="true">
            <div className={`${styles.paperBorder} ${styles.top}`} />
            <div className={`${styles.paperBorder} ${styles.bottom}`} />
            <div className={`${styles.paperBorder} ${styles.left}`} />
            <div className={`${styles.paperBorder} ${styles.right}`} />

            <div className={`${styles.lineHorizontal} ${styles.topLeft}`} />
            <div className={`${styles.lineHorizontal} ${styles.topRight}`} />
            <div className={`${styles.lineHorizontal} ${styles.bottomLeft}`} />
            <div className={`${styles.lineHorizontal} ${styles.bottomRight}`} />

            <div className={`${styles.lineVertical} ${styles.outerLeft}`} />
            <div className={`${styles.lineVertical} ${styles.outerRight}`} />
            <div className={`${styles.lineVertical} ${styles.midLeftOuter}`} />
            <div className={`${styles.lineVertical} ${styles.midLeftInner}`} />
            <div className={`${styles.lineVertical} ${styles.midRightInner}`} />
            <div className={`${styles.lineVertical} ${styles.midRightOuter}`} />
        </section>
    );
}