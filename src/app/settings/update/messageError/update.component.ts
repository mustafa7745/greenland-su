import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../../data/shared/requestServer';

@Component({
  selector: 'update-error-message-order-not-available',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
})
export class ModalUpdateMessageOrderStatus {
  data: any;
  //
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);

  newName = '';
  isDisabledSaveButton() {
    return !(this.newName.length > 0 && this.data.postPrice != this.newName);
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
      tag: 'updateRequestOrderMessage',
      inputRequestOrderMessage: this.newName,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.projectsUrl,
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
}
