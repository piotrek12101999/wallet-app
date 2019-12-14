import { IThemes } from './models/ui.interfaces';
import { Color } from '@material-ui/core';

export const lightThemeColor: Color = {
  50: '#dff7f9',
  100: '#7edde5',
  200: '#49ceda',
  300: '#49ceda',
  400: '#1dc4d3',
  500: '#00bacd',
  600: '#00aaba',
  700: '#0095a1',
  800: '#008189',
  900: '#005e5f',
  A100: '#1dc4d3',
  A200: '#1dc4d3',
  A400: '#1dc4d3',
  A700: '#1dc4d3'
};

export const secondaryLigthThemeColor: Color = {
  50: '#1F3077',
  100: '#1F3077',
  200: '#1F3077',
  300: '#1F3077',
  400: '#1F3077',
  500: '#1F3077',
  600: '#1F3077',
  700: '#1F3077',
  800: '#1F3077',
  900: '#1F3077',
  A100: '#1F3077',
  A200: '#1F3077',
  A400: '#1F3077',
  A700: '#1F3077'
}

export const themes: IThemes = {
  global: {
    borderRadius: 8,
    fontFamily: '"Overpass",sans-serif'
  },
  light: {
    background: '#f8f9f9',
    primaryColor: '#1DC5D3',
    navColor: '#ffffff',
    gridColor: '#ffffff',
    backgroundOnPrimaryColor: '#D1F7F7',
    secondaryColor: '#F4465A',
    fontColor: '#1F3077',
    secondaryFontColor: '#858eb4'
  },
  dark: {
    background: '#121212',
    primaryColor: '#BB86FC',
    navColor: '#2D2D2D',
    gridColor: '#1E1E1E',
    backgroundOnPrimaryColor: '#121212',
    secondaryColor: '#03DAC6',
    fontColor: '#fff',
    secondaryFontColor: '#A09FA5'
  }
};
