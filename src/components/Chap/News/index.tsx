"use client";

import styles from "./style.module.scss";

const services = [
    "Strategy",
    "Industrial Design",
    "UI / UX",
    "Visual 2D, 3D Animation and Renderings",
    "Prototype development",
    "Color, Material, and Finishes",
    "Website Design",
];

const news = [
    "Exhibition at lovehouse gallery in new york",
    "exhibition at Salone del mobile - Milan design week",
    "architecture hunter guest speaker - webinar",
    'designboom publication - "Essesi and Saul Kim Studio Craft Parchment Stool"',
    "IF DESIGN AWARD - mYTRA AUTONOMOUS ROBOTS",
    'Rarify "What happens when a designer from Tesla teams up with a 3D Printing Engineer"',
    'INDUSTRIALKONZEPT PUBLICATION - "Essesi: Exclusive and passionate design by the Esses brothers"',
    'mINIMALISSIMO pUBLICATION - "eSSESI DESIGN, EXCLUSIVE DESIGN"',
    'yANKODESIGN PUBLICATION - "Striking Sheet Metal Stool Creates an Illusion of Soft Fabric"',
    'REDACTED DESIGN pODCAST GUEST SPEAKER - "45: Taters & Teslas with Alberto Essesi – REDACTED"',
    "GUEST LECTURER AT CENTRO UNIVERSITY, MEXICO CITY",
    "guest lecturer at Tecnologico de monterrey university, mexico city",
    "Diseño de contenido / mexico design week",
    "inedito / mexico design week",
    "zona maco / mexico design week",
];

export default function Last() {
    return (
        <section className={styles.last}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.leftCol}>
                        <p className={styles.servicesLabel}>Design Services</p>
                    </div>
                    <div className={styles.rightCol}>
                        <ul className={styles.list}>
                            {services.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.leftCol}>
                        <p className={styles.newsLabel}>Recent news:</p>
                    </div>
                    <div className={styles.rightCol}>
                        <ul className={styles.list}>
                            {news.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}