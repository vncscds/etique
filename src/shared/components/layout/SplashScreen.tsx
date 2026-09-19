import { Colors } from '@/shared/constants';
import { StyleSheet, View } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import Typography from '../ui/Typography';
import Container from './Container';

export default function SplashScreen() {
	useStatusBar({ style: 'light' });

	return (
		<Container customStyle={styles.container}>
			<View style={styles.main}>
				<Typography fontColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C2} fontSize="4xl" fontFamily="Inter_700Bold" adjustsFontSizeToFit={true} numberOfLines={1}>
					Etiquê
				</Typography>
				<Typography fontColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C4} fontSize="sm" numberOfLines={1} adjustsFontSizeToFit={true} customStyle={{ textAlign: 'center' }}>
					Compre mais, economizando mais
				</Typography>
			</View>
			<Typography customStyle={styles.footer} fontSize="2xs" fontColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C4} numberOfLines={1} adjustsFontSizeToFit={true}>
				Em desenvolvimento (0.0.1)
			</Typography>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.MAIN_COLORS.ETIQUE.C1,
	},
	main: {
		alignItems: 'center',
	},
	footer: {
		position: 'absolute',
		bottom: 32,
	},
});
