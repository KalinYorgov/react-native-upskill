import React from 'react';
import { Container } from '../../components/base/Container';
import CustomWebView from '../../components/base/CustomWebView';
import { helpDeskUrl } from '../../services/config';

const HelpDeskScreen: React.FC = () => {
    return (
        <Container>
            <CustomWebView
                source={{ uri: helpDeskUrl }}
                requiresCamera={true}
            />
        </Container>
    );
};

export default HelpDeskScreen;