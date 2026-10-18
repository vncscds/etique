import SafeAreaView from '@/shared/components/layout/SafeAreaView';
import { Colors } from '@/shared/constants';
import { Stack } from 'expo-router';

export default function CartLayout() {
	return (
		<SafeAreaView backgroundColor={Colors.NEUTRAL_COLORS.WHITE} edges={['top']}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: true,
					}}
				/>
			</Stack>
		</SafeAreaView>
	);
}
