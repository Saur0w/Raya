"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

interface LoungeProps {
    ready?: boolean;
}

export default function Lounge({ ready = true }: LoungeProps) {
    return (
        <section className={styles.lounge}>
            <div className={styles.left}>
                <div className={styles.imageWrapper}>
                    <Image src="/images/m.jpg" alt="m" fill />
                </div>
            </div>
        </section>
    )
}