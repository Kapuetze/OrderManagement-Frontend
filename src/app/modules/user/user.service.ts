import { environment } from '@environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as moment from "moment";
import { Observable, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Configuration, User } from 'src/app/shared/services/ordermanagement-api';

@Injectable({
	providedIn: 'root'
})
export class UserHelper {

	constructor(private http: HttpClient, private apiConfiguration: Configuration) { }

	// getUser(id: string) {
	// 	return this.http.get(environment.apiBase + "/user/"+id).pipe(
	// 		map((res) => res as User),
	// 		catchError(error => of([]))
	// 	);
	// }

	public setSession(authResult: any) {
		// localStorage.setItem('token_id', authResult.token);
		localStorage.setItem("token_expiration", authResult.expires);
		localStorage.setItem("jwt_token", authResult.token);
		// Set the access token as default for the automatically generated openapi client
		// https://github.com/OpenAPITools/openapi-generator/issues/5441
	}

	logout() {
		localStorage.removeItem("token_id");
		localStorage.removeItem("token_expiration");
	}

	public isLoggedIn() {
		return moment().isBefore(this.getExpiration());
	}

	isLoggedOut() {
		return !this.isLoggedIn();
	}

	getExpiration() {
		const expiration = localStorage.getItem("token_expiration");
		// const expiresAt = JSON.parse(expiration!);
		return moment(expiration);
	}

	public getUserName() {
		return localStorage.getItem('user_firstname');
	}
}
