"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MatteProps {
    ready?: boolean;
}

export default function Matter({ ready = true }: MatteProps) {
    return (
        <section className={styles.matte}>

        </section>
    );
}