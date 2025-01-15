import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { styles } from './Description.styles';

interface DescriptionProps {
    description: string;
    shortDescription?: string;
    longDescription?: string;
}

const Description: React.FC<DescriptionProps> = ({
    description,
    shortDescription,
    longDescription
}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { width } = useWindowDimensions();

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const baseStyle = {
        color: styles.description.color,
        fontSize: styles.description.fontSize,
        lineHeight: styles.description.lineHeight
    };

    const renderConfig = useMemo(() => ({
        tagsStyles: {
            ul: {
                marginLeft: 20,
                marginVertical: 8
            },
            li: {
                marginBottom: 8,
                ...baseStyle
            },
            p: {
                marginVertical: 8,
                ...baseStyle
            },
            body: baseStyle
        },
        defaultTextProps: {
            selectable: true
        },
        enableCSSInlineProcessing: true,
        computeEmbeddedMaxWidth: (availableWidth: number) => {
            return Math.min(availableWidth, width - 32);
        }
    }), [width]);

    return (
        <View style={styles.detailsContainer}>
            {shortDescription && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <Text style={styles.description}>{shortDescription}</Text>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{description}</Text>
            </View>

            {longDescription && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <View style={[
                        styles.longDescription,
                        !showFullDescription && styles.collapsed
                    ]}>
                        <RenderHtml
                            contentWidth={width - 32}
                            source={{ html: longDescription }}
                            renderersProps={{
                                img: {
                                    enableExperimentalPercentWidth: true
                                }
                            }}
                            {...renderConfig}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={toggleDescription}
                    >
                        <Text style={styles.toggleButtonText}>
                            {showFullDescription ? 'Show Less' : 'Show More'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Description;