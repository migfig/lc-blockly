import React from 'react';

import { IDataContext } from './types';

const DataContext = React.createContext<IDataContext>({
    whoAmI: 'unknown context',
    store: {
        getApplications: () => [],
        setApplications: (apps) => { },
        getSelectedApplicationId: () => '',
        setSelectedApplicationId: (id) => { },
        getTopMenu: () => [],
        getLeftMenu: () => [],
        setLeftMenu: (menu) => { },
    },
    api: {
        buildLangChain: async (elements: any) => null,
    }
});

export default DataContext;