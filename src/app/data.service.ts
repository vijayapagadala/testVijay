import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { AuthService } from './auth.service';
import { SearchItem } from './SearchItem';

@Injectable()
export class DataService {
 
   constructor(private http: HttpClient) {}

   public getSearch(value){
    let headers = new HttpHeaders();
    const httpParams = new HttpParams({
      fromObject: {
        email: 'jnarkar@gmail.com',
        ponumber: value.poNumber,
        anid: 'AN1001',
      }
    });
    headers = headers.set('x-functions-key', 'LQorRwRima4wDK8VlOaNjJEsFCo8p2yHW2PO24hNHSvOFNICPgTniw==')
    const httpOptions = {
      headers: headers,
      params: httpParams,
    };
   const configUrl = 'https://purchaseorder.azurewebsites.net/api/BuyerSuppliedDetails'
   return this.http.get(configUrl, httpOptions);
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