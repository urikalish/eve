import React, { memo, useState } from 'react';
import { useCurrentEffect } from 'use-current-effect';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ServerContainer } from '../services/useServer';
import { CodePenInfo } from '../services/codePenInfo';
import { GridItem } from '../components/GridItem';
import { Helper } from '../services/helper';

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
			opacity: 1,
			//animation: 'fade-in-animation 1s ease-in-out 5s forwards',
		},
	}));
	const classes = useStyles();

	const [codePensInfo, setCodePensInfo] = useState<CodePenInfo[]>([]);

	const { getFromServer } = ServerContainer.useContainer();

	useCurrentEffect((isCurrent) => {
		(async () => {
			const data = await getFromServer('/codepens');
			if (!data || !isCurrent()) {
				return;
			}
			const codePenInfo: CodePenInfo[] = JSON.parse(data).codePens;
			setCodePensInfo(codePenInfo);
			setTimeout(() => {
				if (!isCurrent()) {
					return;
				}
				Helper.loadCodePenScript();
			}, 0);
		})();
	}, []);

	return (
		<Box id="HomePage" className={classes.root}>
			<Box className={classes.grid}>
				{codePensInfo.map((cpi, index) => {
					return <GridItem key={index} index={index} cpi={cpi} />;
				})}
			</Box>
		</Box>
	);
});
