import { ErrorBoundary } from "../ErrorBoundary";
import styles from "./Layout.module.scss";
import { PropsWithChildren } from "react";

export function Layout({children}: PropsWithChildren) {
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<div className={styles.brand__container}>
						<a href="http://localhost:5173">
                            Playground Fuel
						</a>
					</div>

				</section>
			</header>
			<ErrorBoundary >
                <main>
                    {children}
                </main>
			</ErrorBoundary >
		</>
	);
}