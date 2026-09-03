"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Landing from "@/components/Landing";
import Wood from "@/components/chap/Wood";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PageFlip() {
    return (
        <section className={styles.transitionContainer}>
            <div className={styles.woodLayer}>
                <Wood />
            </div>
            <div className={styles.landingLayer}>
                <Landing />
            </div>
        </section>
    )
}