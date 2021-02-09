import React, { memo, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ServerContainer } from '../services/useServer';

interface CodePenInfo {
	title: string;
	color?: string;
	cpUser: string;
	cpId: string;
}

export const HomePage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			overflow: 'auto',
		},
		grid: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr',
			gridGap: 16,
			opacity: 0,
			animation: 'fade-in-animation 3s ease-in-out forwards',
		},
		section: {
			position: 'relative',
			opacity: 0.9,
		},
		codePenTitle: {
			position: 'absolute',
			left: 9,
			top: 46,
			color: '#fff',
		},
		blurCode: {
			filter: 'blur(3px)',
		},
		content: {},
	}));
	const classes = useStyles();

	const [codePensInfo, setCodePensInfo] = useState<CodePenInfo[]>([]);

	const { getFromServer } = ServerContainer.useContainer();

	useEffect(() => {
		(async () => {
			const data = await getFromServer('/codepens');
			if (!data) {
				return;
			}
			const codePenInfo: CodePenInfo[] = JSON.parse(data).codePens;
			setCodePensInfo(codePenInfo);

			setTimeout(() => {
				const sc = document.createElement('script');
				sc.setAttribute('async', '""');
				sc.setAttribute('src', 'https://cpwebassets.codepen.io/assets/embed/ei.js');
				document.body.appendChild(sc);
			}, 0);
		})();
	}, []);

	return (
		<Box id="HomePage" className={classes.root}>
			<Box className={classes.grid}>
				{codePensInfo.map((cpi, index) => {
					return (
						<Box key={index} className={`${classes.section}`}>
							<Box className={classes.codePenTitle} style={{ color: cpi.color }}>
								{cpi.title}
							</Box>
							<Box
								className="codepen"
								data-height="300"
								data-theme-id="dark"
								data-default-tab="result"
								data-pen-title={cpi.cpId}
								data-user={cpi.cpUser}
								data-slug-hash={cpi.cpId}
							/>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
});
