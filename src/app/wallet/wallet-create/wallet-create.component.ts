import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {MoneyType} from "../../model/money-type";
import {WalletService} from "../../service/wallet.service";
import {MoneyTypeService} from "../../service/money-type.service";


@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {


  title = "cloudsSorage";
  selectedFile: any ;
  fb: any;
  downloadURL: any;
  // @ts-ignore
  constructor(private storage: AngularFireStorage,
              private walletService: WalletService,
              private moneyTypeService: MoneyTypeService,
              ) {}
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
    this.moneyTypeService.getAll().subscribe((data) => {
      this.listmoneyType = data;
    });
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
      // this.router.navigate(['/student']);
      alert('Thành công');
    }, error => {
      alert('Lỗi');
    }) ;
  }
}
