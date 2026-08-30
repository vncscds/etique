import useCart from "@/modules/cart/hooks/useCart";
import SafeAreaView from "@/shared/components/layout/SafeAreaView";
import Icon from "@/shared/components/ui/Icon";
import Typography from "@/shared/components/ui/Typography";
import { Colors } from "@/shared/constants";
import { Stack, useRouter } from "expo-router";
import { CalendarHeartIcon, LucideIcon, MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react-native";
import * as RN from 'react-native';

export default function HomeLayout() {
  const cart = useCart();
  const router = useRouter();

  const handleOnPressCart = () => {
    if (!cart.isActive) {
      router.navigate('/(tabs)/carts');
      return;
    }

    router.navigate('/(tabs)/cart');
    return;
  }

  return (
    <SafeAreaView backgroundColor={Colors.MAIN_COLORS.ETIQUE.C1} statusBarStyle="light" edges={["top"]}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            header: () => {
              return (
                <RN.View style={headerStyle.container}>
                  <RN.View style={headerStyle.actionsContainer}>
                    <Icon icon={MenuIcon} iconSize="3xl" iconColor={Colors.NEUTRAL_COLORS.WHITE} />
                    <RN.View style={headerStyle.rightActions}>
                      <Action icon={ShoppingCartIcon} onPress={handleOnPressCart} />
                      <Action icon={UserIcon} onPress={() => { }} />
                    </RN.View>
                  </RN.View>
                  <RN.View style={{ paddingTop: 46, paddingBottom: 84, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <RN.View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                      <Typography fontSize="xs" fontColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C1} fontFamily="Inter_500Medium" customStyle={{ letterSpacing: 2 }}>GASTOS</Typography>
                      <Typography fontSize="5xl" fontFamily="Inter_700Bold" fontColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C2}>R$0,00</Typography>
                      <RN.View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <CalendarHeartIcon strokeWidth={1.5} size={14} color={Colors.NEUTRAL_COLORS.WHITE} />
                        <Typography fontSize="xs" fontColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C1} fontFamily="Inter_500Medium">Este mês</Typography>
                      </RN.View>
                    </RN.View>
                  </RN.View>
                </RN.View>
              );
            }
          }}
        />
      </Stack >
    </SafeAreaView>
  );
}

type ActionProps = {
  icon: LucideIcon;
  onPress: () => void;
}

function Action({ icon, onPress }: ActionProps) {
  return (
    <RN.Pressable style={({ pressed }) => [{ opacity: pressed ? .5 : 1 }]} onPress={onPress}>
      <Icon icon={icon} iconSize="2xl" iconColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C2} strokeWidth={1.7} />
    </RN.Pressable>
  );
}

const headerStyle = RN.StyleSheet.create({
  container: {
    backgroundColor: Colors.MAIN_COLORS.ETIQUE.C1,
    paddingHorizontal: 16,
    paddingTop: 8,
    justifyContent: 'center'
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    alignItems: 'center',
    gap: 16
  },
  rightActions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center'
  },
})