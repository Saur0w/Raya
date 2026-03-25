"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface HeaderProps {
    showGallery?: boolean;
}

export default function Header({ showGallery = false }: HeaderProps) {
    const headerRef = useRef<HTMLDivElement>(null);

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.left}>
                <Link href="/">Essesi Studio</Link>
            </div>

            <div className={`${styles.center} ${showGallery ? styles.visible : styles.hidden}`}>
                <Link href="/gallery">Gallery</Link>
            </div>

            <div className={styles.right}>
                <Link href="/">Love House <span>&#x2197;</span></Link>
            </div>
        </header>
    );
}