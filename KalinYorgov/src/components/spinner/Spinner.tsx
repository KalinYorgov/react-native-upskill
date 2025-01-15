import React from 'react';
import { ActivityIndicator, View } from "react-native";
import { SpinnerProps } from "../../interface/SpinnerProps";
import { styles } from './Spinner.styles';

const Spinner: React.FC<SpinnerProps> = ({ size, color, fullScreen }) => {
    return (
        <View style={fullScreen ? styles.fullScreenContainer : styles.normal}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
};

export default Spinner;
