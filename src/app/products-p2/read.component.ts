import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ResquestServer } from '../data/shared/requestServer';
import { StateController } from '../data/shared/stateController';
import { ModalCustomDelete } from '../delete/delete-groups.component';
import { ModalAddProduct } from '../products/add/add.component';
import { ModalUpdateProductAvailable } from '../products/update/available/update.component';
import { ModalUpdateProductGroup } from '../products/update/group/update.component';
import { ModalUpdateProductName } from '../products/update/name/update.component';
import { ModalUpdateProductNumber } from '../products/update/number/update.component';
import { ModalUpdateProductOrder } from '../products/update/order/update.component';
import { ModalUpdateProductPrice } from '../products/update/price/update.component';
import { ProductsImagesModal } from '../products_images/read/read.component';
import { ModalSearchProduct } from '../search/products/search.component';
import { ModalUpdateProductDescription } from '../products/update/description/update.component';
import { ModalUpdateProductCategory } from '../products/update/category/update.component';

@Component({
  selector: 'products-p2',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
})
export class ProductsPage2 {
  stateController = new StateController();
  data: any;

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
  product: any;
  onOpen(data: any) {
    this.data = data;
    this.read();

    console.log(this.data.id);
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
        inputCategoryId: this.data.id,
      };
      formData.set('data3', JSON.stringify(data3));

      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.productsUrl,
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
      ModalAddProduct,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(this.data);
    a.result.then((r) => {
      this.resultData.push(JSON.parse(r));
    });
  }

  openProductsImage(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ProductsImagesModal,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r) => {
      this.resultData.push(JSON.parse(r));
    });
  }
  openUpdateName(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductName,
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
      console.log(index);

      if (index > -1) {
        this.resultData[index] = data;
      }
    });
  }

  openUpdateDescription(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductDescription,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    this.onUpdateItem(a);
  }
  openUpdateCategory(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductCategory,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    this.onUpdateItem(a);
  }

  openUpdatePrice(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductPrice,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    this.onUpdateItem(a);
  }
  openUpdateNumber(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductNumber,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    this.onUpdateItem(a);
  }
  openUpdateOrder(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductOrder,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    this.onUpdateItem(a);
  }
  openUpdateGroup(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductGroup,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    this.onUpdateItem(a);
  }
  openUpdateAvailable(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductAvailable,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(item);
    this.onUpdateItem(a);
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
      this.requestServer.sharedMethod.urls.productsUrl
    );
    a.result.then((r) => {
      this.stateController.selected.forEach((id) => {
        const index = this.resultData.findIndex((el) => el.id == id);
        if (index > -1) {
          this.resultData.splice(index, 1);
        }
      });
      this.stateController.selected = [];
    });
  }
  onUpdateItem(a: any) {
    a.result.then((r: any) => {
      const data = JSON.parse(r);
      console.log(data);

      // console.log();
      
      
      this.product = data;
      // const index = this.resultData.findIndex((el) => el.id == data.id);
      // if (index > -1) {
        
      // }
    });
  }

  openModalSearchProduct() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalSearchProduct,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    // a.componentInstance.onOpen(item);
    a.result.then((r) => {
      this.product = r;
    });
  }
}
