import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product, HomeStackParamList } from '../../types/index';
import { fetchProducts } from '../../services/api';
import { colors } from '../../theme/colors';
import { SCREEN_NAMES } from '../../constants';
import Spinner from '../../components/spinner/Spinner';
import ErrorComponent from '../../components/errors/ErrorComponent';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServerUnavailableException } from '../../exceptions/CustomExceptions';
import { styles } from './PLPScreen.styles';

type ProductListNavigationProp = NativeStackNavigationProp<HomeStackParamList, typeof SCREEN_NAMES.PRODUCT_LIST>;

const ProductListingPage: React.FC<{ route: { params?: { categoryId?: string } } }> = ({ route }) => {
    const categoryId = route.params?.categoryId;
    const navigation = useNavigation<ProductListNavigationProp>();
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const buttonScale = useRef(new Animated.Value(1)).current;
    const flatListRef = useRef<FlatList>(null);
    const [isServerError, setIsServerError] = useState(false);

    const handleError = useCallback((error: unknown) => {
        if (error instanceof ServerUnavailableException) {
            setIsServerError(true);
        } else {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }, []);

    const handleSearch = useCallback(async () => {
        if (!searchText.trim()) return;

        setLoading(true);
        setError(null);
        setIsServerError(false);
        setPage(1);
        try {
            const result = await fetchProducts(searchText.trim(), 1);
            setProducts(result.products);
            setHasMore(result.hasMore);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }, [searchText, handleError]);

    const handleCategorySelect = useCallback((category: string) => {
        setSearchText(category);
        setLoading(true);
        setError(null);
        setIsServerError(false);
        setPage(1);
        fetchProducts(category, 1)
            .then(result => {
                setProducts(result.products);
                setHasMore(result.hasMore);
            })
            .catch(handleError)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (categoryId) {
            handleCategorySelect(categoryId);
        }
    }, [categoryId, handleCategorySelect]);

    const loadMore = useCallback(async () => {
        if (!loading && hasMore && !isServerError && products.length > 0) {
            setLoading(true);
            try {
                const result = await fetchProducts(searchText.trim(), page + 1);
                setProducts(prevProducts => [...prevProducts, ...result.products]);
                setPage(prevPage => prevPage + 1);
                setHasMore(result.hasMore);
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        }
    }, [loading, hasMore, searchText, page, isServerError, handleError, products.length]);

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 1.05,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handleProductPress = useCallback((productId: number) => {
        navigation.navigate(SCREEN_NAMES.PRODUCT_DETAILS, { productId: productId.toString() });
    }, [navigation]);

    const renderProductItem = useCallback(({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleProductPress(item.id)}
        >
            <FastImage source={{ uri: item.thumbnail }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    ), [handleProductPress]);

    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const renderEmptyState = () => {
        if (loading) return <Spinner size="small" color={colors.primary} />;
        if (error || isServerError) return null;

        if (!searchText && products.length === 0) {
            return (
                <View style={styles.categoryButtonsContainer}>
                    <Text style={styles.chooseCategoryText}>Choose a Category:</Text>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => handleCategorySelect('men')}
                    >
                        <Text style={styles.categoryButtonText}>Men's Collection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => handleCategorySelect('women')}
                    >
                        <Text style={styles.categoryButtonText}>Women's Collection</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (searchText && products.length === 0) {
            return (
                <Text style={styles.emptyListText}>
                    No products found. Try again.
                </Text>
            );
        }

        return null;
    };

    const renderFooter = () => {
        if (loading && products.length > 0) {
            return <Spinner size="small" color={colors.primary} />;
        }

        if (products.length > 0) {
            return (
                <TouchableOpacity style={styles.backToTopButton} onPress={scrollToTop}>
                    <Text style={styles.backToTopText}>Back to Top</Text>
                </TouchableOpacity>
            );
        }

        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Product Listing</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search products..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSearch}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            {isServerError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Server is currently unavailable. Please try again later.</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={handleSearch}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}
            {error && !isServerError && <ErrorComponent message={error} />}
            <FlatList
                ref={flatListRef}
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.uniqueId}
                contentContainerStyle={[
                    styles.productList,
                    products.length === 0 && { flexGrow: 1 }
                ]}
                ListEmptyComponent={renderEmptyState}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
};

export default React.memo(ProductListingPage);
