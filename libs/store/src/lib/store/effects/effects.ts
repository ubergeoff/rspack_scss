import { inject } from '@angular/core';
import { signalStoreFeature } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';
import { settingsApiEvents } from '../events/events';
import { map } from 'rxjs';

export function withEffectsFeature() {
  return signalStoreFeature(
    withEffects((store, events = inject(Events)) => ({
      loadTheme$: events
        .on(settingsApiEvents.settingsSaved, settingsApiEvents.settingsLoaded)
        .pipe(map(({ payload }) => document.documentElement.setAttribute('data-theme', payload.settings.theme))),
    }))
  );
}
