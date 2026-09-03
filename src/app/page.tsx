"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Chap from "@/components/Chap";
import Maker from "@/components/Maker";
import Footer from "@/components/Footer";
import type LocomotiveScroll from "locomotive-scroll";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let locomotiveScroll: LocomotiveScroll | null = null;

        (async () => {
            const LocomotiveScroll = (await import("locomotive-scroll")).default;

            locomotiveScroll = new LocomotiveScroll({
                lenisOptions: {
                    wrapper: window,
                    content: document.documentElement,
                    lerp: 0.1,
                    duration: 1.2,
                    smoothWheel: true,
                },
            });

            window.addEventListener("scroll", ScrollTrigger.update);
        })();

        return () => {
            window.removeEventListener("scroll", ScrollTrigger.update);
            if (locomotiveScroll) locomotiveScroll.destroy();
        };
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isLoaded]);

    return (
        <div className={styles.main}>
            <Preloader onComplete={() => setIsLoaded(true)} />
            <Header ready={isLoaded} />
            <Landing ready={isLoaded} />
            <Chap />
            <Maker />
            <Footer />
        </div>
    );
}