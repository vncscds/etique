import { Colors } from '@/shared/constants'
import * as RN from 'react-native'

export default function Divider() {
  return (
    <RN.View
      style={{
        borderWidth: .2,
        borderColor: Colors.MAIN_COLORS.ETIQUE.C1
      }}
    />
  )
}