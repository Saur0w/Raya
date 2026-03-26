import styles from "./style.module.scss";
import React from "react";

export default function GridLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.root}>
            <div className={styles.gridOverlay} aria-hidden="true">
                <div className={styles.hLineTop} />
                <div className={styles.hLineBottom} />
                <div className={styles.vLineLeft} />
                <div className={styles.vLineMidLeft} />
                <div className={styles.vLineMidLeft2} />
                <div className={styles.vLineMidRight} />
                <div className={styles.vLineMidRight2} />
                <div className={styles.vLineRight} />
            </div>
            {children}
        </div>
    )
}