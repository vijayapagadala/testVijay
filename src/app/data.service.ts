import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { AuthService } from './auth.service';
import { SearchItem } from './SearchItem';

@Injectable()
export class DataService {
  public header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Basic ${btoa('LQorRwRima4wDK8VlOaNjJEsFCo8p2yHW2PO24hNHSvOFNICPgTniw==')}`)
  }
  constructor(private http: HttpClient) {
  }

   public getSearch(){
  {
  // const configUrl = 'https://purchaseorder.azurewebsites.net/api/BuyerSuppliedDetails?&email=jnarkar@gmail.com&ponumber=L3HPO2009&anid=AN1001'
 
    return this.http.get("assets/response.json", this.header);
  }
}

public getPageLoad(){
  {
    return this.http.get("assets/pageload.json");
  }
}

public getHeaderData(){
  {
    return this.http.get("assets/header.json");
  }
}
}