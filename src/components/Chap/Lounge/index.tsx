"use client";

import styles from "./style.module.scss";
import Image from "next/image";

export default function Lounge() {
    return (
        <section className={styles.lounge}>
            <div className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.imageWrapper}>
                        <Image src="/images/m.jpg" alt="main Image" fill unoptimized />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.heading}>
                        <p>Imagine a sleek, polished aluminum surface that catches the light just right. It features the same elegant curve as before, but this time, it boasts a significantly lighter weight, making it easier to handle and more versatile for various applications. This transformation not only enhances its aesthetic appeal but also improves functionality, allowing for innovative uses that were previously unfeasible.</p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image src="/images/s.jpg" alt="bottom image" fill />
                    </div>
                </div>

                <div className={styles.mainHeading}>
                    <h1>M-Raya Lounge</h1>
                </div>
            </div>
        </section>
    )
}