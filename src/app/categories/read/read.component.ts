import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../data/shared/requestServer';
import { lastValueFrom, interval, firstValueFrom } from 'rxjs';
import { ModalAddCategory } from '../add/add.component';
import { ProductsModal } from '../../products/read/read.component';
import { ProductsGroupsModal } from '../../products_groups/read/read.component';
import { ModalUpdateCategoryName } from '../update/name/update.component';
import { ModalUpdateCategoryImage } from '../update/image/update.component';
import { ModalUpdateCategoryOrder } from '../update/order/update.component';
import { StateController } from '../../data/shared/stateController';
import { ModalCustomDelete } from '../../delete/delete-groups.component';

@Component({
  selector: 'c1',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
})
export class CategoriesComponent {
  stateController = new StateController();
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
    console.log('mustafafaffa');
    // aw;
    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      this.isLoading = true;
      this.isError = false;
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();
      formData.set('data2', data2);
      const data3 = {
        tag: 'read',
      };
      formData.set('data3', JSON.stringify(data3));

      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.categoriesUrl,
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
  }
  search() {}
  add() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalAddCategory,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable:true
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
        fullscreen : true
      }
    );
    a.componentInstance.onOpen(item)
  }
  openProductsGroups(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ProductsGroupsModal,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
        fullscreen : true
      }
    );
    a.componentInstance.onOpen(item)
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
    a.componentInstance.onOpen(item)
  }
  openModalUpdateImage(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateCategoryImage,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable:true
      }
    );
    a.componentInstance.onOpen(item)
  }
  openModalUpdateOrder(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateCategoryOrder,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(item)
    a.result.then((r) => {
      const data = JSON.parse(r);
      const index = this.resultData.findIndex((el) => el.id == data.id);
      if (index > -1) {
        this.resultData[index] = data;
      }
    });
  }
  openDelete() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalCustomDelete,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(
      this.stateController.selected,
      this.requestServer.sharedMethod.urls.categoriesUrl
    );
    a.result.then((r) => {
      this.stateController.selected.forEach((id) => {
        const index = this.resultData.findIndex((el) => el.id == id);
        if (index > -1) {
          this.resultData.splice(index,1);
        }
      });
      this.stateController.selected = []

    });
  }
}
