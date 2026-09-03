"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.scss";
import Alum from "./Alum";
import Horizontal from "@/components/chap/Horizontal";
import Matte from "@/components/chap/Matte";
import Lounge from "./Lounge";
import Last from "@/components/chap/News";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Chap() {
    const chapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!chapRef.current || !trackRef.current) {
            return;
        }
    }, { scope: chapRef });
    return (
        <section className={styles.chap} ref={chapRef}>
            <Horizontal />
            <Matte />
            <Lounge />
            <Alum />
            <Last />
        </section>
    )
}