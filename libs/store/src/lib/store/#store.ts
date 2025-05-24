import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withSettingsReducer } from './reducer/reducer';
import { withEffectsFeature } from './effects/effects';
import { withSettingsPersistenceFeature } from './persistence/persistance';
import { StoreType, withMetaReducer } from './meta';
import { injectDispatch } from '@ngrx/signals/events';
import { initialState, SettingsState } from './state/state';
import { settingsEvents } from './events/events';

export const SettingsStore = signalStore(
  withState<SettingsState>(initialState),
  withSettingsReducer(),
  withEffectsFeature(),
  withSettingsPersistenceFeature(),
  withMetaReducer<StoreType<SettingsState>>((ev, store) => {
    console.log(`MetaReducer: ${ev.type}`);
    console.log(store.theme());
  }),
  withHooks({
    onInit: () => {
      const dispatch = injectDispatch(settingsEvents);
      dispatch.loadSettings();
    },
  })
);
