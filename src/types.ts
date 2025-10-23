export type OptionType = {
	title: string;
	value: string;
	className?: string;
	optionClassName?: string;
};

export type ArticleParams = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export type { ArticleParams as default };
