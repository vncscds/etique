import { FlashList, FlashListProps } from "@shopify/flash-list";
import { StyleSheet } from "react-native";

export default function List<T>({ contentContainerStyle, ...props }: FlashListProps<T>) {
  return (
    <FlashList
      contentContainerStyle={[{ flex: 1 }, contentContainerStyle]}
      ListEmptyComponentStyle={styles.listEmptyComponentStyle}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  listEmptyComponentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});