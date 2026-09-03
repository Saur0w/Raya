"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Horizontal() {
    const parentRef = useRef<HTMLElement | null>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const body = bodyRef.current;
        const parent = parentRef.current;
        if (!body || !parent) return;




    }, {
        scope: parentRef
    });

    return (
        <section className={styles.cards} ref={parentRef}>
            <div className={styles.body} ref={bodyRef}>
                <div className={styles.left}>
                    <div className={styles.topImageWrapper}>
                        <Image src="/images/red.jpg" alt="red" fill />
                    </div>
                    <div className={styles.bottomImageWrapper}>
                        <Image src="/images/brown.jpg" alt="brown" fill />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.topText}>
                        <div className={styles.heading}>
                            <h1>Warm, organic, the Raya that feels like home.</h1>
                        </div>
                        <div className={styles.imageWrapper}>
                            <Image src="/images/two.png" alt="Two" fill />
                        </div>
                    </div>
                    <div className={styles.bottomImage}>
                        <Image src="/images/sesi.jpg" alt="Image" fill />
                    </div>
                </div>
            </div>
        </section>
    );
}