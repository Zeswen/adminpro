import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(public _settings: SettingsService) {}

  ngOnInit() {
    this.applyCheck();
  }

  changeColor(theme: string) {
    this._settings.applyTheme(theme);
    this.applyCheck();
  }

  applyCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme: string = this._settings.settings.theme;
    for (const selector of selectors) {
      if (selector.getAttribute('data-theme') === theme) {
        selector.classList.add('working');
      } else {
        selector.classList.remove('working');
      }
    }
  }
}
