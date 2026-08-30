import { PropsWithChildren } from 'react';
import * as RN from 'react-native';

type ModalProps = PropsWithChildren<{
  isVisible?: boolean;
}> & RN.ModalProps

export default function Modal({ isVisible, children, ...props }: ModalProps) {
  return (
    <RN.Modal
      presentationStyle='fullScreen'
      visible={isVisible}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
      allowSwipeDismissal={true}
      {...props}
    >
      {children}
    </RN.Modal>
  )
}