import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../data/shared/requestServer';

@Component({
  selector: 'modal-delete-permissions-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: '',
})
export class ModalCustomDelete {
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);
  selectedItems: string[] = [];
  url: string = '';

  onOpen(data: string[], url: string) {
    console.log(data);

    this.url = url;
    this.selectedItems = data;
    this.deletecConfirm();
  }
  deleteForm = '';
  setDeleteForm(s: string) {
    this.deleteForm = s;
  }
  deletecConfirm() {
    const a = this.requestServer.sharedMethod.customModal.confirmModal();
    a.componentInstance.title =
      this.requestServer.sharedMethod.globalString.getConfirmDeleteQuestion(
        this.selectedItems.length
      );
    //
    a.result
      .then((r) => {
        this.delete();
        a.close();
      })
      .catch(() => {
        this.activeModal.dismiss();
      });
  }
  delete() {
    const a = this.requestServer.sharedMethod.customModal.loadingModal();
    a.componentInstance.title = 'جاري الحذف ';
    //
    var data3;
    if (this.deleteForm != '') {
      data3 = { tag: this.deleteForm, ids: this.selectedItems };
    } else {
      data3 = { tag: 'delete', ids: this.selectedItems };
    }

    this.requestServer.request2(
      data3,
      this.url,
      (res) => {
        a.close();
        this.activeModal.close();
        const successModal =
          this.requestServer.sharedMethod.customModal.successModal();
        successModal.componentInstance.title = 'تم';
      },
      (e) => {
        a.close();
        this.activeModal.dismiss();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
}
