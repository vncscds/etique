import type Cart from '@/modules/cart/@types/Cart.type';
import CartCard from '@/modules/cart/components/CartCard';
import EmptyCarts from '@/modules/cart/components/EmptyCarts';
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
import { BottomSheetView } from '@gorhom/bottom-sheet';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { EditIcon, PlusIcon, ReceiptTextIcon, Share2Icon, ShoppingCartIcon, TrashIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

export default function CartsScreen() {
	const router = useRouter();

	const carts = useListCarts();
	const bottomSheetCart = useBottomSheet();

	const renderItem = ({ item: cart }: ListRenderItemInfo<Cart>) => {
		const handleOnPressMore = () => {
			bottomSheetCart.open(cart);
		};

		return <CartCard cart={cart} onPressMore={handleOnPressMore} />;
	};

	const handleOnPressNewCart = () => {
		router.push('/carts/new');
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
					ListEmptyComponent={carts.isLoading ? <Typography>Carregando...</Typography> : <EmptyCarts onPressNewCart={handleOnPressNewCart} />}
					renderItem={renderItem}
					searchSettings={{
						searchKeys: ['id', 'title'],
					}}
				/>
			</Container>

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
	const carts = useListCarts();

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

	if (carts.data.length > 0) {
		return (
			<Button buttonVariant="dashed" buttonIcon={PlusIcon} onPress={handleOnNewCartPress}>
				Novo carrinho
			</Button>
		);
	}
}
