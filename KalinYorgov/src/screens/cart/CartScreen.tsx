import React, { useEffect, useRef } from 'react';
import { View, ScrollView, useWindowDimensions, findNodeHandle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import { Container } from '../../components/base/Container';
import { Typography } from '../../components/base/Typography';
import { styles } from './CartScreen.styles';
import CartItem from '../../components/cart/CartItem';
import OrderSummary from '../../components/cart/OrderSummary';
import EmptyCart from '../../components/cart/EmptyCart';
import { SCREEN_NAMES } from '../../constants';
import { HomeStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CartScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, typeof SCREEN_NAMES.CART>;

const CartScreen: React.FC = () => {
    const { width } = useWindowDimensions();
    const { items, total } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<CartScreenNavigationProp>();
    const headerRef = useRef<View>(null);

    const isWideScreen = width >= 768;

    useEffect(() => {
        if (headerRef.current) {
            const tag = findNodeHandle(headerRef.current);
            if (tag) {
                setTimeout(() => {
                    tag && headerRef.current?.setNativeProps({ accessibilityFocus: true });
                }, 100);
            }
        }
    }, []);

    const handleQuantityChange = (id: string, size: string, newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            dispatch(updateQuantity({ id, size, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (id: string, size: string) => {
        dispatch(removeFromCart({ id, size }));
    };

    if (items.length === 0) {
        return <EmptyCart onContinueShopping={() => navigation.navigate(SCREEN_NAMES.PRODUCT_LIST, { categoryId: '' })} />;
    }

    return (
        <Container>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.content, isWideScreen && styles.contentWide]}>
                    <View style={[styles.cartSection, isWideScreen && styles.cartSectionWide]}>
                        <View
                            ref={headerRef}
                            accessible={true}
                            accessibilityRole="header"
                            accessibilityLabel={`Shopping Cart with ${items.length} ${items.length === 1 ? 'item' : 'items'}`}
                        >
                            <Typography
                                variant="h2"
                                style={styles.sectionTitle}
                            >
                                Shopping Cart
                            </Typography>
                        </View>
                        {items.map((item) => (
                            <CartItem
                                key={`${item.id}-${item.size}`}
                                item={item}
                                onQuantityChange={(quantity) => handleQuantityChange(item.id, item.size, quantity)}
                                onRemove={() => handleRemoveItem(item.id, item.size)}
                            />
                        ))}
                    </View>

                    <View
                        style={[styles.summarySection, isWideScreen && styles.summarySectionWide]}
                        accessible={true}
                        accessibilityLabel={`Order summary section, total amount ${total.toFixed(2)} dollars`}
                    >
                        <OrderSummary total={total} />
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
};

export default CartScreen;
