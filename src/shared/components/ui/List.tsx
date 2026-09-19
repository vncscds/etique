import useKeyboardHeight from '@/shared/hooks/useKeyboard';
import useSearch from '@/shared/hooks/useSearch';
import { FlashList, type FlashListProps } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet } from 'react-native';
import SearchInput from './SearchInput';

type ListProps<T> = {
	data: Array<T>;
	searchSettings?: {
		searchKeys: ReadonlyArray<(keyof T & string) | string> | string[];
	};
} & FlashListProps<T>;

export default function List<T>({ data, searchSettings, contentContainerStyle, ...props }: ListProps<T>) {
	const { result, state } = useSearch<T>({ data, keys: searchSettings?.searchKeys });

	const keyboardHeight = useKeyboardHeight();
	const bottomPadding = Math.max(keyboardHeight * 0.8, 16);

	return (
		<React.Fragment>
			<SearchInput placeholder="Pesquisar..." value={state.query} onChangeText={state.setQuery} />
			<FlashList
				data={result}
				contentContainerStyle={{ ...StyleSheet.flatten(contentContainerStyle), paddingBottom: bottomPadding }}
				ListEmptyComponentStyle={styles.listEmptyComponentStyle}
				keyboardShouldPersistTaps="always"
				showsVerticalScrollIndicator={false}
				{...props}
			/>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	listEmptyComponentStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
