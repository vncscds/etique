import useCart from '@/modules/cart/hooks/useCart';
import useToast from '@/shared/components/hooks/useToast';
import Button from '@/shared/components/ui/Button';
import Typography from '@/shared/components/ui/Typography';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function CartIndex() {
	const cart = useCart();
	const toast = useToast();

	return (
		<View>
			<Typography fontSize="2xl" fontFamily="Inter_700Bold">
				Criar novo carrinho
			</Typography>
			<Button
				buttonVariant="dashed"
				onPress={() => {
					cart.createNewCart(
						{},
						{
							onSuccess: () => {
								router.navigate('/cart');
								toast.show('Carrinho criado!', {
									description: 'Carrinho criado com sucesso.',
								});
							},
						},
					);
				}}
			>
				Criar novo carrinho
			</Button>
		</View>
	);
}
