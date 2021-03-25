import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import 'rxjs/add/operator/map';
import { SearchItem } from "../SearchItem";
import { DataService } from "../data.service";
import { PageLoad } from "./pageload";
import { RemittoAddress } from "./address";
import { Currency } from "./currency";
import { Header} from "./header";
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
    public headerProperty: Header[];
    public headerType: Header[];
    public headerTypeTax: Header[];
    show: boolean = true;
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
headerData() {
const header = []
  this.dataservice.getHeaderData().subscribe(res => {
   Object.keys(res).map(function(key){  
        header.push({[key]:res[key]})  
        header;  
    });  
    this.headerProperty = header[0].Name;
    this.headerType = header[1].Type;
    this.headerTypeTax = header[2].TypeTax;
  });
}
doSearch(value: string) {
  const searchData = []
    this.dataservice.getSearch().subscribe(res => {
      this.isVisible = true;
        Object.keys(res).map(function(key){  
          searchData.push({[key]:res[key]})  
          searchData;  
      });  
         this.element = searchData[0].Records[0].LineItems;
         this.address = searchData[0].Records[0].RemittoAddress;
         this.currency = searchData[0].Records[0].TotalCost.Currency;
        this.headerBoolean = this.pageLoadheadBoolean;
        this.LineChargeBoolean =this.pageLoadLineBoolean;
        if(this.headerBoolean){
          this.headerData();
        } 
     },err => {
        err.error.message;
        this.isLoading = false;
      })
    }

    on() {
      this.show = !this.show;
    }
}
