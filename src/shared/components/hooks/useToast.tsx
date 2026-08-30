import { Colors } from "@/shared/constants";
import { CheckCircle2Icon, type LucideIcon } from "lucide-react-native";
import * as RN from 'react-native';
import { toast, ToastProps } from "sonner-native";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";

export default function useToast() {

  return {
    show: (title: string, props?: Omit<Partial<ToastProps>, 'icon'> & { icon?: LucideIcon }) => {
      const { icon, ...toastProps } = props || {};
      toast.dismiss();

      toast.custom(
        <RN.View style={toastStyles.default}>
          {icon && <Icon icon={icon} iconColor={Colors.MAIN_COLORS.ETIQUE.C2} strokeWidth={2.5} iconSize="xl" />}
          <RN.View>
            <Typography fontFamily="Inter_600SemiBold" fontSize="base" fontColor={Colors.MAIN_COLORS.ETIQUE.C2}>{title}</Typography>
            <Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C5}>{props?.description}</Typography>
          </RN.View>
        </RN.View>,
        { ...toastProps, id: 'custom' }
      );
    },
    error: (title: string, props?: Omit<Partial<ToastProps>, 'icon'> & { icon?: LucideIcon }) => {
      const { icon, ...toastProps } = props || {};
      toast.dismiss();

      toast.custom(
        <RN.View style={[toastStyles.default, toastStyles.error]}>
          {icon && <Icon icon={icon} iconColor={Colors.BADGE_COLORS.ERROR.INNER} strokeWidth={2.5} iconSize="xl" />}
          <RN.View>
            <Typography fontFamily="Inter_600SemiBold" fontSize="base" fontColor={Colors.BADGE_COLORS.ERROR.INNER}>{title}</Typography>
            <Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C5} numberOfLines={3}>{props?.description}</Typography>
          </RN.View>
        </RN.View>,
        { ...toastProps, id: 'error' }
      );
    },
    success: (title: string, props?: Omit<Partial<ToastProps>, 'icon'> & { icon?: LucideIcon }) => {
      const { icon = CheckCircle2Icon, ...toastProps } = props || {};
      toast.dismiss();

      toast.custom(
        <RN.View style={[toastStyles.default, toastStyles.success]}>
          <Icon icon={icon} iconColor={Colors.BADGE_COLORS.SUCCESS.INNER} strokeWidth={2.5} iconSize="xl" />
          <RN.View>
            <Typography fontFamily="Inter_600SemiBold" fontSize="base" fontColor={Colors.BADGE_COLORS.SUCCESS.INNER}>{title}</Typography>
            <Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C5} numberOfLines={3}>{props?.description}</Typography>
          </RN.View>
        </RN.View>,
        { ...toastProps, id: 'success' }
      );
    }
  }
}

const toastStyles = RN.StyleSheet.create({
  default: {
    backgroundColor: Colors.NEUTRAL_COLORS.ETIQUE,
    borderWidth: 1,
    borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER,
    borderRadius: 7,
    flexDirection: 'row',
    padding: 16,
    margin: 16,
    alignItems: 'center',
    gap: 12,
  },
  error: {
    backgroundColor: Colors.BADGE_COLORS.ERROR.BACKGROUND,
    borderColor: Colors.BADGE_COLORS.ERROR.BORDER,
  },
  success: {
    backgroundColor: Colors.BADGE_COLORS.SUCCESS.BACKGROUND,
    borderColor: Colors.BADGE_COLORS.SUCCESS.BORDER,
  }
});