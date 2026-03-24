"use client";

import styles from "./style.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP);

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.leftContainer}>
                <h1 className={styles.heading}>Built for Stillness. <br />Designed to last in rooms that mean something</h1>
                <p>For when the day finally shows down. <br/> When the room gets quite and everything that mattered stops mattering. Raya was made exactly like this.</p>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.imageContainer}>

                </div>
            </div>
        </section>
    )
}