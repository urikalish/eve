import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const HomePage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
		},
		grid: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr',
			gridGap: 16,
		},
		section: {
			position: 'relative',
			marginBottom: 16,
			opacity: 0.9,
		},
		blurCode: {
			filter: 'blur(3px)',
		},
		content: {},
	}));
	const classes = useStyles();

	return (
		<Box id="HomePage" className={classes.root}>
			<Box className={classes.grid}>
				<Box className={`${classes.section} ${classes.blurCode}`}>
					<p
						className="codepen"
						data-height="250"
						data-theme-id="dark"
						data-default-tab="js"
						data-user="urikalish"
						data-slug-hash="RworEBK"
						data-pen-title="RworEBK"
						style={{
							height: '250px',
							boxSizing: 'border-box',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: '0 solid',
							margin: '1em 0',
							padding: '1em',
						}}
					/>
				</Box>
				<Box className={classes.section}>
					<p
						className="codepen"
						data-height="250"
						data-theme-id="dark"
						data-default-tab="result"
						data-user="urikalish"
						data-slug-hash="ZEBGVVY"
						data-pen-title="ZEBGVVY"
						style={{
							height: '250px',
							boxSizing: 'border-box',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: '0 solid',
							margin: '1em 0',
							padding: '1em',
						}}
					/>
				</Box>
				<Box className={classes.section}>
					<p
						className="codepen"
						data-height="250"
						data-theme-id="dark"
						data-default-tab="result"
						data-user="urikalish"
						data-slug-hash="yLVeGzq"
						data-pen-title="yLVeGzq"
						style={{
							height: '250px',
							boxSizing: 'border-box',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: '0 solid',
							margin: '1em 0',
							padding: '1em',
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
});
