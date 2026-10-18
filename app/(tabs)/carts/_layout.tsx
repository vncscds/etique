import SafeAreaView from '@/shared/components/layout/SafeAreaView';
import Header from '@/shared/components/ui/Header';
import { Colors } from '@/shared/constants';
import { Stack } from 'expo-router';

export default function CartsLayout() {
	return (
		<SafeAreaView backgroundColor={Colors.NEUTRAL_COLORS.WHITE} statusBarStyle="dark" edges={['top']}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						headerShown: true,
						header: () => {
							return <Header title="Carrinhos" />;
						},
					}}
				/>
			</Stack>
		</SafeAreaView>
	);
}
