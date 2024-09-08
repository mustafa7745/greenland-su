import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../data/shared/requestServer';
import { ProductsModal } from '../../products/read/read.component';
import { ProductsGroupsModal } from '../../products_groups/read/read.component';
import { ModalAddNotifications } from '../add/add.component';
import { StateController } from '../../data/shared/stateController';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
})
export class NotificationsComponent {
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
  resultData: any;
  resultSearchData: any;
  //
  cParent = 0;
  ngOnInit() {
    this.requestServer.sharedMethod.browserPlatform(async () => {
      this.read();
    });
  }
  async read() {
    this.isLoading = true;
    this.isError = false;

    const data3 = {
      tag: 'read',
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.notificationsUrl,
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
  search() {
   
  }
  add() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalAddNotifications,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.result.then((r) => {
      console.log(r);
      const data = JSON.parse(r)
      console.log(data);

      this.resultData.push(data);
    });
  }
}
