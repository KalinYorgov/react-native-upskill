import React from 'react';
import { View, ViewProps, ScrollView, ScrollViewProps } from 'react-native';
import { styles } from './Container.styles';

export interface ContainerProps extends ViewProps {
    scroll?: boolean;
    scrollProps?: Omit<ScrollViewProps, keyof ViewProps>;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    style,
    scroll,
    scrollProps,
    ...props
}) => {
    const Component = scroll ? ScrollView : View;
    const combinedStyle = [styles.container, style];

    return (
        <Component
            style={combinedStyle}
            {...(scroll ? scrollProps : {})}
            {...props}
        >
            {children}
        </Component>
    );
};
