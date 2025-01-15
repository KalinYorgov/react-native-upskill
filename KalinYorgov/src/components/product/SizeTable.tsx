import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './SizeTable.styles';

interface SizeTableProps {
    sizes: string[];
    selectedSize: string | null;
    onSizeSelect: (size: string) => void;
}

const SizeTable: React.FC<SizeTableProps> = ({ sizes, selectedSize, onSizeSelect }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Size</Text>
            {(!sizes || sizes.length === 0) ? (
                <Text style={styles.noSizesText}>No sizes available</Text>
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.sizesContainer}
                >
                    {sizes.map((size) => (
                        <TouchableOpacity
                            key={size}
                            style={[
                                styles.sizeButton,
                                selectedSize === size && styles.selectedSizeButton
                            ]}
                            onPress={() => onSizeSelect(size)}
                        >
                            <Text
                                style={[
                                    styles.sizeText,
                                    selectedSize === size && styles.selectedSizeText
                                ]}
                            >
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default SizeTable;
