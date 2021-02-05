import React, { ReactElement, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMyTheme } from './services/themeHelper';
import { MainPage } from './views/MainPage';
import './App.css';

function App(): ReactElement {
	const [theme] = useState(createMyTheme());

	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<MainPage />
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
