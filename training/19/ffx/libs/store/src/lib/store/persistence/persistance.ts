import { inject } from '@angular/core';
import { signalStoreFeature, type } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';
import { map } from 'rxjs';
import { SettingsState } from '../state/state';
import { settingsApiEvents, settingsEvents } from '../events/events';

export function withSettingsPersistenceFeature<_>() {
  return signalStoreFeature(
    { state: type<SettingsState>() },
    withEffects((store, events = inject(Events)) => ({
      saveSettings$: events.on(settingsEvents.saveSettings).pipe(
        map(() =>
          settingsApiEvents.settingsSaved({
            settings: {
              theme: store.theme(),
              notifications: store.notifications(),
              language: store.language(),
              lastUpdated: new Date().toISOString(),
            },
          })
        )
      ),
    }))
  );
}
