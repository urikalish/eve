import React, { memo, useState, useCallback, useMemo } from 'react';
import { useCurrentEffect } from 'use-current-effect';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import { LocalStorageHelper } from '../../services/localStorageHelper';
import { CodePenScriptHelper } from '../../services/codePenScriptHelper';
import { useWindowSize } from '../../hooks/useWindowSize';
import { GridInfo } from '../../services/gridInfo';
import { CodePenInfo } from '../../services/codePenInfo';
import { GridToolbar } from './GridToolbar';
import { GridItem } from './GridItem';
// import { useParams } from 'react-router-dom';
// import { ServerContainer } from '../../services/useServer';

const columnNumberValues: number[] = [1, 2, 3, 4, 5, 6, 7];
const aspectRatioValues: number[] = [1 / 3, 1 / 2, 2 / 3, 3 / 4, 1, 4 / 3, 3 / 2, 2, 3];

export const GridPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			gridTemplateRows: '32px auto',
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
			//opacity: 0,
			//animation: 'fade-in-animation 1s 1s ease-in-out forwards',
		},
	}));
	const classes = useStyles();

	//const routerParams = JSON.parse(JSON.stringify(useParams()));
	//const id = routerParams.id;

	const [codePensInfo, setCodePensInfo] = useState<CodePenInfo[]>([]);
	const [columnNumber, setColumnNumber] = useState<number>(5);
	const [aspectRatio, setAspectRatio] = useState<number>(2);
	const [showCode, setShowCode] = useState<boolean>(false);
	const size = useWindowSize();
	//const { getFromServer } = ServerContainer.useContainer();

	const itemHeight = useMemo(() => {
		const windowWidth = size.width || window.innerWidth;
		const paddingSize = 32 * 2;
		const gridGap = 16;
		const width = (windowWidth - paddingSize - gridGap * (columnNumber - 1)) / columnNumber;
		return Math.round(width / aspectRatio + 80);
	}, [useWindowSize, columnNumber, aspectRatio]);

	const loadAndRefresh = async (isCurrent?: () => boolean) => {
		debugger;
		const gridInfo: GridInfo | null = LocalStorageHelper.load();
		if (!gridInfo) {
			return;
		}
		const info: CodePenInfo[] = gridInfo.codePens;
		setCodePensInfo(info);
		setTimeout(() => {
			if (isCurrent !== undefined && !isCurrent()) {
				return;
			}
			CodePenScriptHelper.appendScript();
			const iFrames = document.querySelectorAll('iframe');
			iFrames.forEach((iFrame) => {
				iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
			});
		}, 0);
	};

	useCurrentEffect((isCurrent) => {
		// const data = await getFromServer(`/api/grids/${id}`);
		// if (!data || !isCurrent()) {
		// 	return;
		// }
		// const gridInfo: GridInfo = JSON.parse(data).gridInfo;
		loadAndRefresh(isCurrent).then();
	}, []);

	const handleClickRefresh = useCallback(() => {
		loadAndRefresh().then();
	}, []);

	const handleChangeItem = useCallback((index: number) => {
		const cpi = LocalStorageHelper.getCodePenInfo(index);
		if (cpi) {
			setCodePensInfo((info) => {
				info[index] = cpi;
				return info;
			});
		}
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
			<Box className={`${classes.gridContainer} no-scrollbar`}>
				<Box className={classes.grid} style={{ gridTemplateColumns: `repeat(${columnNumber},1fr)` }}>
					{codePensInfo.map((cpi, index) => (
						<GridItem key={index} index={index} cpi={cpi} height={itemHeight} showCode={showCode} onChangeItem={handleChangeItem} />
					))}
				</Box>
			</Box>
		</Box>
	);
});
