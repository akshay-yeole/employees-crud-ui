import { ErrorHandler, Injectable } from "@angular/core";
import { ErrorInfo } from "../models/errorinfo.model";

@Injectable()
export class ErrorHandlerService implements ErrorHandler{
    
    handleError(error: any): void {
        let customError : ErrorInfo = new ErrorInfo();
        customError.statusCode =200;
        customError.message = (<Error>error).message;
        customError.friendlyMessage ='An Error Occurred';
        console.log(customError);
    }
}