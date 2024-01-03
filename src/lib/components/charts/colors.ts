import { ChartColors } from '$lib/utils/const';
import type { ThemeMode } from '$lib/utils/theme';

export const getChartColorsByCount = (n: number, currTheme: ThemeMode): string[] => {
	if (n === 0) return ChartColors[currTheme];
	return Array(n)
		.fill('')
		.map((_, i) => {
			const j = Math.floor((ChartColors[currTheme].length / n) * i);
			return ChartColors[currTheme][j];
		});
};
