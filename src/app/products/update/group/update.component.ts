import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../../data/shared/requestServer';
import { ChooseProductsGroupsModal } from '../../../products_groups/choose/read.component';

@Component({
  selector: 'update-product-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
})
export class ModalUpdateProductGroup {
  data: any;
  //
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);
  productGroup: any;

  newName = '';
  isDisabledSaveButton() {
    if (this.productGroup && this.data.products_groupsId != this.productGroup.id) {
      return false
    }
    return true
  }
  onSave() {
    this.addConfirm();
  }

  onOpen(item: any) {
    this.data = item;
  }

  addConfirm() {
    const a = this.requestServer.sharedMethod.customModal.confirmAddModal();
    a.componentInstance.title = 'Are You Sure To Add it';
    a.result
      .then((r) => {
        this.add();
        a.close();
      })
      .catch(() => {
        this.activeModal.dismiss();

        a.dismiss();
      });
  }
  add() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = ' يرجى الانتظار ';

    const data3 = {
      tag: 'updateGroup',
      inputProductId: this.data.id,
      inputProductGroupId: this.productGroup.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.productsUrl,
      (result) => {
        loadingModal.close();
        this.activeModal.close(result);
        const successModal =
          this.requestServer.sharedMethod.customModal.successModal();
        successModal.componentInstance.result = 'تم بنجاح';
      },
      (error) => {
        this.activeModal.dismiss();
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = error;
      }
    );
  }
  chooseProductGroup() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ChooseProductsGroupsModal,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    console.log(this.data.id);

    a.componentInstance.onOpen(this.data.categoryId);
    a.result.then((r) => {
      this.productGroup = r;
    });
  }
}
