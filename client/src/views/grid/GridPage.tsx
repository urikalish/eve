import React, { memo, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentEffect } from 'use-current-effect';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import { ServerContainer } from '../../services/useServer';
import { GridInfo } from './gridInfo';
import { CodePenInfo } from './codePenInfo';
import { GridToolbar } from './GridToolbar';
import { GridItem } from './GridItem';

const columnNumberValues: number[] = [1, 2, 3, 4, 5];
const aspectRatioValues: number[] = [1 / 3, 1 / 2, 2 / 3, 3 / 4, 1, 4 / 3, 3 / 2, 2, 3];

export const GridPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			gridTemplateRows: '24px auto',
			rowGap: 16,
			userSelect: 'none',
		},
		toolbarContainer: {},
		gridContainer: {
			overflow: 'auto',
		},
		grid: {
			display: 'grid',
			gridGap: 16,
		},
	}));
	const classes = useStyles();

	const routerParams = JSON.parse(JSON.stringify(useParams()));
	const id = routerParams.id;

	const [codePensInfo, setCodePensInfo] = useState<CodePenInfo[]>([]);
	const [columnNumber, setColumnNumber] = useState<number>(4);
	const [aspectRatio, setAspectRatio] = useState<number>(2);
	const [showCode, setShowCode] = useState<boolean>(false);

	const { getFromServer } = ServerContainer.useContainer();

	const itemHeight = useMemo(() => {
		const width = (1248 - 16 * (columnNumber - 1)) / columnNumber;
		return Math.round(width / aspectRatio + 80);
	}, [columnNumber, aspectRatio]);

	useCurrentEffect((isCurrent) => {
		(async () => {
			const data = await getFromServer(`/api/grids/${id}`);
			if (!data || !isCurrent()) {
				return;
			}
			const gridInfo: GridInfo = JSON.parse(data).gridInfo;
			if (!gridInfo) {
				return;
			}
			const codePenInfo: CodePenInfo[] = gridInfo.codePens;
			setCodePensInfo(codePenInfo);
			setTimeout(() => {
				if (!isCurrent()) {
					return;
				}
				const script = document.createElement('script');
				script.setAttribute('id', 'codePenEmbedScript');
				script.setAttribute('async', '""');
				script.setAttribute('src', 'https://cpwebassets.codepen.io/assets/embed/ei.js');
				document.body.appendChild(script);
			}, 0);
		})();
	}, []);

	const handleClickRefresh = useCallback(() => {
		const iFrames = document.querySelectorAll('iframe');
		iFrames.forEach((iFrame) => {
			iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
		});
	}, []);

	const handleToggleCode = useCallback(() => {
		setShowCode((val) => !val);
	}, []);

	const handleChangeColumnNumber = useCallback((inc: boolean) => {
		setColumnNumber((val) => columnNumberValues[columnNumberValues.findIndex((v) => v === val) + (inc ? -1 : 1)]);
	}, []);

	const handleChangeAspectRatio = useCallback((inc: boolean) => {
		setAspectRatio((val) => aspectRatioValues[aspectRatioValues.findIndex((v) => v === val) + (inc ? -1 : 1)]);
	}, []);

	return (
		<Box id="GridPage" className={classes.root}>
			<Box className={classes.toolbarContainer}>
				<GridToolbar
					options={{
						canShowCode: !showCode,
						canIncWidth: columnNumber > columnNumberValues[0],
						canDecWidth: columnNumber < columnNumberValues[columnNumberValues.length - 1],
						canIncHeight: aspectRatio > aspectRatioValues[0],
						canDecHeight: aspectRatio < aspectRatioValues[aspectRatioValues.length - 1],
					}}
					onClickRefresh={handleClickRefresh}
					onToggleCode={handleToggleCode}
					onChangeColumnNumber={handleChangeColumnNumber}
					onChangeAspectRatio={handleChangeAspectRatio}
				/>
			</Box>
			<Box className={`grid-container ${classes.gridContainer}`}>
				<Box className={classes.grid} style={{ gridTemplateColumns: `repeat(${columnNumber},1fr)` }}>
					{codePensInfo.map((cpi, index) => (
						<GridItem key={index} index={index} cpi={cpi} height={itemHeight} showCode={showCode} />
					))}
				</Box>
			</Box>
		</Box>
	);
});
