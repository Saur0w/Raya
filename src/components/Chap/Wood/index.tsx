"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Wood() {
    const woodRef = useRef<HTMLElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const imageInnerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const wrapper = woodRef.current?.closest(`[class*="landingWrapper"]`);
            const isPinned = !!wrapper;
            const scroller = woodRef.current?.closest(`[class*="contentWrapper"]`) || undefined;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: isPinned ? wrapper : woodRef.current,
                    scroller: scroller,
                    start: isPinned ? "top top" : "top 75%",
                    end: isPinned ? "+=200%" : "bottom 20%",
                    scrub: isPinned ? 0.5 : false,
                    toggleActions: isPinned ? undefined : "play none none reverse",
                },
            });

            if (isPinned) {
                // When pinned, the sticker peels from bottom-right to top-left
                // So we animate elements in the order they are revealed
                tl.to({}, { duration: 0.1 }) // slight delay for peel to start
                    .from(
                        imageWrapRef.current,
                        {
                            clipPath: "inset(20% 0% 100% 0%)",
                            opacity: 0,
                            duration: 1.2,
                            ease: "power2.out",
                        }
                    )
                    .from(
                        imageInnerRef.current,
                        {
                            scale: 1.15,
                            duration: 1.2,
                            ease: "power2.out",
                        },
                        "<"
                    )
                    .from(
                        [`.${styles.description}`, `.${styles.smallImageWrapper}`],
                        {
                            y: 30,
                            opacity: 0,
                            duration: 0.9,
                            stagger: 0.15,
                            ease: "power3.out",
                        },
                        "-=0.6"
                    )
                    .from(
                        `.${styles.heading} h1`,
                        {
                            y: 40,
                            opacity: 0,
                            duration: 1,
                            ease: "power3.out",
                        },
                        "-=0.6"
                    );
            } else {
                // Standard top-to-bottom reading order when not pinned
                tl.from(`.${styles.heading} h1`, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                })
                    .from(
                        [`.${styles.description}`, `.${styles.smallImageWrapper}`],
                        {
                            y: 30,
                            opacity: 0,
                            duration: 0.9,
                            stagger: 0.15,
                            ease: "power3.out",
                        },
                        "-=0.6"
                    )
                    .from(
                        imageWrapRef.current,
                        {
                            clipPath: "inset(20% 0% 100% 0%)",
                            opacity: 0,
                            duration: 1.2,
                            ease: "power2.out",
                        },
                        "-=0.8"
                    )
                    .from(
                        imageInnerRef.current,
                        {
                            scale: 1.15,
                            duration: 1.2,
                            ease: "power2.out",
                        },
                        "<"
                    );
            }
        },
        { scope: woodRef }
    );

    return (
        <section ref={woodRef} className={styles.wood}>
            <div className={styles.left}>
                <div className={styles.heading}>
                    <h1>
                        Walnut wood, shaped into a single continuous<br className={styles.desktopBr} />
                        curve. No joints. No interruptions. Just form<br className={styles.desktopBr} />
                        following the body.
                    </h1>
                </div>

                <div className={styles.bottomContent}>
                    <p className={styles.description}>
                        The seat is low.
                        <br />
                        The recline is deep.
                        <br />
                        You don&apos;t sit in Raya,
                        <br />
                        you settle into it.
                    </p>
                    <div className={styles.smallImageWrapper}>
                        <Image
                            src="/images/se.jpg"
                            alt="Raya wood detail ambient view"
                            fill
                            sizes="(max-width: 900px) 100vw, 280px"
                            priority
                        />
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.imageWrap} ref={imageWrapRef}>
                    <div className={styles.imageInner} ref={imageInnerRef}>
                        <Image
                            src="/images/wood.jpg"
                            alt="Raya lounge chair"
                            fill
                            sizes="(max-width: 900px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}