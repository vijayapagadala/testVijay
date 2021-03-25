import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import 'rxjs/add/operator/map';
import { SearchItem } from "../SearchItem";
import { DataService } from "../data.service";
import { PageLoad } from "./pageload";
import { RemittoAddress } from "./address";
import { Currency } from "./currency";
@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
  })
  export class WelcomeComponent {
    public post: any;
    public isLoading: boolean = false;
    public isVisible: boolean = false;
    public pageLoad: PageLoad[];
    public address: RemittoAddress[];
    public element: SearchItem[];
    public currency = new Currency;
    public headerBoolean: boolean =false;
    public LineChargeBoolean: boolean = false;
    public pageLoadheadBoolean: boolean = false;
    public pageLoadLineBoolean: boolean = false;
    formGroup: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private dataservice: DataService
      ) { }

ngOnInit() {
    this.createForm();
    this.dataservice.getPageLoad().subscribe(res => {
      this.pageLoad = res[0].Customer;
      this.pageLoadheadBoolean = res[0].HeaderCharge;
      this.pageLoadLineBoolean = res[0].LineCharge;
    });
}
 createForm() {
    this.formGroup = this.formBuilder.group({
     invoice: ['', [Validators.required, Validators.maxLength(15)]],
     date: ['', Validators.required ],
    });
 }

doSearch(value: string) {
    this.dataservice.getSearch().subscribe(res => {
      this.isVisible = true;
         this.element = res[0];
         this.address = res[0].Records[0].RemittoAddress;
         this.currency = res[0].Records[0].TotalCost.Currency;
        this.headerBoolean = this.pageLoadheadBoolean;
        this.LineChargeBoolean =this.pageLoadLineBoolean;
        
     },err => {
        err.error.message;
        this.isLoading = false;
      })
    }
}
