import { useCallback, useRef } from 'react';
import { createContainer } from 'unstated-next';
import Axios, { AxiosInstance } from 'axios';

const useServer = () => {
	const axios = useRef<AxiosInstance>(Axios.create({}));

	const getFromServer = useCallback<(url: string) => Promise<string>>(async (url: string) => {
		try {
			const response = await axios.current.get(url);
			return JSON.stringify(response.data);
		} catch (err) {
			return '';
		}
	}, []);

	return {
		getFromServer,
	};
};

export const ServerContainer = createContainer(useServer);
