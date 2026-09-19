import { Colors } from '@/shared/constants';
import { SearchIcon, XIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from './Icon';

type SearchInputProps = {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
};

export default function SearchInput({ value, onChangeText, placeholder = 'Pesquisar...' }: SearchInputProps) {
	return (
		<View style={styles.container}>
			<Icon icon={SearchIcon} iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor="rgba(0,0,0,.16)"
				returnKeyType="search"
				autoCorrect={false}
				style={styles.textInput}
			/>
			{value.length > 0 && (
				<Pressable
					hitSlop={20}
					accessibilityRole="button"
					accessibilityLabel="Limpar pesquisa"
					style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
					onPress={() => onChangeText('')}
				>
					<Icon icon={XIcon} iconColor={Colors.STATUS_COLORS.DELETE} />
				</Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1.5,
		borderColor: Colors.MAIN_COLORS.ETIQUE.C1,
		borderRadius: 7,
		paddingHorizontal: 8,
	},
	textInput: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 8,
	},
});
