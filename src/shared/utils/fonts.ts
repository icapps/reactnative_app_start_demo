import { Platform } from 'react-native';

export const fonts = {
  bold: Platform.select({
    default: 'SpaceGrotesk_700Bold',
    ios: 'SpaceGrotesk-Bold',
  }),
  regular: Platform.select({
    default: 'SpaceGrotesk_400Regular',
    ios: 'SpaceGrotesk-Regular',
  }),
  semiBold: Platform.select({
    default: 'SpaceGrotesk_600SemiBold',
    ios: 'SpaceGrotesk-SemiBold',
  }),
};
