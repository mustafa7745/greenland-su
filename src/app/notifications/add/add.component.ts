import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ResquestServer } from '../../data/shared/requestServer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChooseProductsGroupsModal } from '../../products_groups/choose/read.component';

@Component({
  selector: 'ngbd-modal-add-group34',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
})
export class ModalAddNotifications {
  data: any;
  constructor(private imageCompress: NgxImageCompressService) {}
  //
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);

  //
  title = '';
  description = '';
  //
  productGroup: any;
  //

  isDisabledSaveButton() {
    return !(this.title.length > 0);
  }
  onSave() {
    this.addConfirm();
  }
  onOpen(data: any) {
    this.data = data;
    console.log(this.data);
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
        a.dismiss();
      });
  }
  add() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'جاري الاضافة الجلسه يرجى الانتظار ';

    var data3 = {
      tag: 'add',
      inputNotificationTitle: this.title,
      inputNotificationDescription: this.description,
    };

    //
    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.notificationsUrl,
      (result) => {
        // console.log(result);
        loadingModal.close();
        this.activeModal.close(result);
        const successModal =
          this.requestServer.sharedMethod.customModal.successModal();
        successModal.componentInstance.result = 'تم بنجاح';
      },
      (error) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = error;
      }
    );
  }
  
}
