import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class ModalAddProduct {
  data: any;
  constructor(private imageCompress: NgxImageCompressService) {}
  //
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);
  imgResultBeforeCompression: string = '';
  imgResultAfterCompression: string = '';
  image = '';
  //
  newName = '';
  number = '';
  price = '';
  //
  productGroup: any;
  isChecked: boolean = false;

  onCheckboxChange(event: any) {
    this.isChecked = event.target.checked;
    console.log('Checkbox checked:', this.isChecked);
  }

  isDisabledSaveButton() {
    return !(this.newName.length > 0 && this.productGroup);
  }
  onSave() {
    this.addConfirm();
  }
  onOpen(data: any) {
    this.data = data;
    console.log(this.data);
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompression = image;
      console.log(
        'Size in bytes of the uploaded image was:',
        this.imageCompress.byteCount(image)
      );
      this.imageCompress
        .compressFile(image, orientation, 40, 90) // 50% ratio, 50% quality
        .then((compressedImage) => {
          this.imgResultAfterCompression = compressedImage;
          this.image = this.imgResultAfterCompression.split(',')[1];

          console.log(
            'Size in bytes after compression iss now:',
            this.imageCompress.byteCount(compressedImage)
          );
        });
    });
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

    var data3;

    if (this.isChecked == true) {
      data3 = {
        tag: 'add',
        inputCategoryId: this.data.id,
        inputProductName: this.newName,
        inputProductNumber: this.number,
        inputProductImage: this.image,
        inputProductPostPrice: this.price,
        inputProductGroupId: this.productGroup.id,
      };
    } else {
      data3 = {
        tag: 'addWithoutImage',
        inputCategoryId: this.data.id,
        inputProductName: this.newName,
        inputProductNumber: this.number,
        inputProductPostPrice: this.price,
        inputProductGroupId: this.productGroup.id,
      };
    }

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

    a.componentInstance.onOpen(this.data.id);
    a.result.then((r) => {
      this.productGroup = r;
    });
  }
}
