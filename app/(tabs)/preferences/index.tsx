import usePreferences from "@/modules/preferences/hooks/usePreferences";
import useToast from "@/shared/components/hooks/useToast";
import Container from "@/shared/components/layout/Container";
import Button from "@/shared/components/ui/Button";
import Divider from "@/shared/components/ui/Divider";
import Icon from "@/shared/components/ui/Icon";
import Typography from "@/shared/components/ui/Typography";
import { Colors } from "@/shared/constants";
import cachePersister from "@/shared/lib/cache-persister";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import * as ExpoUpdates from 'expo-updates';
import { AlertTriangleIcon, ArrowLeftRightIcon, ChevronRightIcon, InfoIcon, LightbulbOffIcon, MoonStarIcon, PaletteIcon, TrashIcon, UserIcon, UserPenIcon } from "lucide-react-native";
import React from "react";
import * as RN from "react-native";
import { Alert } from "react-native";
import { match } from "ts-pattern";

export default function SettingsIndex() {
  const [name, setName] = React.useState('Usuário');

  const preferences = usePreferences();

  const changeUsernameBottomSheetModalRef = React.useRef<BottomSheetModal | null>(null);

  const toast = useToast();
  const dimensions = RN.useWindowDimensions();

  const currTheme = match(RN.Appearance.getColorScheme())
    .with('light', () => 'Claro')
    .with('dark', () => 'Escuro')
    .otherwise(() => 'Não definido');

  return (
    <React.Fragment>
      <Container>
        <RN.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: dimensions.height * 0.01,
          }}>
          <RN.View style={{ justifyContent: 'center', gap: 32, paddingBottom: 64 }}>
            <RN.View style={{ gap: 8, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <RN.View style={{
                backgroundColor: Colors.BADGE_COLORS.DEFAULT.BACKGROUND,
                padding: 20,
                borderWidth: 1, borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER, borderRadius: 50, justifyContent: 'center', alignItems: 'center'
              }}
              >
                <Icon icon={UserIcon} iconSize="5xl" iconColor={Colors.BADGE_COLORS.DEFAULT.INNER} strokeWidth={1} />
              </RN.View>
              <RN.View style={{ alignItems: 'center' }}>
                <Typography fontFamily="Inter_800ExtraBold" fontSize="2xl" customStyle={{ lineHeight: 26 }}>{name}</Typography>
                <Typography fontSize="xs" fontColor={Colors.MAIN_COLORS.ETIQUE.C1}>@{name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()}</Typography>
              </RN.View>
            </RN.View>
            <RN.View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 27 }}>
              <RN.View style={{ gap: 16 }}>
                <RN.View>
                  <Typography fontSize="base" fontFamily="Inter_600SemiBold" fontColor={Colors.NEUTRAL_COLORS.BLACK}>Perfil</Typography>
                  <Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C4}>Seu perfil</Typography>
                </RN.View>
                <RN.View style={{ minWidth: '100%', borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER, gap: 16 }} >
                  <RN.Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} onPress={() => {
                    changeUsernameBottomSheetModalRef.current?.present();
                  }}>
                    <Icon icon={UserPenIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
                    <Typography fontSize="sm">Alterar nome de usuário</Typography>
                  </RN.Pressable>
                  <Divider />
                </RN.View>
              </RN.View>
              <RN.View style={{ gap: 16 }}>
                <RN.View>
                  <Typography fontSize="base" fontFamily="Inter_600SemiBold" fontColor={Colors.NEUTRAL_COLORS.BLACK}>Personalização</Typography>
                  <Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C4}>Deixe a sua cara</Typography>
                </RN.View>
                <RN.View style={{ minWidth: '100%', borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER, gap: 16 }}>
                  <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <RN.View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Icon icon={MoonStarIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
                      <Typography fontSize="sm">Tema</Typography>
                    </RN.View>
                    <RN.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                      <Typography fontSize="sm" fontFamily="Inter_600SemiBold" fontColor={Colors.MAIN_COLORS.ETIQUE.C1}>{currTheme}</Typography>
                      <Icon icon={ChevronRightIcon} iconColor={Colors.NEUTRAL_COLORS.C6} />
                    </RN.View>
                  </RN.View>
                  <Divider />
                  <RN.View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Icon icon={PaletteIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
                    <Typography fontSize="sm">Cor do app</Typography>
                  </RN.View>
                  <Divider />
                  <RN.View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Icon icon={ArrowLeftRightIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
                    <Typography fontSize="sm">Animação de troca de telas</Typography>
                  </RN.View>
                </RN.View>
              </RN.View>
              <RN.View style={{ gap: 16 }}>
                <RN.View>
                  <Typography fontSize="base" fontFamily="Inter_600SemiBold" fontColor={Colors.NEUTRAL_COLORS.BLACK}>Desempenho</Typography>
                  <Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C4}>Melhore a usabilidade do app</Typography>
                </RN.View>
                <RN.View style={{ minWidth: '100%', borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER, gap: 16 }}>
                  <RN.Pressable style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => router.push('/(tabs)/preferences/animations')}>
                    <RN.View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Icon icon={LightbulbOffIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
                      <Typography fontSize="sm">Desativar animações</Typography>
                    </RN.View>
                    <RN.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                      <Typography fontSize="sm" fontFamily="Inter_600SemiBold" fontColor={Colors.MAIN_COLORS.ETIQUE.C1}>{preferences.value.disableAnimations ? 'Sim' : 'Não'}</Typography>
                      <Icon icon={ChevronRightIcon} iconColor={Colors.NEUTRAL_COLORS.C6} />
                    </RN.View>
                  </RN.Pressable>
                  <Divider />
                </RN.View>
              </RN.View>
            </RN.View>
            <RN.View style={{ gap: 16 }}>
              <RN.View>
                <Typography fontSize="base" fontFamily="Inter_600SemiBold" fontColor={Colors.NEUTRAL_COLORS.BLACK}>Gerenciamento</Typography>
                <Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C4}>Recursos administrativos</Typography>
              </RN.View>
              <RN.View style={{ minWidth: '100%', borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER, gap: 16 }}>
                <RN.Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} onPress={() => {
                  RN.Alert.alert('Você confirma?', 'Isso irá apagar tudo (prateleiras, nome de usuário, etc.', [
                    {
                      text: 'Cancelar',
                      style: 'destructive',
                      isPreferred: true
                    },
                    {
                      text: 'Confirmar',
                      onPress: () => {
                        cachePersister().removeClient();
                        Alert.alert('Reinicie o app', '', [
                          {
                            onPress: async () => await ExpoUpdates.reloadAsync()
                          }
                        ])
                      },
                    }
                  ])
                }}>
                  <Icon icon={TrashIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
                  <Typography fontSize="sm">Excluir cache (QueryClient)</Typography>
                </RN.Pressable>
                <Divider />
              </RN.View>
              <RN.View style={{ minWidth: '100%', borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER, gap: 16 }}>
                <RN.Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} onPress={() => {
                  RN.Alert.alert('Olá!', 'Teste de alerta...')
                }}>
                  <Icon icon={AlertTriangleIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
                  <Typography fontSize="sm">Teste de alerta</Typography>
                </RN.Pressable>
                <Divider />
              </RN.View>
              <RN.View style={{ minWidth: '100%', borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER, gap: 16 }}>
                <RN.Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} onPress={() => {
                  toast.show('Olá!', {
                    description: 'Teste de toaster...'
                  })
                }}>
                  <Icon icon={InfoIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C1} />
                  <Typography fontSize="sm">Teste de toaster</Typography>
                </RN.Pressable>
                <Divider />
              </RN.View>
            </RN.View>

          </RN.View>
        </RN.ScrollView>
      </Container>
      <BottomSheetModal ref={changeUsernameBottomSheetModalRef}>
        <BottomSheetScrollView contentContainerStyle={{ padding: 16 }}>
          <Typography fontFamily="Inter_700Bold" fontSize="lg">Nome de usuário</Typography>
          <Typography fontSize="sm" fontColor={Colors.NEUTRAL_COLORS.C5}>Alterar nome de usuário</Typography>
          <RN.View style={{ paddingTop: 16 }}>
            <Button buttonVariant="dashed" fontSize="sm" onPress={() => {
              changeUsernameBottomSheetModalRef.current?.dismiss();
              setName('John Doe')
            }}>
              Definir "John Doe"
            </Button>
          </RN.View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </React.Fragment>
  )
}