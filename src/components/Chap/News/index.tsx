"use client";

import { useRef } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
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
    "Diseño de contenido / mexico design week",
    "inedito / mexico design week",
    "zona maco / mexico design week",
];

export default function Last() {
    const sectionRef = useRef<HTMLElement>(null);
    const servicesLabelRef = useRef<HTMLParagraphElement>(null);
    const newsLabelRef = useRef<HTMLParagraphElement>(null);
    const servicesListRef = useRef<HTMLUListElement>(null);
    const newsListRef = useRef<HTMLUListElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            // Set initial hidden state for labels
            const labels = [servicesLabelRef.current, newsLabelRef.current].filter(
                Boolean
            ) as HTMLElement[];
            gsap.set(labels, { opacity: 0, y: 20 });

            // Set initial hidden state for list items
            const serviceItems = servicesListRef.current
                ? Array.from(servicesListRef.current.querySelectorAll("li"))
                : [];
            const newsItems = newsListRef.current
                ? Array.from(newsListRef.current.querySelectorAll("li"))
                : [];

            gsap.set([...serviceItems, ...newsItems], {
                opacity: 0,
                y: 24,
            });

            // Services section reveal
            const servicesTl = gsap.timeline({
                scrollTrigger: {
                    trigger: servicesListRef.current || section,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            servicesTl
                .to(servicesLabelRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, 0)
                .to(serviceItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.06,
                    ease: "power3.out",
                }, 0.1);

            // News section reveal
            const newsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: newsListRef.current || section,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            newsTl
                .to(newsLabelRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, 0)
                .to(newsItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.04,
                    ease: "power3.out",
                }, 0.1);
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className={styles.last}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.leftCol}>
                        <p ref={servicesLabelRef} className={styles.servicesLabel}>Design Services</p>
                    </div>
                    <div className={styles.rightCol}>
                        <ul ref={servicesListRef} className={styles.list}>
                            {services.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.leftCol}>
                        <p ref={newsLabelRef} className={styles.newsLabel}>Recent news:</p>
                    </div>
                    <div className={styles.rightCol}>
                        <ul ref={newsListRef} className={styles.list}>
                            {news.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}