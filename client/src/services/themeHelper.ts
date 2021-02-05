import blueGrey from '@material-ui/core/colors/blueGrey';
import common from '@material-ui/core/colors/common';
import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const createMyTheme: () => Theme = () => {
	return createMuiTheme({
		palette: {
			type: 'dark',
			background: {
				default: blueGrey[900],
				paper: blueGrey[800],
			},
			text: {
				primary: common.white,
				secondary: grey[300],
			},
			secondary: {
				main: '#d45',
				dark: '#c45',
				contrastText: common.white,
			},
		},
		typography: {
			fontFamily: [
				'Play',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
		},
	});
};
