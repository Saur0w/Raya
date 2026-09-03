"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface PreloaderProps {
    onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const counter = { value: 0 };
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete?.();
            }
        });

        tl.to(counter, {
            value: 84,
            duration: 2.3,
            delay: 0.5,
            ease: "power3.out",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = Math.floor(counter.value).toString().padStart(2, "0");
                }
            }
        })

        tl.to(preloaderRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.1,
            ease: "power4.inOut",
            delay: 0.15
        })

            .set(preloaderRef.current, {
                display: "none"
            })
    }, {
        scope: preloaderRef
    });


    return (
        <section className={styles.preloader} ref={preloaderRef}>
            <div className={styles.left}>
                <h1 ref={counterRef}>00</h1>
            </div>
            <div className={styles.right}>
                <h1>84</h1>
            </div>
        </section>
    )
}