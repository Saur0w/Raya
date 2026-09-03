"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";

const ArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className={styles.icon}
    >
        <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
    </svg>
);

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.heading}>
                        <h1>
                            Raya is
                            <br />
                            available
                            <br />
                            through
                            <br />
                            <span>Essesi Studio</span>.
                        </h1>
                    </div>

                    <div className={styles.watermark}>
                        <p>Made by Saurow and Frame</p>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/g.jpg"
                            alt="Raya chair preview"
                            fill
                            sizes="(max-width: 768px) 100vw, 220px"
                            className={styles.img}
                        />
                    </div>

                    <div className={styles.links}>
                        <Link href="/" className={styles.linkRow}>
                            <span>View Collection On Love House</span>
                            <ArrowIcon />
                        </Link>
                        <Link href="/" className={styles.linkRow}>
                            <span>Get in Touch</span>
                            <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}