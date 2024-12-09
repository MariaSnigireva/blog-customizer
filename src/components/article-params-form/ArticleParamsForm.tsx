import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent, useEffect, useRef } from 'react';
// prev предотвращает проблемы с асинхронностью
type ArticleParamsFormProps = {
	setArticleFormState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleFormState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	// функция для переключения видимости формы
	const toggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const [formData, setFormData] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidthArr: defaultArticleState.contentWidth,
	});
	const setFontFamily = (event: OptionType) => {
		setFormData({ ...formData, fontFamilyOption: event });
	};

	const setFontSize = (event: OptionType) => {
		setFormData({ ...formData, fontSizeOption: event });
	};

	const setFontColor = (event: OptionType) => {
		setFormData({ ...formData, fontColor: event });
	};

	const setBackgroundColor = (event: OptionType) => {
		setFormData({ ...formData, backgroundColor: event });
	};

	const setContentWidth = (event: OptionType) => {
		setFormData({ ...formData, contentWidthArr: event });
	};

	// сброс данных формы
	const resetFormData = (event: FormEvent) => {
		event.preventDefault();
		setArticleFormState(defaultArticleState);
		setFormData({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidthArr: defaultArticleState.contentWidth,
		});
		setIsFormOpen(false);
	};

	//  отправка формы
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleFormState({
			fontFamilyOption: formData.fontFamilyOption,
			fontSizeOption: formData.fontSizeOption,
			fontColor: formData.fontColor,
			backgroundColor: formData.backgroundColor,
			contentWidth: formData.contentWidthArr,
		});
		setIsFormOpen(false);
	};

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent): void => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		};

		const handleEscapeDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsFormOpen(false);
			}
		};

		if (isFormOpen) {
			document.addEventListener('mousedown', handleMouseDown);
			document.addEventListener('keydown', handleEscapeDown);
		} else {
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('keydown', handleEscapeDown);
		}

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('keydown', handleEscapeDown);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={resetFormData}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formData.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						selected={formData.fontSizeOption}
						options={fontSizeOptions}
						name='Размер Шрифта'
						title='Размер Шрифта'
						onChange={setFontSize}
					/>
					<Select
						selected={formData.fontColor}
						options={fontColors}
						title='Цвет Шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={formData.backgroundColor}
						options={backgroundColors}
						title='Цвет Фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={formData.contentWidthArr}
						options={contentWidthArr}
						title='Ширина Контента'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
