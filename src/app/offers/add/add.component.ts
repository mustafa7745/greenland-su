import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ResquestServer } from '../../data/shared/requestServer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-add-group34',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
})
export class ModalAddOffer {
  constructor(private imageCompress: NgxImageCompressService) {}
  //
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);
  imgResultBeforeCompression: string = '';
  imgResultAfterCompression: string = '';
  image = '';
  //
  newName = '';
  price = '';
  description = '';
  expireAt = ''


  isDisabledSaveButton() {
    return !(this.newName.length > 0);
  }
  onSave() {
    this.addConfirm();
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

    const data3 = {
      tag: 'add',
      inputOfferDescription: this.description,
      inputOfferName: this.newName,
      inputOfferPrice: this.price,
      inputOfferImage: this.image,
      inputOfferExpireAt: this.expireAt,

    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.offersUrl,
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
}
