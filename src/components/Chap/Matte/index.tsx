"use client";

import styles from "./style.module.scss";
import Image from "next/image";

export default function Matte() {
    return (
        <section className={styles.matte}>
            <div className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.topImageWrapper}>
                        <Image src="/images/silv.jpg" alt="Silver" fill />
                    </div>
                    <div className={styles.bottomImageWrapper}>
                        <Image src="/images/shadow.jpg" alt="Shadow" fill />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.text}>
                        <div className={styles.heading}>
                            <h1>Matte black finish.< br />
                                The curve catches light only where it needs to.</h1>
                        </div>
                        <div className={styles.para}>
                            <p>From the front, it presents a striking geometric design, with sharp, straight edges that contrast beautifully with the natural curves of the wood.
                                Depending on your vantage point, this chair transforms entirely, offering a unique perspective that changes with each angle you observe.</p>
                        </div>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image src="/images/dark.jpg" alt="Dark" fill />
                    </div>
                </div>
            </div>
        </section>
    );
}