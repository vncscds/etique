import useToast from '@/shared/components/hooks/useToast';
import BottomSheet from '@/shared/components/ui/BottomSheet';
import Button from '@/shared/components/ui/Button';
import Typography from '@/shared/components/ui/Typography';
import { Colors } from '@/shared/constants';
import { type BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import * as RN from 'react-native';
import usePreferences from '../hooks/usePreferences';

type BottomSheetChangeNameProps = {
	ref: React.Ref<BottomSheetModal>;
};

export default function BottomSheetChangeName({ ref }: BottomSheetChangeNameProps) {
	const preferences = usePreferences();

	const [value, setValue] = React.useState<string>(() => {
		return preferences.get('username') || '';
	});

	const toast = useToast();

	const handleOnPress = () => {
		if (value === '' || value === null) {
			toast.error('Oops!', {
				description: 'O novo nome não pode ser estar vazio.',
			});

			return;
		}

		preferences.update(
			{ username: value },
			{
				onSuccess: () => {
					if (ref !== null && 'current' in ref) {
						ref.current?.dismiss();
					}
				},
			},
		);
	};

	return (
		<BottomSheet ref={ref} snapPoints={['40%', '70%']} isDismissible={!preferences.isUpdating}>
			<BottomSheetScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
				<RN.View>
					<Typography fontFamily="Inter_700Bold" fontSize="lg">
						Nome de usuário
					</Typography>
					<Typography fontSize="sm" fontColor={Colors.NEUTRAL_COLORS.C5}>
						Alterar nome de usuário
					</Typography>
				</RN.View>
				<BottomSheetTextInput
					value={value}
					onChangeText={(text) => setValue(text)}
					style={{ borderWidth: 1, borderRadius: 7, borderColor: Colors.MAIN_COLORS.ETIQUE.C1, opacity: preferences.isUpdating ? 0.5 : 1, paddingInlineStart: 8 }}
					placeholder={preferences.get('username')}
					placeholderTextColor={'rgba(0,0,0,.1)'}
					editable={!preferences.isUpdating}
				/>
				<Button fontSize="sm" onPress={handleOnPress} isPending={preferences.isUpdating}>
					Confirmar
				</Button>
			</BottomSheetScrollView>
		</BottomSheet>
	);
}
