import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const HomePage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
		},
		section: {
			marginBottom: 20,
			opacity: 0.8,
		},
		content: {},
	}));
	const classes = useStyles();

	return (
		<Box id="HomePage" className={classes.root}>
			<Box className={classes.section}>
				<p
					className="codepen"
					data-height="300"
					data-theme-id="dark"
					data-default-tab="js"
					data-user="urikalish"
					data-slug-hash="ZEBGVVY"
					data-pen-title="ZEBGVVY"
					style={{
						height: '300px',
						boxSizing: 'border-box',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px solid',
						margin: '1em 0',
						padding: '1em',
					}}
				/>
			</Box>
			<Box className={classes.section}>
				<p
					className="codepen"
					data-height="300"
					data-theme-id="dark"
					data-default-tab="result"
					data-user="urikalish"
					data-slug-hash="RworEBK"
					data-pen-title="RworEBK"
					style={{
						height: '300px',
						boxSizing: 'border-box',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px solid',
						margin: '1em 0',
						padding: '1em',
					}}
				/>
			</Box>
			<Box className={classes.section}>
				<p
					className="codepen"
					data-height="300"
					data-theme-id="dark"
					data-default-tab="result"
					data-user="urikalish"
					data-slug-hash="yLVeGzq"
					data-pen-title="yLVeGzq"
					style={{
						height: '300px',
						boxSizing: 'border-box',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px solid',
						margin: '1em 0',
						padding: '1em',
					}}
				/>
			</Box>
		</Box>
	);
});
