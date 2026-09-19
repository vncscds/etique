import type Cart from '@/modules/cart/@types/Cart.type';
import EmptyCarts from '@/modules/cart/components/EmptyCarts';
import cartIcons from '@/modules/cart/constants/cart-icons';
import useCart from '@/modules/cart/hooks/useCart';
import useListCarts from '@/modules/cart/hooks/useListCarts';
import useBottomSheet from '@/shared/components/hooks/useBottomSheet';
import useToast from '@/shared/components/hooks/useToast';
import Container from '@/shared/components/layout/Container';
import Badge from '@/shared/components/ui/Badge';
import Banner from '@/shared/components/ui/Banner';
import BottomSheet from '@/shared/components/ui/BottomSheet';
import Button from '@/shared/components/ui/Button';
import Divider from '@/shared/components/ui/Divider';
import Icon from '@/shared/components/ui/Icon';
import List from '@/shared/components/ui/List';
import Typography from '@/shared/components/ui/Typography';
import { Colors } from '@/shared/constants';
import { type BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { router, useRouter } from 'expo-router';
import {
	CalendarPlusIcon,
	CalendarSyncIcon,
	CheckCircle2,
	EditIcon,
	MoreVerticalIcon,
	PlusIcon,
	ReceiptTextIcon,
	Share2Icon,
	ShoppingCartIcon,
	TrashIcon,
	XCircleIcon,
} from 'lucide-react-native';
import { get } from 'radashi';
import React, { useRef } from 'react';
import { Pressable, View } from 'react-native';

export default function CartsScreen() {
	const cart = useCart();
	const carts = useListCarts();
	const toast = useToast();

	const bottomSheetRef = useRef<BottomSheetModal<{ cartId: string }> | null>(null);
	const bottomSheet = useBottomSheetModal();

	const bottomSheetCart = useBottomSheet();

	const renderItem = ({ item: cart }: ListRenderItemInfo<Cart>) => {
		return (
			<View style={{ borderWidth: 1, padding: 16, borderRadius: 7, borderColor: Colors.MAIN_COLORS.ETIQUE.C2, gap: 10 }}>
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
								<Pressable
									style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
									onPress={() => {
										bottomSheetCart.open(cart);
									}}
								>
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
	};

	return (
		<React.Fragment>
			<Container
				customStyle={{
					gap: 16,
				}}
			>
				<CartsScreenHeader />
				<List
					data={carts.data}
					searchSettings={{
						searchKeys: ['id', 'title'],
					}}
					ListEmptyComponent={
						carts.isLoading ? (
							<Typography>Carregando...</Typography>
						) : (
							<EmptyCarts
								onPressNewCart={() => {
									bottomSheetRef.current?.present();
								}}
							/>
						)
					}
					renderItem={renderItem}
				/>
			</Container>

			<BottomSheet ref={bottomSheetRef}>
				<BottomSheetScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 36 }} keyboardShouldPersistTaps="handled">
					<View>
						<Typography fontFamily="Inter_700Bold" fontSize="lg">
							Novo carrinho
						</Typography>
						<Typography fontColor={Colors.NEUTRAL_COLORS.C6} fontSize="xs">
							Criação de um novo carrinho
						</Typography>
					</View>
					<View>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<BottomSheetTextInput style={{ borderWidth: 1, borderColor: 'red' }} />
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<BottomSheetTextInput style={{ borderWidth: 1, borderColor: 'red' }} />
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<BottomSheetTextInput style={{ borderWidth: 1, borderColor: 'red' }} />
						<Typography>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, suscipit, doloremque beatae et excepturi dolore accusamus numquam similique impedit assumenda,
							temporibus nostrum quis odit! Dolore ab facilis consectetur enim eligendi! Esse, qui?
						</Typography>
						<Typography>Fim da lista</Typography>
						<Button
							onPress={() => {
								cart.createNewCart(
									{},
									{
										onSuccess: () => {
											bottomSheet.dismissAll();
											router.replace('/(tabs)/cart');
										},
									},
								);
							}}
						>
							Criar
						</Button>
					</View>
				</BottomSheetScrollView>
			</BottomSheet>

			<BottomSheet<Cart> ref={bottomSheetCart.ref}>
				{({ data }) => {
					return (
						<BottomSheetView style={{ padding: 16, gap: 16 }}>
							<View style={{ paddingBottom: 8 }}>
								<Typography fontSize="xl" fontFamily="Inter_700Bold">
									{data?.title}
								</Typography>
								<Typography fontSize="2xs" fontColor={Colors.NEUTRAL_COLORS.C4}>
									Status: {data?.isActive ? 'Ativo' : 'Finalizado'} | ID: {data?.id} | {data?.products.length} itens
								</Typography>
							</View>
							<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
								<Badge icon={EditIcon} />
								<Typography fontSize="sm">Editar carrinho</Typography>
							</View>
							<Divider />
							<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
								<Badge icon={ReceiptTextIcon} />
								<Typography fontSize="sm">Detalhar compras</Typography>
							</View>
							<Divider />
							<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
								<Badge icon={Share2Icon} />
								<Typography fontSize="sm">Compartilhar carrinho</Typography>
							</View>
							<Divider />
							<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
								<Icon icon={TrashIcon} iconColor={Colors.STATUS_COLORS.DELETE} iconSize="lg" />
								<Typography fontSize="sm" fontColor={Colors.STATUS_COLORS.DELETE}>
									Excluir carrinho
								</Typography>
							</View>
						</BottomSheetView>
					);
				}}
			</BottomSheet>
		</React.Fragment>
	);
}

function CartsScreenHeader() {
	const cart = useCart();
	const router = useRouter();
	const toast = useToast();

	const handleOnBannerPress = () => {
		router.push('/(tabs)/cart');
	};

	const handleOnNewCartPress = () => {
		if (cart.isActive) {
			toast.error('Oops!', {
				description: 'Um carrinho se encontra em aberto.',
			});

			router.navigate('/(tabs)/cart');
			return;
		}

		toast.show('Nice!', {
			description: 'Criar novo carrinho...',
		});

		return;
	};

	if (cart.isActive) {
		return <Banner icon={ShoppingCartIcon} title="Carrinho ativo" description="Toque aqui para acessar seu carrinho ativo." onPress={handleOnBannerPress} opacity={0.8} />;
	}

	return (
		<Button buttonVariant="dashed" buttonIcon={PlusIcon} onPress={handleOnNewCartPress}>
			Novo carrinho
		</Button>
	);
}
