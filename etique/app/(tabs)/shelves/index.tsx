import EmptyShelves from "@/modules/shelves/components/EmptyShelves";
import useToast from "@/shared/components/hooks/useToast";

export default function ShelfIndex() {
  const toast = useToast();

  return (
    <EmptyShelves />
  )
}