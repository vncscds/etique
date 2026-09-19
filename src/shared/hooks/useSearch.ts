import { get } from 'radashi';
import React from 'react';

type UseSearchProps<T> = {
	data: Array<T>;
	keys?: ReadonlyArray<(keyof T & string) | string> | string[];
};

export default function useSearch<T>({ data, keys = ['id'] }: UseSearchProps<T>) {
	const [query, setQuery] = React.useState('');

	const result = React.useMemo(() => {
		const needle = normalize(query);

		if (!needle) {
			return data;
		}

		return data.filter((item) => {
			return keys.some((key) => {
				const value = normalize(get(item, String(key), ''));
				return value.includes(needle);
			});
		});
	}, [data, keys, query]);

	return {
		result,
		state: {
			query,
			setQuery,
		},
	};
}

function normalize(text: string) {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();
}
