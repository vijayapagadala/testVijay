import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import 'rxjs/add/operator/map';
import { SearchItem } from "../SearchItem";
import { DataService } from "../data.service";
import { PageLoad } from "./pageload";
import { RemittoAddress } from "./address";
import { Currency } from "./currency";
import { Header} from "./header";
import { DynamicGrid } from "./grid.model";

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
    public element: any[];
    public currency = new Currency;
    public headerBoolean: boolean =false;
    public LineChargeBoolean: boolean = false;
    public pageLoadheadBoolean: boolean = false;
    public pageLoadLineBoolean: boolean = false;
    public headerProperty: Header[];
    public headerType: Header[];
    public headerTypeTax: Header[];
    show: boolean = true;
    isVisibleHeader: boolean = false;
    public calculateAmount = 0;
    private value; 
    public priorInvoicedAmount = 105.00;
    formGroup: FormGroup;
    submitted = false;
    options: any;
    dialog: any;
    dynamicArray: Array<DynamicGrid> = [];
    dynamicArraychild: Array<DynamicGrid> = [];
    newDynamic: any = {};
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
    this.newDynamic = {Name: "", Type: "",TypeTax:""};
    this.dynamicArray.push(this.newDynamic);
}
 createForm() {
    this.formGroup = this.formBuilder.group({
     customer: ['', Validators.required],
     poNumber: ['',  [Validators.required, Validators.maxLength(15)]],
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
doSearch(value: any) {
  if (value.customer == '' || value.poNumber == '') {
       this.onSubmit();
  } else {
   
    if(value.poNumber.length >= 15){
      this.onSubmit();
    } else {
       //  let params: {
    //  email: 'jnarkar@gmail.com';
    //  ponumber: value.poNumber;
    //  anid: 'AN101'
    // }

    // this.options = params;
    // alert(this.params);
    /* doSearch parametrized function*/
  //   this.httpClient.get('/url', {
  //     params: {
  //       email: 'jnarkar@gmail.com',
  //       ponumber: value.poNumber,
  //       anid: 'AN101'
       
  //     },
  //     observe: 'response'
  //   })
  //   .toPromise()
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(console.log);
  // }
    const searchData = []
    let sum: number = 0;
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
          this.findsum(searchData[0].Records[0].LineItems);  
          this.numberofsumAmount();
          if(this.headerBoolean){
            this.headerData();
          } 
       },err => {
          err.error.message;
          this.isLoading = false;
        })
       }
    }
   
 }

    findsum(data){    
      this.value=data    
      for(let j=0;j<data.length;j++){   
           this.calculateAmount+=  this.value[j].Quantity * this.value[j].Amount.Amount  
      }  
    }  

    on() {
      this.show = !this.show;
    }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.formGroup.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formGroup.value, null, 4));
  }

    openRow() {
      // this.newDynamic = {Name: "", Type: "",TypeTax:""};
      // this.dynamicArraychild.push(this.newDynamic);
      // return true;
      this.isVisibleHeader = true;
      this.headerData();
      // if(index == 0) {
      //   this.isVisibleHeader = true;
      //   this.headerData();
      // } {
      //   this.isVisibleHeader = false;
      // }
     }
 
    deletechildRow(index) {
      this.isVisibleHeader = false;
    //   if(this.dynamicArraychild.length ==1) {
    //     return false;
    //  } else {
    //      this.dynamicArraychild.splice(index, 1);
    //      return true;
    //  }
    }

    addRow() {
      this.newDynamic = {Name: "", Type: "",TypeTax:""};
      this.dynamicArray.push(this.newDynamic);
      return true;
    }

    deleteRow(index) {
      if(this.dynamicArray.length ==1) {
         return false;
      } else {
          this.dynamicArray.splice(index, 1);
          return true;
      }
   }
    numberofsumAmount() {
      return this.element.reduce((sumData: number, b:SearchItem) => sumData + b.Amount, 0);
    }

    checkAllCheckBox(ev) {
      this.element.forEach(x => x.checked = ev.target.checked)
    }
  
    isAllCheckBoxChecked() {
      return this.element.every(p => p.checked);
      
    }

    checkAllheaderCheckBox(e) {
      this.dynamicArray.forEach(x => x.checked = e.target.checked)
    }
    
    isAllheaderCheckBoxChecked() {
      return this.dynamicArray.every(p => p.checked);
    }

    attachPDF() {
      alert('inside pdf function');
    }
}
