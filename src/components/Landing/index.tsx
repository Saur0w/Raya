"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP);

interface LandingProps {
    ready?: boolean;
}

export default function Landing({ ready = false }: LandingProps) {
    const landingRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ready) return;

    }, {
        scope: landingRef
    });
    return (
        <section className={styles.landing} ref={landingRef}>

        </section>
    )
}