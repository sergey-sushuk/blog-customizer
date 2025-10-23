import { useRef } from 'react';
import clsx from 'clsx';
import { useClickOutside } from 'src/hooks/useOutsideClick';
import styles from './Sidebar.module.scss';

type Props = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export default function Sidebar({ open, onClose, children }: Props) {
	const panelRef = useRef<HTMLDivElement>(null);
	useClickOutside(panelRef, onClose, open);

	return (
		<div
			className={clsx(styles.root, open && styles.root_open)}
			aria-hidden={!open}>
			<div className={styles.backdrop} />
			<aside
				ref={panelRef}
				className={styles.panel}
				role='dialog'
				aria-modal='true'>
				{children}
			</aside>
		</div>
	);
}
