import styles from "./style.module.scss";
import React from "react";

interface GridProps {
    children: React.ReactNode;
    hideMidLines?: boolean;
}

export default function Grid({ children, hideMidLines = false }: GridProps) {
    return (
        <div className={styles.root}>
            <div className={styles.gridOverlay} aria-hidden="true">
                <div className={styles.hLineTop} />
                <div className={styles.hLineBottom} />
                <div className={styles.vLineLeft} />

                <div className={`${styles.vLineMidLeft}  ${hideMidLines ? styles.midHidden : ""}`} />
                <div className={`${styles.vLineMidLeft2} ${hideMidLines ? styles.midHidden : ""}`} />
                <div className={`${styles.vLineMidRight} ${hideMidLines ? styles.midHidden : ""}`} />
                <div className={`${styles.vLineMidRight2}${hideMidLines ? styles.midHidden : ""}`} />

                <div className={styles.vLineRight} />
            </div>

            {children}
        </div>
    );
}