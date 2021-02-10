import React, { memo, useCallback, useState } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ServerContainer } from '../services/useServer';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useCurrentEffect } from 'use-current-effect';

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
			zIndex: 1,
		},
		codePenTitle: {
			flex: '1 1 auto',
			fontSize: 16,
			fontStyle: 'italic',
			color: '#fff',
			userSelect: 'none',
		},
		refreshIcon: {
			flex: '0 0 24px',
			cursor: 'pointer',
		},
		gridItemFooter: {
			position: 'absolute',
			left: 2,
			right: 2,
			bottom: 2,
			height: 28,
			backgroundColor: '#111',
			zIndex: 1,
		},
		content: {},
	}));
	const classes = useStyles();

	const [codePensInfo, setCodePensInfo] = useState<CodePenInfo[]>([]);

	const [activeTab] = useState<string>('result');

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
		const item: HTMLElement | null = document.querySelector(`.grid-item-${event.currentTarget.dataset.id}`);
		if (!item) {
			return;
		}
		const iFrame = item.querySelector('iframe');
		if (!iFrame) {
			return;
		}
		iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
	}, []);

	return (
		<Box id="HomePage" className={classes.root}>
			<Box className={classes.grid}>
				{codePensInfo.map((cpi, index) => {
					return (
						<Box key={index} className={`grid-item-${cpi.cpId} ${classes.gridItem}`}>
							<Box className={classes.gridItemHeader}>
								<Box className={classes.codePenTitle} style={{ color: cpi.color }}>
									{cpi.title}
								</Box>
								<RefreshIcon className={classes.refreshIcon} onClick={handleClickRefresh} data-id={cpi.cpId} />
							</Box>
							<Box
								className="codepen"
								data-height="300"
								data-theme-id="dark"
								data-default-tab={activeTab}
								data-pen-title={cpi.cpId}
								data-user={cpi.cpUser}
								data-slug-hash={cpi.cpId}
							/>
							<Box className={classes.gridItemFooter} />
						</Box>
					);
				})}
			</Box>
		</Box>
	);
});
