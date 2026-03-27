"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import { useState, useEffect, useRef } from "react";
import Preloader from "@/components/Preloader";
import Des from "@/components/Des";
import Lenis from "lenis";
import Grid from "@/components/Grid";
import Chap from "@/components/Chap";
import Matter from "@/components/Matte";
import Lounge from "@/components/Lounge";

export default function Home() {
    const [ready, setReady]           = useState(false);
    const [hideMidLines, setHideMid]  = useState(false);
    const desRef                      = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = ready ? "" : "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [ready]);

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    useEffect(() => {
        if (!desRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setHideMid(entry.isIntersecting),
            { threshold: 0.2 }
        );

        observer.observe(desRef.current);
        return () => observer.disconnect();
    }, [ready]);

    return (
        <Grid hideMidLines={hideMidLines}>
            <div className={styles.page}>
                {!ready && <Preloader onComplete={() => setReady(true)} />}
                {ready && (
                    <>
                        <Landing ready={ready} />
                        <div ref={desRef}>
                            <Des ready={ready} />
                        </div>
                        <Chap ready={ready} />
                        <Matter ready={ready} />
                        <Lounge ready={ready} />
                    </>
                )}
            </div>
        </Grid>
    );
}