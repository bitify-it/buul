import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  @Input()
  inputCode: any;

  errorCode : any;
  errorMessage : any;
  errorMap : Map<number,string> = new Map([
    [100,"Continue"],
    [101,"Switching Protocols"],
    [200,"OK - Action completed successfully"],
    [201,"Created - Success following a POST command"],
    [202,"Accepted Request has been accepted for processing but processing has not completed"],
    [203,"Partial Information - Response to a GET command; indicates that the returned meta information is from a private overlaid web"],
    [204,"No Content - Server received the request but there is no information to send back"],
    [205,"Reset Content"],
    [206,"Partial Content - Requested file was partially sent; usually caused by stopping or refreshing a web page"],
    [300,"Multiple Choices"],
    [301,"Moved Permanently - Requested a directory instead of a specific file; the web server added the file name index.html index.htm, home.html or home.htm to the URL"],
    [302,"Moved Temporarily"],
    [303,"See Other"],
    [304,"Not Modified - Cached version of the requested file is the same as the file to be sent"],
    [305,"Use Proxy"],
    [400,"Bad Request - Request had bad syntax or was impossible to fulfill"],
    [401,"Unauthorized - User failed to provide a valid user name/password required for access to a file/directory"],
    [402,"Payment Required"],
    [403,"Forbidden - User needs authorization for this resource or request does not specify the file name or the directory or the file does not have the permission that allows the pages to be viewed from the web"],
    [404,"Not Found - Requested file was not found"],
    [405,"Method Not Allowed"],
    [406,"Not Acceptable"],
    [407,"Proxy Authentication Required"],
    [408,"Request Time-Out"],
    [409,"Conflict"],
    [410,"Gone"],
    [411,"Length Required"],
    [412,"Precondition Failed"],
    [413,"Request Entity Too Large"],
    [414,"Request-URL Too Large"],
    [415,"Unsupported Media Type"],
    [500,"Server Error - In most cases this error results from a problem with the code or program you are calling rather than with the web server itself."],
    [501,"Not Implemented - Server does not support the facility required"],
    [502,"Bad Gateway"],
    [503,"Out of Resources - Server cannot process the request due to a system overload; should be a temporary condition"],
    [504,"Gateway Time-Out - Service did not respond within the time frame that the gateway was willing to wait"],
    [505,"HTTP Version Not Supported"],
  ]);
  

  constructor(private route: ActivatedRoute, private _location: Location, private tokenService: TokenStorageService) { 

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['code']){
        this.errorCode = params['code'];
        this.errorMessage = this.errorMap.get(parseInt(this.errorCode));
      }
      else if(this.inputCode){
        this.errorCode = this.inputCode;
        this.errorMessage = this.errorMap.get(parseInt(this.errorCode));
      }
      else{
        this.errorCode = "Generic Error";
        this.errorMessage = "Please contact administrator!";
      }

      if(this.errorCode==401)
        this.cleanToken();
      
    });
  }

  ngOnChanges(changes: SimpleChanges) {        
    this.ngOnInit();
  }


  reload() {
    window.location.reload();
  }
  back() {
    this._location.back();
  }

  cleanToken(){
    this.tokenService.signOut();
  }

}
