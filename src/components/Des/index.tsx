"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface DesProps {
    ready?: boolean;
}

export default function Des({ ready = true }: DesProps) {
    return (
        <section className={styles.des}>
            Hello world
        </section>
    )
}