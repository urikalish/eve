import React, { memo, useCallback, useState } from 'react';
import { useCurrentEffect } from 'use-current-effect';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ServerContainer } from '../services/useServer';
import { CodePenInfo } from '../services/codePenInfo';
import { Helper } from '../services/helper';
import { GridToolbar } from '../components/GridToolbar';
import { GridItem } from '../components/GridItem';

export const HomePage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			gridTemplateRows: '30px auto',
			rowGap: 16,
		},
		toolbarContainer: {},
		gridContainer: {
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

	const [showCode, setShowCode] = useState<boolean>(false);

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

	const handleClickRefresh = useCallback(() => {
		const iFrames = document.querySelectorAll('iframe');
		iFrames.forEach((iFrame) => {
			iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
		});
	}, []);

	const handleClickCode = useCallback(() => {
		setShowCode((val) => !val);
	}, []);

	return (
		<Box id="HomePage" className={classes.root}>
			<Box className={classes.toolbarContainer}>
				<GridToolbar onClickRefresh={handleClickRefresh} onClickCode={handleClickCode} />
			</Box>
			<Box className={`grid-container ${classes.gridContainer}`}>
				<Box className={classes.grid}>
					{codePensInfo.map((cpi, index) => {
						return <GridItem key={index} index={index} cpi={cpi} showCode={showCode} />;
					})}
				</Box>
			</Box>
		</Box>
	);
});
