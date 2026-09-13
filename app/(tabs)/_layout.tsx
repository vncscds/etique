import usePreferences from "@/modules/preferences/hooks/usePreferences";
import Typography from "@/shared/components/ui/Typography";
import { Colors } from "@/shared/constants";
import { Tabs, useSegments } from "expo-router";
import * as Lucide from 'lucide-react-native';
import * as RN from "react-native";
import { toast } from "sonner-native";

export default function TabsLayout() {
  const segments = useSegments<'/preferences/animations'>();
  const preferences = usePreferences();

  const isPreferencesItemScreen = segments.includes('animations');
  const disableAnimations = preferences.get('disableAnimations');

  return (
    <Tabs
      key={disableAnimations ? 'without-anim' : 'with-anim'}
      backBehavior="history"
      screenListeners={{
        tabPress: () => {
          toast.dismiss()
        }
      }}
      screenOptions={{
        animation: disableAnimations ? 'none' : 'shift',
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
          display: isPreferencesItemScreen ? 'none' : 'flex'
        },
        tabBarButton: (props) => {
          return (
            <RN.Pressable onPress={props.onPress} hitSlop={64} style={{ justifyContent: 'center', alignItems: 'center' }}>
              {props.children}
            </RN.Pressable>
          )
        },
        tabBarLabel: (props) => {
          return (
            <Typography customStyle={{ display: props.focused ? 'flex' : 'none' }} fontColor={Colors.MAIN_COLORS.ETIQUE.C2} fontSize="2xs" fontFamily="Inter_400Regular">
              {props.children}
            </Typography>
          )
        },
        tabBarItemStyle: styles.tabBarItemStyle,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: (props) => {
            return (
              <Lucide.HouseHeart strokeWidth={1.5} color={props.focused ? Colors.MAIN_COLORS.ETIQUE.C1 : 'gray'} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="carts"
        options={{
          title: 'Carrinhos',
          tabBarIcon: (props) => {
            return (
              <Lucide.ShoppingCartIcon strokeWidth={1.5} color={props.focused ? Colors.MAIN_COLORS.ETIQUE.C1 : 'gray'} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="shelves"
        options={{
          title: 'Prateleiras',
          tabBarIcon: (props) => {
            return (
              <Lucide.ShelvingUnitIcon strokeWidth={1.5} color={props.focused ? 'pink' : 'gray'} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="preferences"
        options={{
          title: 'Preferências',
          tabBarIcon: (props) => {
            return (
              <Lucide.Settings strokeWidth={1.5} color={props.focused ? Colors.MAIN_COLORS.ETIQUE.C1 : Colors.NEUTRAL_COLORS.C7} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          href: null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />
    </Tabs>
  )
}

const styles = RN.StyleSheet.create({
  tabBarStyle: {
    height: 100,
    borderTopWidth: 0.5,
    borderTopColor: Colors.MAIN_COLORS.ETIQUE.C2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  tabBarItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})