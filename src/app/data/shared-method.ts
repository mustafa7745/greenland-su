import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { ApiFormData } from './form-data';
import { SharedNavigate } from './shared-navigate';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalString } from './global-string';
import { Urls } from './urls';
import { CRPT } from '../crpt';
import JSEncrypt from 'jsencrypt';
import { CustomModal } from './shared/modal';
import { ResquestServer } from './shared/requestServer';
export class SharedMethod {
  customModal = new CustomModal();
  private _platformId = inject(PLATFORM_ID);
  sharedNavigate = new SharedNavigate();
  globalString = new GlobalString();
  apiFormData = new ApiFormData();
  urls = new Urls();
  cate_prod_controller: any;
  jsEncrypt = new JSEncrypt();
  crpt = new CRPT();

  loginLocalstorage = 'islogin';
  browserPlatform(data: () => void) {
    if (isPlatformBrowser(this._platformId)) {
      data();
    }
  }

  decryptAndSetLogin(res: any) {
    const encryptedData = JSON.parse(res);

    var loginTokenData = this.crpt.decrypt(encryptedData.encrypted_data);
    if (loginTokenData != false) {
      this.setLoginData(encryptedData.encrypted_data);
      this.sharedNavigate.navigateToHome();
    }
  }

  setLoginData(data: string) {
    localStorage.setItem(this.loginLocalstorage, data);
  }
  getLoginData() {
    const data = localStorage.getItem(this.loginLocalstorage);
    if (data != null) {
      var loginTokenData = this.crpt.decrypt(data);
      if (loginTokenData == null) {
        return false;
      }

      return loginTokenData;
    }
    return false;
  }
  removeLogin() {
    localStorage.removeItem(this.loginLocalstorage);
  }
}
