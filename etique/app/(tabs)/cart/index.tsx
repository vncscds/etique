import Container from "@/shared/components/layout/Container";
import Typography from "@/shared/components/ui/Typography";
import { Colors } from "@/shared/constants";

export default function CartScreen() {
  return (
    <Container>
      <Typography fontSize="3xl" fontFamily="Inter_700Bold">Carrinho</Typography>
      <Typography fontColor={Colors.NEUTRAL_COLORS.C6}>Lorem, ipsum dolor.</Typography>
    </Container>
  );
}