import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  PLATFORM_ID,
  TemplateRef,
  inject,
} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from 'express';
import { SharedMethod } from '../data/shared-method';
import { Properties } from '../data/properties';
import { CommonModule } from '@angular/common';
import { ResquestServer } from '../data/shared/requestServer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  properties = new Properties('', '');
  currency: any;
  phone = '';
  password = '';
  sharedMethod = new SharedMethod();
  currencyController: any;
  cartController: any;
  requestServer = new ResquestServer()
  constructor() {
    this.sharedMethod.browserPlatform(() => {});
  }
  info: any;

  openModalReadCurrencies() {
    // const a = this.properties.sharedMethod.modalService.open(
    //   ModalReadCurrencies,
    //   {
    //     keyboard: false,
    //     backdrop: 'static',
    //     centered: true,
    //     fullscreen: false,
    //   }
    // );
    // a.componentInstance.onOpen();
    // a.result
    //   .then((r) => {
    //     this.currency = r;
    //   })
    //   .catch(() => {
    //     a.dismiss();
    //   });
  }
  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  updateToken(){
   this.requestServer.refresh_token();
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  getCount(): number {
    var res = 0;
    this.sharedMethod.browserPlatform(() => {
      var cartList: any[] = [];
      const name = 'cart';
      const cartString = localStorage.getItem(name);

      if (cartString != null) {
        cartList = JSON.parse(cartString);
        res = cartList.length;
      } else {
        res = cartList.length;
      }
    });
    return res;
  }

  logout() {
    this.cartController.clearCart();
    this.properties.sharedMethod.removeLogin();
    this.offcanvasService.dismiss();
    this.properties.sharedMethod.sharedNavigate.navigateToLogin();
  }
}
