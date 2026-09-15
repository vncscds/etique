import Badge from "@/shared/components/ui/Badge";
import Typography from "@/shared/components/ui/Typography";
import { Colors } from "@/shared/constants";
import React from "react";
import * as RN from "react-native";

export default function HomeIndex() {
  return (
    <React.Fragment>
      <RN.View style={{ flex: 1, backgroundColor: Colors.MAIN_COLORS.ETIQUE.C1 }}>
        <RN.ScrollView style={{ flex: 1, backgroundColor: 'white', borderTopRightRadius: 22, borderTopLeftRadius: 22 }}>
          <RN.View style={{
            paddingTop: 36,
            paddingHorizontal: 16,
            gap: 12,
          }}>
            <Badge variant="default" title="Anápolis - GO" />
            <Typography
              fontFamily="Inter_400Regular"
              fontSize="4xl"
            >
              Vamos as compras?
            </Typography>
            <Typography
              fontSize="xs"
              fontColor={Colors.NEUTRAL_COLORS.C6}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, at?
            </Typography>
          </RN.View>
        </RN.ScrollView>
      </RN.View>
    </React.Fragment>
  )
}