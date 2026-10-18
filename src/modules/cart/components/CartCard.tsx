import cartIcons from '@/modules/cart/constants/cart-icons';
import Badge from '@/shared/components/ui/Badge';
import Icon from '@/shared/components/ui/Icon';
import Typography from '@/shared/components/ui/Typography';
import { Colors } from '@/shared/constants';
import dayjs from 'dayjs';
import { CalendarPlusIcon, CalendarSyncIcon, CheckCircle2, MoreVerticalIcon, XCircleIcon } from 'lucide-react-native';
import { get } from 'radashi';
import { Pressable, StyleSheet, View } from 'react-native';
import type Cart from '../@types/Cart.type';

type CartCardProps = {
	cart: Cart;
	onPressMore: () => void;
};

export default function CartCard({ cart, onPressMore }: CartCardProps) {
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View>
					<View style={{ minWidth: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
							<Badge icon={get(cartIcons, cart.icon, cartIcons.cart)} />
							<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
								<Typography fontFamily="Inter_700Bold" fontSize="lg" fontColor={Colors.MAIN_COLORS.ETIQUE.C2}>
									{cart.title}
								</Typography>
								<Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C6}>
									({cart.products.length} itens)
								</Typography>
							</View>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
							<Badge icon={cart.isActive ? CheckCircle2 : XCircleIcon} title={cart.isActive ? 'Ativo' : 'Inativo'} />
							<Pressable style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })} onPress={onPressMore}>
								<Icon icon={MoreVerticalIcon} iconSize="xl" />
							</Pressable>
						</View>
					</View>
					<Typography fontColor={Colors.MAIN_COLORS.ETIQUE.C2} fontSize="xs">
						{cart.description}
					</Typography>
					<Typography fontSize="2xs" fontColor={Colors.NEUTRAL_COLORS.C4}>
						ID: {cart.id}
					</Typography>
				</View>
			</View>
			<View style={{ width: '100%', padding: 0.5, backgroundColor: Colors.MAIN_COLORS.ETIQUE.C1 }} />
			<View>
				<View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
					<Icon icon={CalendarPlusIcon} iconSize="sm" iconColor={Colors.MAIN_COLORS.ETIQUE.C2} />
					<View style={{ flexDirection: 'row', gap: 4 }}>
						<Typography fontSize="xs">Dt. de criação:</Typography>
						<Typography fontSize="xs" fontColor={Colors.MAIN_COLORS.ETIQUE.C2}>
							{dayjs(cart.createdAt).format('DD/MM/YYYY HH:mm')}
						</Typography>
					</View>
				</View>
				<View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
					<Icon icon={CalendarSyncIcon} iconSize="sm" iconColor={Colors.MAIN_COLORS.ETIQUE.C2} />
					<View style={{ flexDirection: 'row', gap: 4 }}>
						<Typography fontSize="xs">Dt. de atualização:</Typography>
						<Typography fontSize="xs" fontColor={Colors.MAIN_COLORS.ETIQUE.C2}>
							{dayjs(cart.createdAt).format('DD/MM/YYYY HH:mm')}
						</Typography>
					</View>
				</View>
			</View>
			<View style={{ width: '100%', padding: 0.5, backgroundColor: Colors.MAIN_COLORS.ETIQUE.C1 }} />
			<View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Typography fontSize="2xs" fontColor={Colors.NEUTRAL_COLORS.C6}>
						Subtotal
					</Typography>
					<Typography fontSize="2xs" fontColor={Colors.NEUTRAL_COLORS.C6}>
						{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(+cart.total)}
					</Typography>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Typography fontSize="2xs" fontColor={Colors.NEUTRAL_COLORS.C6}>
						Descontos
					</Typography>
					<Typography fontSize="2xs" fontColor={Colors.NEUTRAL_COLORS.C6} customStyle={{ textDecorationLine: 'line-through' }}>
						{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(+cart.total)}
					</Typography>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Typography fontSize="sm" fontFamily="Inter_700Bold" fontColor={Colors.MAIN_COLORS.ETIQUE.C1}>
						Total
					</Typography>
					<Typography fontSize="sm" fontFamily="Inter_700Bold" fontColor={Colors.MAIN_COLORS.ETIQUE.C1}>
						{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(+cart.total)}
					</Typography>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		padding: 16,
		borderRadius: 7,
		borderColor: Colors.MAIN_COLORS.ETIQUE.C2,
		gap: 10,
	},
});
