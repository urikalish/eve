import React, { memo, useCallback, useState } from 'react';
import { useCurrentEffect } from 'use-current-effect';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ServerContainer } from '../services/useServer';
import RefreshIcon from '@material-ui/icons/Refresh';
import CodeIcon from '@material-ui/icons/Code';

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
			animation: 'fade-in-animation 1s ease-in-out 3s forwards',
		},
		gridItem: {
			position: 'relative',
			height: 302,
			border: '1px solid #ccc',
			opacity: 0.9,
			zIndex: 1,
		},
		jsContainer: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			filter: 'blur(3px)',
		},
		resultContainer: {
			position: 'absolute',
			width: '100%',
			height: '100%',
		},
		gridItemHeader: {
			position: 'absolute',
			left: 2,
			right: 2,
			top: 2,
			height: 48,
			display: 'flex',
			alignItems: 'center',
			backgroundColor: '#111',
			padding: '0 16px',
			zIndex: 3,
		},
		codePenTitle: {
			flex: '1 1 auto',
			fontSize: 16,
			fontStyle: 'italic',
			color: '#fff',
			userSelect: 'none',
		},
		codeIcon: {
			flex: '0 0 24px',
			cursor: 'pointer',
		},
		refreshIcon: {
			flex: '0 0 24px',
			marginLeft: 8,
			cursor: 'pointer',
		},
		gridItemFooter: {
			position: 'absolute',
			left: 2,
			right: 2,
			bottom: 2,
			height: 28,
			backgroundColor: '#111',
			zIndex: 3,
		},
		content: {},
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
				const sc = document.createElement('script');
				sc.setAttribute('async', '""');
				sc.setAttribute('src', 'https://cpwebassets.codepen.io/assets/embed/ei.js');
				document.body.appendChild(sc);
			}, 0);
		})();
	}, []);

	const handleClickRefresh = useCallback((event: React.MouseEvent<SVGElement>) => {
		const item: HTMLElement | null = document.querySelector(`.grid-item-${event.currentTarget.dataset.itemIndex}`);
		if (!item) {
			return;
		}
		const iFrames = item.querySelectorAll('iframe');
		iFrames.forEach((iFrame) => {
			iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
		});
	}, []);

	const handleClickCode = useCallback((event: React.MouseEvent<SVGElement>) => {
		const item: HTMLElement | null = document.querySelector(`.grid-item-${event.currentTarget.dataset.itemIndex}`);
		if (!item) {
			return;
		}
		const jsContainer = item.querySelector('#js-container');
		if (jsContainer) {
			(jsContainer as HTMLElement).style.zIndex = '2';
		}
		const resultContainer = item.querySelector('#result-container');
		if (resultContainer) {
			(resultContainer as HTMLElement).style.zIndex = '1';
		}
	}, []);

	return (
		<Box id="HomePage" className={classes.root}>
			<Box className={classes.grid}>
				{codePensInfo.map((cpi, index) => {
					return (
						<Box key={index} className={`grid-item-${index} ${classes.gridItem}`}>
							<Box className={classes.gridItemHeader}>
								<Box className={classes.codePenTitle} style={{ color: cpi.color }}>
									{cpi.title}
								</Box>
								<CodeIcon className={classes.codeIcon} onClick={handleClickCode} data-item-index={index} />
								<RefreshIcon className={classes.refreshIcon} onClick={handleClickRefresh} data-item-index={index} />
							</Box>
							<Box id="js-container" className={classes.jsContainer}>
								<Box
									className="codepen"
									data-height="300"
									data-theme-id="dark"
									data-default-tab="js"
									data-pen-title={cpi.cpId}
									data-user={cpi.cpUser}
									data-slug-hash={cpi.cpId}
								/>
							</Box>
							<Box id="result-container" className={classes.resultContainer}>
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
							<Box className={classes.gridItemFooter} />
						</Box>
					);
				})}
			</Box>
		</Box>
	);
});
