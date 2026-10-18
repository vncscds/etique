import useKeyboardHeight from '@/shared/hooks/useKeyboard';
import useSearch from '@/shared/hooks/useSearch';
import { FlashList, type FlashListProps } from '@shopify/flash-list';
import { StyleSheet } from 'react-native';
import SearchInput from './SearchInput';

type ListProps<T> = {
	data: Array<T>;
	searchSettings?: {
		enabledSearch?: boolean;
		searchKeys?: ReadonlyArray<(keyof T & string) | string> | string[];
	};
} & FlashListProps<T>;

export default function List<T>({ data, searchSettings = { enabledSearch: false, searchKeys: ['id'] }, contentContainerStyle, ...props }: ListProps<T>) {
	const { result, state } = useSearch<T>({ data, keys: searchSettings?.searchKeys });

	const keyboardHeight: number = useKeyboardHeight();
	const paddingBottom: number = Math.max(keyboardHeight * 0.8, 16);

	const isDataEmpty: boolean = data && data.length === 0;
	const headerElement = isDataEmpty ? null : <SearchInput placeholder="Pesquisar..." value={state.query} onChangeText={state.setQuery} />;

	return (
		<FlashList
			data={result}
			contentContainerStyle={[styles.contentContainerStyle, contentContainerStyle, { paddingBottom: paddingBottom }]}
			ListHeaderComponent={headerElement}
			ListHeaderComponentStyle={styles.headerComponentStyle}
			ListEmptyComponentStyle={styles.listEmptyComponentStyle}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	contentContainerStyle: {
		flex: 1,
	},
	headerComponentStyle: {
		paddingBottom: 16,
	},
	listEmptyComponentStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
