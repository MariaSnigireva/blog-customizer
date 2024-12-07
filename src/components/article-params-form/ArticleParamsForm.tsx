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
	const [isFormVisible, setIsFormVisible] = useState(false);

	// функция для переключения видимости формы
	const toggleFormVisibility = () => {
		setIsFormVisible((prev) => !prev);
	};

	// для хранения данных формы
	const [formData, setFormData] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	// для обновления значений формы
	const updateFormData = (key: keyof typeof formData, value: OptionType) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	// сброс данных формы
	const resetFormData = (event: FormEvent) => {
		event.preventDefault();
		setArticleFormState(defaultArticleState);
		setFormData({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		setIsFormVisible(false);
	};

	//  отправка формы
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleFormState(formData);
		setIsFormVisible(false);
	};

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsFormVisible(false);
			}
		};

		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsFormVisible(false);
			}
		};

		if (isFormVisible) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscapePress);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapePress);
		};
	}, [isFormVisible]);

	return (
		<>
			{/* Кнопка для переключения видимости формы */}
			<ArrowButton isOpen={isFormVisible} onClick={toggleFormVisibility} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormVisible,
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
						selected={formData.fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option) => updateFormData('fontFamily', option)} // изменение шрифта
					/>
					<RadioGroup
						selected={formData.fontSize}
						options={fontSizeOptions}
						name='Размер Шрифта'
						title='Размер Шрифта'
						onChange={(option) => updateFormData('fontSize', option)} // изменение размера шрифта
					/>
					<Select
						selected={formData.fontColor}
						options={fontColors}
						title='Цвет Шрифта'
						onChange={(option) => updateFormData('fontColor', option)} // изменение цвета шрифта
					/>
					<Separator />
					<Select
						selected={formData.backgroundColor}
						options={backgroundColors}
						title='Цвет Фона'
						onChange={(option) => updateFormData('backgroundColor', option)} // изменение цвета фона
					/>
					<Select
						selected={formData.contentWidth}
						options={contentWidthArr}
						title='Ширина Контента'
						onChange={(option) => updateFormData('contentWidth', option)} // изменение ширины контента
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
