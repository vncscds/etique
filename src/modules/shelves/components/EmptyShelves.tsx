import useToast from "@/shared/components/hooks/useToast";
import Button from "@/shared/components/ui/Button";
import Empty from "@/shared/components/ui/Empty";
import Typography from "@/shared/components/ui/Typography";
import { Colors } from "@/shared/constants";
import { FileCodeIcon, MilkIcon, PlusIcon } from "lucide-react-native";

export default function EmptyShelves() {
  const toast = useToast();

  const handleOnPress = () => {
    toast.show('Em desenvolvimento', {
      icon: FileCodeIcon,
      description: 'As prateleiras estão em desenvolvimento... tente novamente mais tarde!'
    });
  }

  return (
    <Empty
      icon={MilkIcon}
      title="Prateleiras vazia"
      briefing="Nenhuma prateleira encontrada"
      description='Para organizar seus produtos, crie uma prateleira. Por exemplo, "prateleira de enlatados".'
      actions={() => {
        return (
          <Button buttonVariant="dashed" asChild={true} buttonIcon={PlusIcon} onPress={handleOnPress}>
            <Typography fontColor={Colors.MAIN_COLORS.ETIQUE.C2} fontSize="sm" fontFamily="Inter_400Regular">Nova prateleira</Typography>
          </Button>
        )
      }}
    />
  )
}