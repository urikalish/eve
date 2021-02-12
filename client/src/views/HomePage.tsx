import React, { memo, useState, useCallback, useMemo } from 'react';
import { useCurrentEffect } from 'use-current-effect';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import { ServerContainer } from '../services/useServer';
import { CodePenInfo } from '../services/codePenInfo';
import { Helper } from '../services/helper';
import { GridToolbar } from '../components/GridToolbar';
import { GridItem } from '../components/GridItem';

const widthOptions: number[] = [1, 2, 3, 4, 5, 6];
const heightOptions: number[] = [1 / 4, 1 / 3, 1 / 2, 2 / 3, 3 / 4, 1, 4 / 3, 3 / 2, 2, 3, 4];

export const HomePage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			gridTemplateRows: '40px auto',
			rowGap: 16,
		},
		toolbarContainer: {},
		gridContainer: {
			overflow: 'auto',
		},
		grid: {
			display: 'grid',
			gridGap: 16,
			//animation: 'fade-in-animation 1s ease-in-out 5s forwards',
		},
	}));
	const classes = useStyles();

	const [codePensInfo, setCodePensInfo] = useState<CodePenInfo[]>([]);
	const [numOfCols, setNumOfCols] = useState<number>(4);
	const [aspectRatio, setAspectRatio] = useState<number>(2);
	const [showCode, setShowCode] = useState<boolean>(false);

	const { getFromServer } = ServerContainer.useContainer();

	const itemHeight = useMemo(() => {
		const width = (1248 - 16 * (numOfCols - 1)) / numOfCols;
		return Math.ceil(width / aspectRatio + 78);
	}, [numOfCols, aspectRatio]);

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

	const handleChangeWidth = useCallback((inc: boolean) => {
		setNumOfCols((val) => widthOptions[widthOptions.findIndex((v) => v === val) + (inc ? -1 : 1)]);
	}, []);

	const handleChangeHeight = useCallback((inc: boolean) => {
		setAspectRatio((val) => heightOptions[heightOptions.findIndex((v) => v === val) + (inc ? -1 : 1)]);
	}, []);

	return (
		<Box id="HomePage" className={classes.root}>
			<Box className={classes.toolbarContainer}>
				<GridToolbar
					options={{
						canIncWidth: numOfCols > widthOptions[0],
						canDecWidth: numOfCols < widthOptions[widthOptions.length - 1],
						canIncHeight: aspectRatio > heightOptions[0],
						canDecHeight: aspectRatio < heightOptions[heightOptions.length - 1],
					}}
					onClickRefresh={handleClickRefresh}
					onClickCode={handleClickCode}
					onChangeWidth={handleChangeWidth}
					onChangeHeight={handleChangeHeight}
				/>
			</Box>
			<Box className={`grid-container ${classes.gridContainer}`}>
				<Box className={classes.grid} style={{ gridTemplateColumns: `repeat(${numOfCols},1fr)` }}>
					{codePensInfo.map((cpi, index) => (
						<GridItem key={index} index={index} cpi={cpi} height={itemHeight} showCode={showCode} />
					))}
				</Box>
			</Box>
		</Box>
	);
});
