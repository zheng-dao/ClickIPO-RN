import ReduxPersist from '../Config/ReduxPersist'
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore } from 'redux-persist'
import StartupActions from '../Redux/StartupRedux'
import Logger from '../Lib/Logger'

const updateReducers = (store: Object) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig
  const startup = () => store.dispatch(StartupActions.startup())

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Logger.log({ name: 'PURGE', value: { 'Old Version:': localVersion, 'New Version:': reducerVersion }, preview: 'Reducer Version Change Detected', important: true })

      // Purge store
      persistStore(store, config, startup).purgeAll()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, config, startup)
    }
  }).catch(() => {
    persistStore(store, config, startup)
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}

export default {updateReducers}