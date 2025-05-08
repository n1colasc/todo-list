import { Component, OnInit } from '@angular/core';
import { RemoteConfigService } from 'src/app/core/services/remote-config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  valFeature = false;
  constructor(private remoteConfigService: RemoteConfigService) { }

  async ngOnInit() {
    await this.handleCheckVal();
  }

  async handleCheckVal(){
    this.valFeature = await this.remoteConfigService.isFeatureEnabled("AddTaskIsEnabled");
  }

}
