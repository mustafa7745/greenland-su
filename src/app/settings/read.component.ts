import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../data/shared/requestServer';
import { StateController } from '../data/shared/stateController';
import { ModalUpdateProjectDeliveryPrice } from './update/price/update.component';
import { ModalUpdateRequestOrderStatus } from './update/available/update.component';
import { ModalUpdateMessageOrderStatus } from './update/messageError/update.component';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
})
export class SettingsComponent {
  requestServer = new ResquestServer();
  stateController = new StateController();

  project: any;
  ngOnInit() {
    this.requestServer.sharedMethod.browserPlatform(async () => {
      this.read();
    });
  }
  read() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';

    const data3 = {
      tag: 'read',
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.projectsUrl,
      (res) => {
        loadingModal.close();
        const data = JSON.parse(res);
        this.project = data;
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  openUpdatePrice() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProjectDeliveryPrice,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(this.project);
    a.result.then((r) => {
      const data = JSON.parse(r);
      this.project = data;
    });
  }
  openUpdateRequestOrder() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateRequestOrderStatus,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(this.project);
    a.result.then((r) => {
      const data = JSON.parse(r);
      this.project = data;
    });
  }
  openUpdateRequestOrderMessage() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateMessageOrderStatus,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(this.project);
    a.result.then((r) => {
      const data = JSON.parse(r);
      this.project = data;
    });
  }
}
