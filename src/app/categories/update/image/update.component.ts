import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../../data/shared/requestServer';

@Component({
  selector: 'ngbd-modal-add-group34',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
})
export class ModalUpdateCategoryImage {
  data: any;
  constructor(private imageCompress: NgxImageCompressService) {}
  //
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);
  imgResultBeforeCompression: string = '';
  imgResultAfterCompression: string = '';
  image = '';
  //
  isDisabledSaveButton() {
    return !(this.image.length > 0);
  }
  onSave() {
    this.addConfirm();
  }

  ratio = 50;
  quality = 50;
  compress(){
    this.imageCompress
    .compressFile(this.imgResultBeforeCompression, orientation, this.ratio, this.quality) // 50% ratio, 50% quality
    .then((compressedImage) => {
      this.imgResultAfterCompression = compressedImage;
      this.image = this.imgResultAfterCompression.split(',')[1];

      console.log(
        'Size in bytes after compression iss now:',
        this.requestServer.formatBytes(this.imageCompress.byteCount(compressedImage))
      );
    });
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompression = image;
      console.log(
        'Size in bytes of the uploaded image was:',
        this.imageCompress.byteCount(image)
      );
      this.imageCompress
        .compressFile(image, orientation, this.ratio, this.quality) // 50% ratio, 50% quality
        .then((compressedImage) => {
          this.imgResultAfterCompression = compressedImage;
          // this.image = this.imgResultAfterCompression.split(',')[1];
          this.image = this.imgResultBeforeCompression.split(',')[1];


          console.log(
            'Size in bytes after compression iss now:',
            this.requestServer.formatBytes(this.imageCompress.byteCount(compressedImage))
          );
        });
    });
  }
  onOpen(item: any) {
    this.data = item;
  }
  size(image:any){
   return this.requestServer.formatBytes(this.imageCompress.byteCount(image))
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
    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      const loadingModal =
        this.requestServer.sharedMethod.customModal.loadingModal();
      loadingModal.componentInstance.title =
        'جاري الاضافة الجلسه يرجى الانتظار ';
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();

      //
      const data3 = JSON.stringify({
        tag: 'updateImage',
        inputCategoryId: this.data.id,
        inputCategoryImage: this.image,
      });
      formData.set('data2', data2);
      formData.set('data3', data3);
      //
      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.categoriesUrl,
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
}
