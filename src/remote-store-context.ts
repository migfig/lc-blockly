import { IDataContext } from './types';
import LocalDataContext from './local-store-context';

const remoteDataContext: IDataContext = {
    whoAmI: 'remote context',
    store: LocalDataContext.store,
    api: {
        buildLangChain: async (elements: any) => '',
    }
}

export default remoteDataContext;
