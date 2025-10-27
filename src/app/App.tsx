import { useEffect, useState } from 'react';
import {
	backgroundColorOptions,
	contentWidthOptions,
	defaultArticleState,
	fontColorOptions,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import type { ArticleParams, OptionType } from 'src/types';

export default function App() {
	const [form, setForm] = useState<ArticleParams>(defaultArticleState);
	const [applied, setApplied] = useState<ArticleParams>(defaultArticleState);

	useEffect(() => {
		const r = document.documentElement;

		r.style.setProperty('--font-color', applied.fontColor.value);
		r.style.setProperty('--bg-color', applied.backgroundColor.value);
		r.style.setProperty('--content-width', applied.contentWidth.value);
		r.style.setProperty('--font-size', applied.fontSizeOption.value);

		const familyClass =
			applied.fontFamilyOption.className || applied.fontFamilyOption.value;

		r.style.setProperty('--font-family', familyClass);

		r.setAttribute('data-font-family', familyClass);
	}, [applied]);

	const handleApply = () => setApplied(form);
	const handleReset = () => {
		setForm(defaultArticleState);
		setApplied(defaultArticleState);
	};

	return (
		<main style={{ padding: 16 }}>
			<h1>Blog Customizer</h1>

			<section style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
				<div>
					<label>Семейство шрифта</label>
					<select
						value={form.fontFamilyOption.value}
						onChange={(e) => {
							const next = fontFamilyOptions.find(
								(o) => o.value === e.target.value
							) as OptionType;
							setForm((s) => ({ ...s, fontFamilyOption: next }));
						}}>
						{fontFamilyOptions.map((o) => (
							<option key={o.value} value={o.value}>
								{o.title}
							</option>
						))}
					</select>
				</div>

				<div>
					<label>Размер шрифта</label>
					<select
						value={form.fontSizeOption.value}
						onChange={(e) => {
							const next = fontSizeOptions.find(
								(o) => o.value === e.target.value
							) as OptionType;
							setForm((s) => ({ ...s, fontSizeOption: next }));
						}}>
						{fontSizeOptions.map((o) => (
							<option key={o.value} value={o.value}>
								{o.title}
							</option>
						))}
					</select>
				</div>

				<div>
					<label>Цвет текста</label>
					<select
						value={form.fontColor.value}
						onChange={(e) => {
							const next = fontColorOptions.find(
								(o) => o.value === e.target.value
							) as OptionType;
							setForm((s) => ({ ...s, fontColor: next }));
						}}>
						{fontColorOptions.map((o) => (
							<option key={o.value} value={o.value}>
								{o.title}
							</option>
						))}
					</select>
				</div>

				<div>
					<label>Цвет фона</label>
					<select
						value={form.backgroundColor.value}
						onChange={(e) => {
							const next = backgroundColorOptions.find(
								(o) => o.value === e.target.value
							) as OptionType;
							setForm((s) => ({ ...s, backgroundColor: next }));
						}}>
						{backgroundColorOptions.map((o) => (
							<option key={o.value} value={o.value}>
								{o.title}
							</option>
						))}
					</select>
				</div>

				<div>
					<label>Ширина контента</label>
					<select
						value={form.contentWidth.value}
						onChange={(e) => {
							const next = contentWidthOptions.find(
								(o) => o.value === e.target.value
							) as OptionType;
							setForm((s) => ({ ...s, contentWidth: next }));
						}}>
						{contentWidthOptions.map((o) => (
							<option key={o.value} value={o.value}>
								{o.title}
							</option>
						))}
					</select>
				</div>

				<div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
					<button onClick={handleApply}>Применить</button>
					<button onClick={handleReset} type='button'>
						Сбросить
					</button>
				</div>
			</section>

			<hr style={{ margin: '20px 0' }} />

			<article
				style={{
					maxWidth: applied.contentWidth.value,
					margin: '0 auto',
					lineHeight: 1.6,
					color: 'var(--font-color)',
					background: 'var(--bg-color)',
					padding: 16,
					fontSize: 'var(--font-size)',
				}}>
				<h2>Демо-статья</h2>
				<p>
					Это пример контента. Параметры, применённые выше, влияют на
					CSS-переменные и класс шрифта.
				</p>
			</article>
		</main>
	);
}
