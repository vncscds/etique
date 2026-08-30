import { Colors } from "@/shared/constants";
import { Pressable, StyleSheet, View } from "react-native";
import Typography from "./Typography";

type RadioButtonProps = {
  isChecked: boolean;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const OUTER_SIZE = 20
const INNER_SIZE = 10

export default function RadioButton({ isChecked, label, onPress, disabled = false }: RadioButtonProps) {
  return (
    <Pressable style={[styles.pressable, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <View style={[styles.outer, disabled && styles.disabled]}>
        {isChecked && (
          <View
            style={{
              width: INNER_SIZE,
              height: INNER_SIZE,
              borderRadius: INNER_SIZE / 2,
              backgroundColor: Colors.MAIN_COLORS.ETIQUE.C2,
            }}
          />
        )}
      </View>
      <Typography fontSize="sm">{label}</Typography>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  disabled: {
    opacity: .6
  },
  outer: {
    width: OUTER_SIZE,
    height: OUTER_SIZE,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: Colors.MAIN_COLORS.ETIQUE.C1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})