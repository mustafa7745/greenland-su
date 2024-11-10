import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../app/data/shared/requestServer';
import { StateController } from '../../app/data/shared/stateController';
import { ProductsModal } from '../../app/products/read/read.component';
import { ModalUpdateDeliveryManStatus } from './update/delivery_status/update.component';
import { ModalUpdateUserStatus } from './update/user_status/update.component';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
})
export class UsersComponent {
  requestServer = new ResquestServer();
  stateController = new StateController();

  isSearchMode = false;
  searchText = '';
  //
  isError = false;
  error = '';
  //
  isLoading = true;
  isLoadingSearch = false;
  //
  currentItem = 'Television';
  resultData: any[] = [];
  resultSearchData: any;
  deliveryMan: any;
  isChecked = false;
  //
  cParent = 0;
  ngOnInit() {
    this.requestServer.sharedMethod.browserPlatform(async () => {
      // this.read();
    });
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
        inputDeliveryManId: this.resultSearchData.id,
      };
      formData.set('data3', JSON.stringify(data3));

      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.usersUrl,
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
  search() {
    this.resultSearchData = null;
    this.deliveryMan = null;
    this.isChecked = false;
    this.stateController.isLoadingInnerSearch = true;

    this.stateController.errorInnerSearch = '';
    var data3 = {
      tag: 'read',
      inputUserPhone: this.searchText,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.usersUrl,
      (result) => {
        this.resultSearchData = JSON.parse(result);
        // this.activeModal.close(result);
        this.stateController.isLoadingInnerSearch = false;

        // const successModal =
        //   this.requestServer.sharedMethod.customModal.successModal();
        // successModal.componentInstance.result = 'تم بنجاح';
      },
      (error) => {
        this.stateController.errorInnerSearch = error;
        this.stateController.isLoadingInnerSearch = false;

        // loadingModal.close();
        // const errorModal =
        //   this.requestServer.sharedMethod.customModal.errorModal();
        // errorModal.componentInstance.result = error;
      }
    );
  }
  add() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار ';

    const data3 = {
      tag: 'add',
      inputUserId: this.resultSearchData.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.deliverMenUrl,
      (res) => {
        loadingModal.close();
        // this.resultData = res;
        const data = JSON.parse(res);
        this.isChecked = true;
        this.deliveryMan = data;
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  checkIfDelivery() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار ';
    const data3 = {
      tag: 'search',
      inputUserId: this.resultSearchData.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.deliverMenUrl,
      (res) => {
        loadingModal.close();
        // this.resultData = res;
        const data = JSON.parse(res);
        // this.deliveryLocation = data;
        this.isChecked = true;
        this.deliveryMan = data;
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  openProducts(item: any) {
    // (new ProductsModal()).onOpen(item);
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ProductsModal,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
        fullscreen: true,
      }
    );
    a.componentInstance.onOpen(item);
  }

  addToSelected(item: any) {
    this.stateController.selected.push(item);
  }
  isSelected(item: any) {
    return this.stateController.selected.includes(item);
  }
  getPriceSelected() {
    var sum = 0;
    this.resultData.map((item) => {
      if (this.stateController.selected.includes(item.id)) {
        sum += item.price;
      }
    });
    return sum;
  }
  getAllPrice() {
    var sum = 0;
    this.resultData.map((item) => {
      // if (this.stateController.selected.includes(item.id)) {
      sum += item.price;
      // }
    });
    return sum;
  }
  //
  collectConfirm() {
    const a = this.requestServer.sharedMethod.customModal.confirmAddModal();
    a.componentInstance.title = 'Are You Sure To Add it';
    a.result
      .then((r) => {
        this.collect();
        a.close();
      })
      .catch(() => {
        a.dismiss();
      });
  }
  collect() {
    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      const loadingModal =
        this.requestServer.sharedMethod.customModal.loadingModal();
      loadingModal.componentInstance.title =
        'جاري الاضافة الجلسه يرجى الانتظار ';
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();

      //

      var data3 = JSON.stringify({
        tag: 'collect',
        ids: this.stateController.selected,
        // inputProductName: this.newName,
        // inputProductNumber: this.number,
        // inputProductImage: this.image,
        // inputProductPostPrice: this.price,
        // inputProductGroupId: this.productGroup.id,
      });

      formData.set('data2', data2);
      formData.set('data3', data3);
      //
      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.usersUrl,
        (result) => {
          loadingModal.close();
          // this.activeModal.close(result);
          this.resultData = [];
          this.stateController.selected = [];
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
  openUpdateStatus() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateDeliveryManStatus,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(this.deliveryMan);
    this.onUpdateItem(a);
  }
  openUpdateUserStatus() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateUserStatus,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(this.resultSearchData);
    this.onUpdateUserItem(a);
  }
  onUpdateItem(a: any) {
    a.result.then((r: any) => {
      const data = JSON.parse(r);
      this.deliveryMan = data;
    });
  }
  onUpdateUserItem(a: any) {
    a.result.then((r: any) => {
      const data = JSON.parse(r);
      this.resultSearchData = data;
    });
  }
}
