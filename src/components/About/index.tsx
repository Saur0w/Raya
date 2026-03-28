"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

interface RoomProps {
    ready?: boolean;
}

export default function Room({ ready = true }: RoomProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    return (
        <section className={styles.rooms} ref={containerRef}>
            <div className={styles.bgWrapper} ref={bgRef}>
                <Image
                    src="/images/h.jpg"
                    alt="Room Background"
                    fill
                    priority
                />
            </div>
        </section>
    );
}