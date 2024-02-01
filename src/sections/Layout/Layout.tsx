import { ErrorBoundary } from "../ErrorBoundary";
import styles from "./Layout.module.scss";
import { PropsWithChildren } from "react";
import { WalletConnectButton } from "./WalletConnectButton";

export function Layout({children}: PropsWithChildren) {
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<div className={styles.brand__container}>
						<a href="#">
                            Playground Fuel
						</a>
					</div>

					<div className={styles.wallet__container}>
						<WalletConnectButton />
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