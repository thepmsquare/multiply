import brandConfig from "@/config/brand";

import styles from "./page.module.css";

export default function Home() {
  return <main className={styles.main}>{brandConfig.name}</main>;
}
