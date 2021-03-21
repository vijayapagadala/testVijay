import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import 'rxjs/add/operator/map';
import { SearchItem } from "../SearchItem";
import { DataService } from "../data.service";
@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
  })
  export class WelcomeComponent {
    public post: any;
    public isLoading: boolean = false;
    public isVisible: boolean = false;
    public elements: any;
    formGroup: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private dataservice: DataService
      ) { }

ngOnInit() {
    this.createForm();
}
 createForm() {
    this.formGroup = this.formBuilder.group({
     'po': ['', Validators.required],
    });
 }

 
doSearch(value: string) {
     this.isLoading = true;
     this.dataservice.getSearch().subscribe(res => {
        this.isLoading = false;
        this.isVisible = true;
         this.elements = res;
     },err => {
        err.error.message;
        this.isLoading = false;
      })
    }
}
