"use client";

import styles from "./style.module.scss";
import Image from 'next/image';

export default function Maker() {
    return (
        <section className={styles.maker}>
            <div  className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.imageWrapper}>
                        <Image src="/images/maker.jpg" alt="image" fill />
                    </div>
                    <div className={styles.heading}>
                        <h1>Essesi Studio</h1>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.para}>
                        <div className={styles.first}>
                            <p>Alberto Essesi is the founder and designer of Essesi Design Studio, with extensive experience collaborating with leading design and technology companies worldwide.</p>
                        </div>
                        <div className={styles.second}>
                            <p>He has led projects and teams focused on shaping the future of physical objects and interfaces. His work includes designing robots, drones, vehicles, architecture, collectible furniture, and objects for Michelin-starred restaurants. His background features roles as a lead designer at Tesla and head of design at Mytra.</p>
                        </div>
                        <div className={styles.third}>
                            <p>Committed to bridging innovation and consciousness, his approach embodies the idea of connecting sentience to matter, creating intelligent, meaningful objects that blur the boundaries between thought and physicality.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}