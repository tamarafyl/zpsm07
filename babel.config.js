module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // цей рядок має бути останнім у списку plugins!
  ],
};