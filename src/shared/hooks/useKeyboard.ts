import React from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboardHeight() {
	const [keyboardHeight, setKeyboardHeight] = React.useState(0);

	React.useEffect(() => {
		const onDidShow = Keyboard.addListener('keyboardDidShow', (evt) => setKeyboardHeight(evt.endCoordinates.height));
		const onDidHide = Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0));

		return () => {
			onDidShow.remove();
			onDidHide.remove();
		};
	}, []);

	return keyboardHeight;
}
