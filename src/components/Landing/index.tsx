"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';
import Image from "next/image";
import Wood from "@/components/Chap/Wood";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

export default function Landing() {
    return (
        <section className={styles.landing}>
            <h1>Raya</h1>
        </section>
    )
}