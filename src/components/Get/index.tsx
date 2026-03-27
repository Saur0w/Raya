"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";

interface GetProps {
    ready?: boolean;
}
export default function Get({ ready = true }: GetProps) {
    return (
        <footer className={styles.foot}>

        </footer>
    )
}