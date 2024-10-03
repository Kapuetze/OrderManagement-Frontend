import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserHelper } from './modules/user/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';

  constructor(public _userHelper: UserHelper, 
    private _translateService: TranslateService,
    private _router: Router) {

    this._translateService.setDefaultLang('en-US');
    if (this._translateService.getBrowserLang() !== '') {
        this._translateService.use(this._translateService.getBrowserLang()!);
    } else {
        this._translateService.use('en-US'); // Set your language    
    }
  }

  public logout(){
    this._userHelper.logout();
    // Navigate to the login page with extras
    this._router.navigate(['/user', 'login']);
  }
}
