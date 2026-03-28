"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);
}

const services = [
    "Strategy",
    "Industrial Design",
    "UI / UX",
    "Visual 2D, 3D Animation and Renderings",
    "Prototype development",
    "Color, Material, and Finishes",
    "Website Design",
];

const news = [
    "Exhibition at lovehouse gallery in new york",
    "exhibition at Salone del mobile - Milan design week",
    "architecture hunter guest speaker - webinar",
    'designboom publication - "Essesi and Saul Kim Studio Craft Parchment Stool"',
    "IF DESIGN AWARD - mYTRA AUTONOMOUS ROBOTS",
    'Rarify "What happens when a designer from Tesla teams up with a 3D Printing Engineer"',
    'INDUSTRIALKONZEPT PUBLICATION - "Essesi: Exclusive and passionate design by the Esses brothers"',
    'mINIMALISSIMO pUBLICATION - "eSSESI DESIGN, EXCLUSIVE DESIGN"',
    'yANKODESIGN PUBLICATION - "Striking Sheet Metal Stool Creates an Illusion of Soft Fabric"',
    'REDACTED DESIGN pODCAST GUEST SPEAKER - "45: Taters & Teslas with Alberto Essesi – REDACTED"',
    "GUEST LECTURER AT CENTRO UNIVERSITY, MEXICO CITY",
    "guest lecturer at Tecnologico de monterrey university, mexico city",
    "Diseno de contenido / mexico design week",
    "inedito / mexico design week",
    "zona maco / mexico design week",
];

interface ServicesProps {
    ready?: boolean;
}

export default function Services({ ready = true }: ServicesProps) {
    const sectionRef      = useRef<HTMLElement>(null);
    const servLabelRef    = useRef<HTMLSpanElement>(null);
    const newsLabelRef    = useRef<HTMLSpanElement>(null);
    const servListRef     = useRef<HTMLUListElement>(null);
    const newsListRef     = useRef<HTMLUListElement>(null);

    useGSAP(() => {
        if (!ready) return;

        const servItems = servListRef.current?.querySelectorAll("li");
        const newsItems = newsListRef.current?.querySelectorAll("li");

        // ── Initial states ─────────────────────────────────────────────
        gsap.set(servLabelRef.current,  { opacity: 0, x: -10 });
        gsap.set(newsLabelRef.current,  { opacity: 0, x: -10 });
        gsap.set(servItems ?? [],       { yPercent: 100, opacity: 0 });
        gsap.set(newsItems ?? [],       { yPercent: 100, opacity: 0 });

        // ── Labels ─────────────────────────────────────────────────────
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start  : "top 80%",
                once   : true,
            },
        })
            .to(servLabelRef.current, {
                opacity : 1,
                x       : 0,
                duration: 0.6,
                ease    : "power2.out",
            });

        gsap.timeline({
            scrollTrigger: {
                trigger: newsLabelRef.current,
                start  : "top 85%",
                once   : true,
            },
        })
            .to(newsLabelRef.current, {
                opacity : 1,
                x       : 0,
                duration: 0.6,
                ease    : "power2.out",
            });

        // ── Services list — stagger in ─────────────────────────────────
        gsap.timeline({
            scrollTrigger: {
                trigger: servListRef.current,
                start  : "top 82%",
                once   : true,
            },
        })
            .to(servItems ?? [], {
                yPercent : 0,
                opacity  : 1,
                duration : 0.65,
                stagger  : 0.07,
                ease     : "power3.out",
            });

        // ── News list — stagger in, slightly slower ────────────────────
        gsap.timeline({
            scrollTrigger: {
                trigger: newsListRef.current,
                start  : "top 85%",
                once   : true,
            },
        })
            .to(newsItems ?? [], {
                yPercent : 0,
                opacity  : 1,
                duration : 0.55,
                stagger  : 0.045,
                ease     : "power3.out",
            });

    }, { scope: sectionRef, dependencies: [ready] });

    return (
        <section className={styles.services} ref={sectionRef}>
            <div className={styles.left}>
                <span className={styles.label} ref={servLabelRef}>
                    Design Services
                </span>
                <span
                    className={`${styles.label} ${styles.newsLabel}`}
                    ref={newsLabelRef}
                >
                    Recent news:
                </span>
            </div>

            <div className={styles.right}>
                <div className={styles.block}>
                    <ul className={styles.list} ref={servListRef}>
                        {services.map((s) => (
                            <li key={s} className={styles.item}>
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.block}>
                    <ul className={styles.newsList} ref={newsListRef}>
                        {news.map((n) => (
                            <li key={n} className={styles.newsItem}>
                                {n}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </section>
    );
}