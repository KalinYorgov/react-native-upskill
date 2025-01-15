import React from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './Typography.styles';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption';

export interface TypographyProps extends TextProps {
    variant?: TypographyVariant;
}

export const Typography: React.FC<TypographyProps> = ({
    children,
    style,
    variant = 'body1',
    ...props
}) => {
    return (
        <Text
            style={[styles[variant], style]}
            {...props}
        >
            {children}
        </Text>
    );
};
