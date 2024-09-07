import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Properties } from '../../data/properties';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'ngbd-modal-add-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
})
export class ModalSearchUser {
  properties = new Properties('', '');
  activeModal = inject(NgbActiveModal);
  // Fields
  data: any;

  productQuantity = '';
  username = '';
  userphone = '';

  isDisabledSaveButton() {
    return !(this.userphone.length > 0);
  }
  onSave() {
    this.addConfirm();
  }
  dataSearch = (from: number) => {
    return JSON.stringify({
      tag: 'readUser',
      inputUserPhone: '967' + this.properties.searchText,
    });
  };
  search() {
    this.properties.urlSearch = this.properties.urls.projects_user_url;

    this.properties.setData3Search(this.dataSearch(0));
    this.properties.search();
  }

  onOpen(data: any) {
    this.data = data;
  }

  addConfirm() {
    const a = this.properties.sharedMethod.confirmAddModal();
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
    const data = JSON.stringify({
      tag: 'add',
      inputUserName: this.username,
      inputUserPhone: '967' + this.properties.searchText,
    });
    //
    this.properties.add(
      this.properties.urls.projects_user_url,
      data,
      this.activeModal
    );
  }
  choose(item: any) {
    this.activeModal.close(item);
    // .result
    //   .then((r) => {
    //     this.add();
    //     a.close();
    //   })
    //   .catch(() => {
    //     a.dismiss();
    //   });
  }
}
