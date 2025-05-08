import { Injectable } from '@angular/core';
import { RemoteConfig, getValue, fetchAndActivate } from '@angular/fire/remote-config';

/**
 * Servicio para manejar la configuración remota de la aplicación usando Firebase Remote Config.
 * 
 * @description
 * Este servicio permite:
 * - Obtener configuraciones remotas desde Firebase
 * - Manejar feature flags y configuraciones dinámicas
 * - Actualizar configuraciones en tiempo real
 */
@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  constructor(private remoteConfig: RemoteConfig) {}

    /**
   * Obtiene el valor de una configuración remota
   * @param featureKey - La clave de la configuración a obtener
   * @returns El valor de la configuración como string
   */
  async isFeatureEnabled(featureKey: string): Promise<boolean> {
    await fetchAndActivate(this.remoteConfig);
    const val = getValue(this.remoteConfig, featureKey).asBoolean();
    return val;
  }
}
