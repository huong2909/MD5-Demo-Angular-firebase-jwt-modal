import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../service/transaction.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Transaction} from "../../model/transaction";
import {WalletService} from "../../service/wallet.service";
import {Wallet} from "../../model/wallet";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChildCategoryService} from "../../service/child-category.service";
import {ChildrenCategory} from "../../model/children-category";
import Swal from "sweetalert2";


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  idWallet: any;
  idTransaction: any;
  closeResult: any;
  idParent: any;
  obj: any;
  buttonDisabled = true;
  default = '';
  transaction: Transaction[] = [];
  transactionNoPage: Transaction[] = [];
  childCategory: ChildrenCategory[] = [];
  wallet: Wallet = {};

  transactionForm: FormGroup = new FormGroup({
    walletId: new FormControl(),
    childCategoryId: new FormControl(),
    moneyAmount: new FormControl(),
    note: new FormControl(),
  });

  searchForm: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
  });
  totalPagination!: number;
  indexPagination: number = 0;

  constructor(private transactionService: TransactionService,
              private activatedRoute: ActivatedRoute,
              private walletService: WalletService,
              private childService: ChildCategoryService,
              private modalService: NgbModal,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.idWallet = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.transactionService.getTransactionByIdWallet(this.idWallet,0).subscribe((result) => {
      // @ts-ignore
      this.transaction = result.content;
    });

    this.transactionService.getTransactionByIdWalletNoPage(this.idWallet).subscribe((data: Transaction[]) => {

      this.transactionNoPage = data;

      if ((this.transactionNoPage.length % 2) != 0) {
        this.totalPagination = (Math.round(this.transactionNoPage.length / 2)) + 1;
        //Math.round làm tròn
      }
    })
    this.getTransactionByIdWallet();

    this.getWalletById();
  }

  getTransactionByIdWallet() {
    this.transactionService.getTransactionByIdWallet(this.idWallet,(this.indexPagination * 2) - 2).subscribe((result:Transaction[]) => {
      // @ts-ignore
      this.transaction = result.content;
    });
  }

  getWalletById() {
    this.walletService.getById(this.idWallet).subscribe((data) => {

      this.wallet = data;
    });
  }

  searchByTime() {
    const from = this.searchForm.value.from;
    const to = this.searchForm.value.to;
    this.transactionService.searchByDate(this.idWallet, from, to).subscribe(result => {
      this.transaction = result;
      console.log(result);
    });
  }

  open(content: any, id: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.idTransaction = id;
    this.getTransactionById(id);

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

  getTransactionById(id: number) {
    return this.transactionService.getById(id).subscribe(transaction => {


      this.transactionForm = new FormGroup({
        walletId: new FormControl(transaction.wallet?.id),
        childCategoryId: new FormControl(transaction.childCategory?.id),
        moneyAmount: new FormControl(transaction.moneyAmount),
        note: new FormControl(transaction.note),
      });
      this.idParent = transaction.childCategory?.parentCategory?.id;
      this.getChildCategoryByIdParent(this.idParent);
    });

  }

  getChildCategoryByIdParent(idParent: any) {
    console.log("dddddddddd")
    console.log(idParent)
    this.childService.getByParentId(idParent).subscribe(result => {
      this.childCategory = result;
      console.log("////////////")
      console.log(result);
    });
  }


  update() {
    this.obj = {
      wallet: {
        id: this.transactionForm.value.walletId
      },
      childCategory: {
        id: this.transactionForm.value.childCategoryId
      },
      moneyAmount: this.transactionForm.value.moneyAmount,
      note: this.transactionForm.value.note,
    };

    this.transactionService.update(this.idTransaction, this.obj).subscribe(() => {
      this.messageEdit();
      this.getTransactionByIdWallet();

    }, e => {
      console.log(e);
    });
  }

  messageEdit() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Edit success',
      showConfirmButton: false,
      timer: 3000
    })
  }

  messageDelete() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Delete success',
      showConfirmButton: false,
      timer: 3000
    })
  }

  delete(id: any) {
    this.transactionService.delete(id).subscribe(() => {
      this.messageDelete()
      this.getTransactionByIdWallet();

    }, e => {
      console.log(e);
    });
  }

  firstPage() {
    this.indexPagination = 1;
    this.ngOnInit();
  }

  prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.transactionService.getTransactionByIdWallet(this.idWallet,this.indexPagination).subscribe((data: Transaction[]) => {
        // @ts-ignore
        this.transaction = data.content;
      })
    }
  }

  indexPaginationChage(value: any) {
    this.indexPagination = value;
  }

  findPaginnation() {
    this.transactionService.getTransactionByIdWallet(this.idWallet,(this.indexPagination * 2) - 2).subscribe((data: Transaction[]) => {
      // @ts-ignore
      this.transaction = data.content;
    })
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.transactionService.getTransactionByIdWallet(this.idWallet,this.indexPagination).subscribe((data: Transaction[]) => {
      console.log(data)
      // @ts-ignore
      this.transaction = data.content;
    })
  }

  lastPage() {
    this.indexPagination = this.transactionNoPage.length / 2;
    this.transactionService.getTransactionByIdWallet(this.idWallet,this.indexPagination).subscribe((data: Transaction[]) => {
      // @ts-ignore
      this.transaction = data.content;
    })
  }
}
