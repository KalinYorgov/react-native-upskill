import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import ErrorComponent from '../errors/ErrorComponent';
import { styles } from './ColorVariations.styles';

interface ColorVariation {
    color: string;
    thumbnail: string;
    product_id: string;
    isCurrentColor: boolean;
}

interface ColorVariationsProps {
    variations: ColorVariation[];
    onVariationPress: (variationId: string) => void;
    onImageError: (productId: string) => void;
    imageErrors: Record<string, boolean>;
}

const ColorVariations: React.FC<ColorVariationsProps> = ({
    variations,
    onVariationPress,
    onImageError,
    imageErrors
}) => {
    if (!variations.length) {
        return null;
    }

    const uniqueVariations = variations.reduce((acc: ColorVariation[], curr) => {
        const existingIndex = acc.findIndex(item => item.color === curr.color);
        if (existingIndex === -1) {
            acc.push(curr);
        }
        return acc;
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Colors</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {uniqueVariations.map((variation) => (
                    <TouchableOpacity
                        key={variation.product_id}
                        style={[
                            styles.variationItem,
                            variation.isCurrentColor && styles.selectedVariationItem
                        ]}
                        onPress={() => onVariationPress(variation.product_id)}
                    >
                        {imageErrors[variation.product_id] ? (
                            <View style={[styles.variationImage, styles.errorContainer]}>
                                <ErrorComponent message="Failed to load thumbnail" />
                            </View>
                        ) : (
                            <Image
                                source={{ uri: variation.thumbnail }}
                                style={styles.variationImage}
                                onError={() => onImageError(variation.product_id)}
                            />
                        )}
                        <Text style={styles.variationColor}>{variation.color}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default ColorVariations;