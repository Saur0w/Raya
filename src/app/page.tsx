"use client";

import styles from "./page.module.css"
import Landing from "@/components/Landing";
import Chap from "@/components/Chap";

export default function Home() {
  return (
    <main className={styles.page}>
        <Landing />
        <Chap />
    </main>
  );
}
