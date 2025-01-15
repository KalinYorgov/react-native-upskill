import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { CompositeScreenNavigationProp, HomeStackParamList } from '../../types/index';
import { fetchProductById } from '../../services/api';
import Spinner from '../../components/spinner/Spinner';
import ErrorComponent from '../../components/errors/ErrorComponent';
import { colors } from '../../theme/colors';
import { ProductDetails } from '../../types';
import { styles } from './PDPScreen.styles';
import Carousel from 'react-native-reanimated-carousel';
import { useWindowDimensions } from 'react-native';
import { SCREEN_NAMES } from '../../constants';
import SizeTable from '../../components/product/SizeTable';
import BuySection from '../../components/product/BuySection';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import ColorVariations from '../../components/product/ColorVariations';
import Description from '../../components/product/Description';

type PDPScreenRouteProp = RouteProp<HomeStackParamList, 'ProductDetails'>;
type PDPScreenNavigationProp = CompositeScreenNavigationProp<'ProductDetails'>;

type PDPScreenProps = {
    route: PDPScreenRouteProp;
    navigation: PDPScreenNavigationProp;
};

interface ColorVariation {
    color: string;
    thumbnail: string;
    product_id: string;
    isCurrentColor: boolean;
}

const PDPScreen: React.FC<PDPScreenProps> = ({ route, navigation }) => {
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
    const [variationImageErrors, setVariationImageErrors] = useState<Record<string, boolean>>({});

    const { productId } = route.params;
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [colorVariations, setColorVariations] = useState<ColorVariation[]>([]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [sizeError, setSizeError] = useState<string | null>(null);
    const [hasSizes, setHasSizes] = useState<boolean>(false);

    const carouselWidth = windowWidth * 0.8;
    const carouselHeight = windowHeight * 0.4;

    const dispatch = useAppDispatch();

    const renderPaginationDots = () => {
        if (!product?.images?.length) return null;

        return (
            <View style={styles.paginationContainer}>
                <View style={styles.dotsContainer}>
                    {product.images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === currentIndex && styles.activeDot
                            ]}
                        />
                    ))}
                </View>
                <Text style={styles.paginationText}>
                    {currentIndex + 1}/{product.images.length}
                </Text>
            </View>
        );
    };

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                const result = await fetchProductById(productId);
                setProduct(result);
                setHasSizes(!!(result.sizes && result.sizes.length > 0));

                if (result.variations) {
                    const variations = result.variations.map(variation => ({
                        color: variation.color,
                        thumbnail: variation.thumbnail,
                        product_id: variation.product_id,
                        isCurrentColor: variation.product_id === productId
                    }));
                    setColorVariations(variations);
                }
            } catch (error) {
                console.error('Error loading product:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
            setLoading(false);
        };
        loadProduct();
    }, [productId]);

    const handleColorVariationPress = (variationId: string) => {
        navigation.replace(SCREEN_NAMES.PRODUCT_DETAILS, {
            productId: variationId
        });
    };

    const handleCarouselImageError = (index: number) => {
        setImageErrors(prev => ({
            ...prev,
            [index]: true
        }));
    };

    const handleVariationImageError = (productId: string) => {
        setVariationImageErrors(prev => ({
            ...prev,
            [productId]: true
        }));
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
        setSizeError(null);
    };

    const handleAddToCart = () => {
        if (!product) {
            return;
        }

        if (hasSizes && !selectedSize) {
            setSizeError('Please select a size before adding to cart');
            return;
        }

        dispatch(addToCart({
            id: productId,
            title: product.title,
            price: product.price,
            size: selectedSize || '',
            thumbnail: product.thumbnail,
            quantity: 1
        }));

        navigation.navigate(SCREEN_NAMES.CART);
    };

    if (loading) {
        return <Spinner fullScreen size="large" color={colors.primary} />;
    }

    if (error) {
        return <ErrorComponent message={error} />;
    }

    if (!product) {
        return <ErrorComponent message="No product data available" />;
    }

    const images = product.images?.length ? product.images : product.thumbnail ? [{ uri: product.thumbnail }] : [];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 72 }}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                </Text>
            </View>

            <View style={styles.carouselContainer}>
                <Carousel
                    width={carouselWidth}
                    height={carouselHeight}
                    data={images}
                    onSnapToItem={setCurrentIndex}
                    renderItem={({ item, index }) => (
                        <View style={styles.carouselImageContainer}>
                            {imageErrors[index] ? (
                                <View style={[styles.carouselImage, styles.errorContainer]}>
                                    <ErrorComponent message="Failed to load image" />
                                </View>
                            ) : (
                                <Image
                                    source={item}
                                    style={styles.carouselImage}
                                    onError={() => handleCarouselImageError(index)}
                                />
                            )}
                        </View>
                    )}
                    loop={false}
                    style={styles.carousel}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    enabled={true}
                />
                {renderPaginationDots()}
            </View>

            <ColorVariations
                variations={colorVariations}
                onVariationPress={handleColorVariationPress}
                onImageError={handleVariationImageError}
                imageErrors={variationImageErrors}
            />

            <SizeTable
                sizes={product.sizes || []}
                selectedSize={selectedSize}
                onSizeSelect={handleSizeSelect}
            />

            <Description
                description={product.description}
                shortDescription={product.shortDescription}
                longDescription={product.longDescription}
            />

            <BuySection
                onAddToCart={handleAddToCart}
                price={product.price}
                hasError={!!sizeError}
                errorMessage={sizeError}
                disabled={!product.sizes?.length}
            />
        </ScrollView>
    );
};

export default PDPScreen;