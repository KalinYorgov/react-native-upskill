import React from 'react';
import { ErrorProps } from '../../interface/ErrorProps';
import { Container } from '../base/Container';
import { Typography } from '../base/Typography';
import { styles } from './ErrorComponent.styles';

const ErrorComponent: React.FC<ErrorProps> = ({ message }) => (
    <Container style={styles.container}>
        <Typography style={styles.errorText}>{message}</Typography>
    </Container>
);

export default ErrorComponent;
