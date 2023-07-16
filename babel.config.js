module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    // '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@babel/preset-modules',
    '@babel/preset-flow',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    // ['@babel/plugin-transform-class-properties', {loose: true}],
    // ['@babel/plugin-transform-private-methods', {loose: true}],
    // ['@babel/plugin-transform-private-property-in-object', {loose: true}],
    '@babel/plugin-transform-modules-commonjs',
  ],
};
