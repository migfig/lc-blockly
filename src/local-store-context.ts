import {
    faFolderOpen,
    faSave,
    faPlusSquare,
    faLightbulb,
    faFileImage,
    faArrowAltCircleDown
} from "@fortawesome/free-regular-svg-icons";
import { newApp, APPLICATIONS_KEY, SELECTED_APPLICATION_ID_KEY } from './utils';
import { IDataContext, IApplication, ILeftMenu } from './types';
import config from './config';

const sampleApplications = require('./blocks/json-definitions/sample-applications.json');

const getDefaultApp = () => {
    const applications = [newApp()];
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
    localStorage.setItem(SELECTED_APPLICATION_ID_KEY, applications[0].id);
    return applications;
}
const _getApplications = (): IApplication[] =>
    JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]') || getDefaultApp();

const _getSelectedApplicationId = (): string =>
    localStorage.getItem(SELECTED_APPLICATION_ID_KEY) || '';

let _leftMenu: ILeftMenu[] = [
    {
        label: 'Applications',
        link: '#applications',
        icon: faFolderOpen,
        items: _getApplications(),
    }
];

const _requestOptions = (method: string = 'get', mimeType: string = 'application/json'): RequestInit => ({
    method: method,
    mode: 'cors',
    headers: {
        'Accept': mimeType
    },
});

const localDataContext: IDataContext = {
    whoAmI: 'local context',
    store: {
        getApplications: _getApplications,
        setApplications: (apps) => localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps)),
        getSelectedApplicationId: _getSelectedApplicationId,
        setSelectedApplicationId: (id) => localStorage.setItem(SELECTED_APPLICATION_ID_KEY, id),
        getTopMenu: () => [
            {
                label: 'New',
                link: '#new',
                icon: faPlusSquare,
                options: undefined,
            },
            {
                label: '+ Sample',
                link: '#add-sample',
                icon: faLightbulb,
                options: sampleApplications.map((app: IApplication) => (
                    {
                        label: app.name,
                        link: '#add-sample',
                        icon: faFileImage,
                        app
                    }
                ))
            },
            {
                label: 'Download',
                link: '#download',
                icon: faArrowAltCircleDown,
                options: undefined,
            },
            {
                label: 'Save',
                link: '#save',
                icon: faSave,
                options: undefined,
            }
        ],
        getLeftMenu: () => _leftMenu,
        setLeftMenu: (menu) => _leftMenu = [...menu],
    },
    api: {
        buildLangChain: async (elements: any) => {
            const reqOptions = _requestOptions('post');
            const res = await fetch(`${config.apiUrl}/build-app`, {
                ...reqOptions,
                headers: {
                    ...reqOptions.headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(elements),
            });
            const json = await res.json();
            return json;
        },
    }
}

export default localDataContext;
