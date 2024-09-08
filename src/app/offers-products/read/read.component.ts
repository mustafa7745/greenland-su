import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Properties } from '../../data/properties';
import { ModalCustomDelete } from '../../delete/delete-groups.component';
import { ResquestServer } from '../../data/shared/requestServer';
import { ProductsImagesModal } from '../../products_images/read/read.component';
import { ModalAddProductToOffer } from '../add/add.component';
import { ModalUpdateOfferProductQuantity } from '../update/quantity/update.component';
import { StateController } from '../../data/shared/stateController';

@Component({
  selector: 'ngbd-modal-pg-groups-component-from-perm',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
})
export class OffersProductsModal {
  stateController = new StateController();

  data: any;
  activeModal = inject(NgbActiveModal);
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
  onOpen(data: any) {
    this.data = data;
    this.read();

    console.log(this.data.id);
  }
  async read() {
    this.isLoading = true;
    this.isError = false;

    const data3 = {
      tag: 'read',
      inputOfferId: this.data.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.offersProductsUrl,
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
      ModalAddProductToOffer,
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
  openUpdateQuantity(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateOfferProductQuantity,
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
      this.requestServer.sharedMethod.urls.offersProductsUrl
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

  getFinalPrice() {
    var sum = 0;
    this.resultData.forEach((element) => {
      sum = sum + (Number(element.postPrice) * element.productQuantity);
    });
    return sum;
  }
}
