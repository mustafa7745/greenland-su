import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../data/shared/requestServer';
import { ProductsModal } from '../../products/read/read.component';
import { ProductsGroupsModal } from '../../products_groups/read/read.component';
import { ModalAddOffer } from '../add/add.component';
import { OffersProductsModal } from '../../offers-products/read/read.component';

@Component({
  selector: 'c1',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
})
export class OffersComponent {
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
      this.requestServer.sharedMethod.urls.offersUrl,
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
      ModalAddOffer,
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
      OffersProductsModal,
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
    // const a = this.requestServer.sharedMethod.customModal.modalService.open(
    //   ModalUpdateCategoryName,
    //   {
    //     keyboard: false,
    //     backdrop: 'static',
    //     centered: true,
    //   }
    // );
    // a.componentInstance.onOpen(item);
  }
  openModalUpdateImage(item: any) {
    // const a = this.requestServer.sharedMethod.customModal.modalService.open(
    //   ModalUpdateCategoryImage,
    //   {
    //     keyboard: false,
    //     backdrop: 'static',
    //     centered: true,
    //   }
    // );
    // a.componentInstance.onOpen(item);
  }
}
