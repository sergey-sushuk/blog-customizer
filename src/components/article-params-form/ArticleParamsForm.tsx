import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidth,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type Props = {
	onApply: (state: ArticleStateType) => void;
	defaultValues: ArticleStateType;
};

export const ArticleParamsForm = ({ onApply, defaultValues }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(defaultValues);
	const formRef = useRef<HTMLElement | null>(null);

	const handleToggle = () => setIsMenuOpen((prev) => !prev);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleChange = (key: keyof ArticleStateType, value: any) => {
		setFormState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				aria-hidden={!isMenuOpen}
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					<div className={styles.parametersContainer}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(opt) => handleChange('fontFamilyOption', opt)}
						/>
						<RadioGroup
							name=''
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(opt) => handleChange('fontSizeOption', opt)}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(opt) => handleChange('fontColor', opt)}
						/>
					</div>

					<Separator />

					<div className={styles.parametersContainer}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(opt) => handleChange('backgroundColor', opt)}
						/>
						<Select
							title='Ширина контента'
							options={contentWidth}
							selected={formState.contentWidth}
							onChange={(opt) => handleChange('contentWidth', opt)}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
