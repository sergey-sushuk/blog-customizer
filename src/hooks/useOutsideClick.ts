import { useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>(
	ref: React.RefObject<T>,
	cb: () => void,
	enabled = true
) {
	useEffect(() => {
		if (!enabled) return;
		const handler = (e: MouseEvent) => {
			const el = ref.current;
			if (!el) return;
			if (!el.contains(e.target as Node)) cb();
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, [ref, cb, enabled]);
}

export { useOutsideClick as useClickOutside };
export default useOutsideClick;
