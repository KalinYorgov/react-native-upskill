const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg').concat(['json', 'png', 'jpg', 'jpeg', 'gif']),
        sourceExts: getDefaultConfig(__dirname).resolver.sourceExts.concat(['svg']),
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
