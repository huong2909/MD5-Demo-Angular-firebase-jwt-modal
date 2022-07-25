import { Component, OnInit } from '@angular/core';

import {WalletService} from "../../service/wallet.service";
import {MoneyTypeService} from "../../service/money-type.service";
import {Wallet} from "../../model/wallet";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MoneyType} from "../../model/money-type";
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {getAll} from "@angular/fire/remote-config";
// @ts-ignore
@Component({
  selector: 'app-list-wallet',
  templateUrl: './list-wallet.component.html',
  styleUrls: ['./list-wallet.component.css']
})
export class ListWalletComponent implements OnInit {
  title = "cloudsSorage";
  selectedFile: any ;
  fb: any;
  downloadURL: any;

  // @ts-ignore


  closeResult: any;
  wallet: Wallet[] = [];
  moneyType: any;
  constructor(private storage: AngularFireStorage,
              private walletService: WalletService,
              private moneytypeService: MoneyTypeService,
              private modalService: NgbModal,
              private router: Router) { }
  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url:any) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  ngOnInit(): void {
    this.moneytypeService.getAll().subscribe((data) => {
      this.listmoneyType = data;
    });
    this.getAll()
    this.getMoneyType();
  }
  getMoneyType() {
    this.moneytypeService.getAll().subscribe((data) => {
      this.moneyType = data;
      console.log(data[0].name)
    });
  }
  getAll() {
    this.walletService.getAll().subscribe(result => {
      // @ts-ignore
      this.wallet = result;
      console.log(result);
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  walletForm: FormGroup = new FormGroup({
    name: new FormControl(),
    icon: new FormControl(),
    moneyAmount: new FormControl(),
    moneyTypeId: new FormControl(),
  });
  obj: any;
  listmoneyType: MoneyType[] = [];

  submit() {
    this.obj = {
      name: this.walletForm.value.name,
      icon: this.fb,
      moneyAmount: this.walletForm.value.moneyAmount,
      moneyType: {
        id: this.walletForm.value.moneyTypeId
      },
      appUser: {
        id: localStorage.getItem("USERID")
      }
    };
    this.walletService.save(this.obj).subscribe(() => {
      this.getAll();
      this.openA();
    }, error => {
      alert('Lỗi');
    }) ;
  }

  openA() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Create success',
      showConfirmButton: false,
      timer: 3000
    })
  }
}
