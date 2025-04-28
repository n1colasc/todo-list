import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  constructor(private remoteConfig: RemoteConfig) {}

  async isFeatureEnabled(featureKey: string): Promise<boolean> {
    await fetchAndActivate(this.remoteConfig);
    return getValue(this.remoteConfig, featureKey).asBoolean();
  }
}
