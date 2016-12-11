import config from '../config';

export default function composeApiUrl (uri) {
	return config.api_url + uri;
}
