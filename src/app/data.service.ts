import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';

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
   const configUrl = 'https://purchaseorder.azurewebsites.net/api/BuyerSuppliedDetails?&email=jnarkar@gmail.com&ponumber=L3HPO2009&anid=AN1001'
 
    return this.http.get(configUrl, this.header);
  }
}
}