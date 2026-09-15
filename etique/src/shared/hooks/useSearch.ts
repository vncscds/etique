import { get } from "radashi";
import React from "react";

type UseSearchProps<T> = {
	data: T
}

export default function useSearch<T>(data: Array<T>, keys: Array<keyof T>) {
	const [query, setQuery] = React.useState<string>('');

	const result = React.useMemo(() => {
		return data.filter(item => {
			return keys.some(key => {
				const keyValue = get(item, String(key), '');
				return normalize(keyValue).includes(normalize(query));
			});
		});
	}, [query]);

	if(!data) {
		return {
			data: [],
			isPending: false,
			isSucess: true,
			isError: false,
		}
	}

	return {
		result,
		query, 
		setQuery
	};
}

function normalize(text: string) {
	return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}