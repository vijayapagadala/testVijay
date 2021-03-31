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
     customer: ['', Validators.required],
     poNumber: ['', Validators.required],
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
  if (value.customer == '' || value.poNumber == '' ) {
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

      // var currentElement = this.element[index];
      // this.element.splice(index, 0, currentElement);
      this.isVisibleHeader = true;
        this.headerData();
      
     }
 
    deleteRow() {
      this.isVisibleHeader = false;
    }

    numberofsumAmount() {
      return this.element.reduce((sumData: number, b:SearchItem) => sumData + b.Amount, 0);
    }
}
