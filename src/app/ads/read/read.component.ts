import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../data/shared/requestServer';
import { ProductsModal } from '../../products/read/read.component';
import { ProductsGroupsModal } from '../../products_groups/read/read.component';
import { ModalUpdateCategoryName } from '../update/name/update.component';
import { ModalUpdateCategoryImage } from '../update/image/update.component';
import { ModalAddAds } from '../add/add.component';
import { ModalUpdateAdsAvailable } from '../update/available/update.component';

@Component({
  selector: 'ads',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
})
export class AdsComponent {
  requestServer = new ResquestServer();
  isSearchMode = false;
  searchText = '';
  //
  isError = false;
  error = '';
  //
  isLoading = true;
  isLoadingSearch = false;
  //
  resultData: any[] = [];
  ngOnInit() {
    this.requestServer.sharedMethod.browserPlatform(async () => {
      this.read();
    });
  }
  async read() {
    this.isLoading = true;
    this.isError = false;
    const data3 = {
      tag: 'read',
    };
    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.adsUrl,
      (res) => {
        this.isLoading = false;
        this.isError = false;
        // this.resultData = res;
        const data = JSON.parse(res);
        this.resultData = data;
      },
      (e) => {
        this.isLoading = false;
        this.isError = true;
        this.error = e;
      }
    );
  }
  search() {}
  add() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalAddAds,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.result.then((r) => {
      this.resultData.push(JSON.parse(r));
    });
  }
  openProducts(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ProductsModal,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
        fullscreen: true,
      }
    );
    a.componentInstance.onOpen(item);
  }
  openProductsGroups(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ProductsGroupsModal,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
        fullscreen: true,
      }
    );
    a.componentInstance.onOpen(item);
  }
  openModalUpdateName(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateCategoryName,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(item);
  }
  openModalUpdateImage(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateCategoryImage,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(item);
  }
  openUpdateAvailable(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateAdsAvailable,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r) => {
      const data = JSON.parse(r);
      const index = this.resultData.findIndex((el) => el.id == data.id);
      if (index > -1) {
        this.resultData[index] = data;
      }
    });
  }
}
