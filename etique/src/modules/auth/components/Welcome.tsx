import Button from "@/shared/components/ui/Button";
import Typography from "@/shared/components/ui/Typography";
import { Colors } from "@/shared/constants";
import useOnBack from "@/shared/hooks/useOnBack";
import WelcomeStepOne from "@/src/assets/svgs/WelcomeStepOne";
import WelcomeStepThree from "@/src/assets/svgs/WelcomeStepThree";
import WelcomeStepTwo from "@/src/assets/svgs/WelcomeStepTwo";
import React from "react";
import * as RN from "react-native";
import { SvgProps } from "react-native-svg";
import useAuth from "../hooks/useAuth";

export default function Welcome() {
  const [step, setStep] = React.useState<(typeof STEP_ORDER)[number]>("welcome");
  const auth = useAuth();

  const STEP_ORDER = [
    "welcome",
    "features",
    "create_access"
  ] as const;

  useOnBack({
    onBack: () => {
      const currIdx = STEP_ORDER.indexOf(step);

      if (currIdx === 0) {
        return false;
      }

      setStep(STEP_ORDER[currIdx - 1]);
      return true;
    }
  });

  return (
    <RN.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <WelcomeStep
        currStepIndex={1}
        title="Bem-vindo ao Etiquê!"
        description="Crie prateleiras, registre listas de compras, controle seus gastos e muito mais!"
        buttonLabel="Continuar"
        isVisible={step === "welcome"}
        onPress={() => setStep("features")}
        svg={WelcomeStepOne}
        showPreviousButton={step !== 'welcome'}
      />
      <WelcomeStep
        currStepIndex={2}
        title="Vários recursos"
        description="Com o Etiquê, tenha acesso a vários recursos para te ajudar nas suas próximas compras de mercado."
        buttonLabel="Continuar"
        isVisible={step === "features"}
        onPress={() => setStep("create_access")}
        svg={WelcomeStepTwo}
        showPreviousButton={step !== 'welcome'}
        onPressPreviousButton={() => setStep('welcome')}
      />
      <WelcomeStep
        currStepIndex={3}
        title="Criar acesso"
        description="Clique no botão abaixo para criar seu acesso e acessar o app."
        buttonLabel={auth.isRegisteringFirstAccess ? "Aguarde..." : "Criar acesso"}
        isVisible={step === "create_access"}
        onPress={auth.registerFirstAccess}
        isPending={auth.isRegisteringFirstAccess}
        svg={WelcomeStepThree}
        showPreviousButton={step !== 'welcome'}
        onPressPreviousButton={() => setStep('features')}
      />
    </RN.View>
  )
}

type WelcomeStepProps = {
  currStepIndex: number;
  title: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
  isVisible: boolean;
  svg: React.ComponentType<SvgProps>;
  showPreviousButton: boolean;
  onPressPreviousButton?: () => void;
  isPending?: boolean;
}

function WelcomeStep({ currStepIndex, title, description, buttonLabel, onPress, isVisible, svg: Svg, showPreviousButton, onPressPreviousButton, isPending }: WelcomeStepProps) {
  return (
    <RN.View style={[welcomeStepStyle.container, { display: isVisible ? 'flex' : 'none' }]}>
      <RN.View style={{ alignItems: 'center' }}>
        <RN.View style={welcomeStepStyle.stepContainer}>
          <Typography fontSize="xl" fontColor={Colors.BADGE_COLORS.DEFAULT.INNER} fontFamily="Inter_700Bold" adjustsFontSizeToFit={true} >{currStepIndex}</Typography>
        </RN.View>
        <Typography fontFamily="Inter_700Bold" fontSize="3xl" fontColor={Colors.MAIN_COLORS.ETIQUE.C1}>{title}</Typography>
        <Typography fontSize="xs" customStyle={{ textAlign: 'center' }} fontColor={Colors.NEUTRAL_COLORS.C8}>{description}</Typography>
      </RN.View>
      <Svg height={250} />
      <RN.View style={{ gap: 16, alignItems: 'center' }}>
        <Typography fontSize="2xs" customStyle={{ textAlign: 'center' }} fontColor={Colors.NEUTRAL_COLORS.C4}>Para continuar, toque no botão abaixo</Typography>
        <RN.View style={{ alignItems: 'center', gap: 8 }}>
          <Button fontSize="sm" customStyle={[{ minWidth: '100%', padding: 14 }]} onPress={onPress} isPending={isPending}>
            {buttonLabel}
          </Button>
          <RN.Pressable onPress={onPressPreviousButton} disabled={isPending} style={[{ opacity: showPreviousButton ? 1 : 0, pointerEvents: showPreviousButton ? 'auto' : 'none' }]}>
            <Typography fontColor={Colors.NEUTRAL_COLORS.C4} fontSize="xs" customStyle={{ textDecorationLine: 'underline' }}>Voltar</Typography>
          </RN.Pressable>
        </RN.View>
      </RN.View>
    </RN.View >
  );
}

const welcomeStepStyle = RN.StyleSheet.create({
  container: {
    alignItems: 'center',
    maxWidth: '75%',
    justifyContent: 'center',
    gap: 32
  },
  stepContainer: {
    backgroundColor: Colors.BADGE_COLORS.DEFAULT.BACKGROUND,
    width: 36,
    height: 36,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER,
    alignItems: 'center',
    justifyContent: 'center'
  }
});