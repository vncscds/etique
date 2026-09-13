import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";

export default function useBottomSheet() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return {
    bottomSheetRef
  };
}