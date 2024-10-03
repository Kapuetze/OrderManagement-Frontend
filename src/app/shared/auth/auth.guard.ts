import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserHelper } from 'src/app/modules/user/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private _userHelper: UserHelper, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {

		let url: string = state.url;

		if (this._userHelper.isLoggedIn()) {
			return true;
		}

		const urlParameters = Object.assign({}, next.queryParams);
		urlParameters["next"] = url;

		// Navigate to the login page with extras
		this.router.navigate(['/user', 'login'], { queryParams: urlParameters });
		return false;
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}
}