import { type BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { Keyboard } from 'react-native';

export default function useBottomSheet<T>() {
	const bottomSheetModalRef = useRef<BottomSheetModal<T>>(null);
	const bottomSheetModal = useBottomSheetModal();

	const open = React.useCallback((data?: T) => {
		bottomSheetModalRef.current?.present(data);
	}, []);

	const close = React.useCallback(() => {
		Keyboard.dismiss();
		bottomSheetModalRef.current?.close();
	}, []);

	return {
		ref: bottomSheetModalRef,

		open,
		close,
	};
}
