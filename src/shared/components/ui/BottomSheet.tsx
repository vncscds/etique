import usePreferences from '@/modules/preferences/hooks/usePreferences';
import useNavigationListeners from '@/shared/hooks/useNavigationListeners';
import * as GorhomBottomSheet from '@gorhom/bottom-sheet';
import { isFunction } from 'radashi';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomSheetModalProps<T = any> = Omit<GorhomBottomSheet.BottomSheetModalProps, 'children'> & {
  children?: React.ReactNode | ((props: { data?: T }) => React.ReactNode);
  ref?: React.Ref<GorhomBottomSheet.BottomSheetModal<T>>;
};

function BottomSheet<T = any>({ children, ref, ...props }: BottomSheetModalProps<T>) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState<boolean>(false);
  const snapPoints = React.useMemo(() => ['50%', '55%', '60%', '65%', '90%'], []);
  const bottomSheetRef = React.useRef<GorhomBottomSheet.BottomSheetModal<T> | null>(null);

  const preferences = usePreferences();
  const insets = useSafeAreaInsets();

  const disableAnimations = preferences.get('disableAnimations');

  const renderBackdrop = React.useCallback((backdropProps: GorhomBottomSheet.BottomSheetBackdropProps) => {
    return (
      <GorhomBottomSheet.BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={.45}
        {...backdropProps}
      />
    )
  }, []);

  const animations: Pick<GorhomBottomSheet.BottomSheetModalProps, 'animationConfigs' | 'animateOnMount'> = {
    animateOnMount: !disableAnimations,
    animationConfigs: {
      duration: disableAnimations ? 0 : 200
    }
  };

  const BottomSheetModal: Omit<GorhomBottomSheet.BottomSheetModalProps, 'children'> = {
    topInset: insets.top,
    snapPoints: snapPoints,
    backdropComponent: renderBackdrop,
    enablePanDownToClose: true,
    enableDynamicSizing: false,
    enableHandlePanningGesture: true,
    enableBlurKeyboardOnGesture: false,
    android_keyboardInputMode: 'adjustPan',
    keyboardBehavior: 'extend',
    keyboardBlurBehavior: 'restore',
    stackBehavior: 'push',
    ...animations,
    ...props,
  };

  useNavigationListeners({
    preventRemove: isBottomSheetOpen,
    onBeforeRemove: () => {
      if (ref && 'current' in ref && isFunction(ref.current?.dismiss)) {
        ref.current.dismiss();
      }
    }
  });

  React.useImperativeHandle(ref, () => {
    if (!bottomSheetRef.current) {
      return {} as GorhomBottomSheet.BottomSheetModal<T>;
    }

    return {
      ...bottomSheetRef.current,
      present: (data?: T) => {
        setIsBottomSheetOpen(true);
        bottomSheetRef.current?.present(data);
      },
      dismiss: () => {
        setIsBottomSheetOpen(false);
        bottomSheetRef.current?.dismiss();
      }
    }
  });

  return (
    <GorhomBottomSheet.BottomSheetModal ref={bottomSheetRef} {...BottomSheetModal}>
      {children as any}
    </GorhomBottomSheet.BottomSheetModal>
  )
}

export default BottomSheet;