import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/custom-utilities/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/ordermanagement-api';
import { UserHelper } from '../../user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.email, Validators.required]),
		password: new FormControl(null, Validators.required),
	})

	constructor(private _userService: UserService,
		private _notificationService: NotificationService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _userHelper: UserHelper) { }

	ngOnInit() {
	}

	login() {
		if (!this.loginForm.valid) {
			this._notificationService.notify("Invalid credentials.");
			console.log(this.loginForm.errors);
		} else {
			this._userService.userAuthorizePost(this.loginForm.controls["email"].value, this.loginForm.controls["password"].value)
				.subscribe({
					next: (data) => {
						this._userHelper.setSession(data);
						let nextUrl = this._activatedRoute.snapshot.queryParams["next"];
						if (nextUrl) {
							this._router.navigate([nextUrl]);
						} else {
							this._router.navigate(["/dashboard"]);
						}
					},
					error: (error) => {
						this._notificationService.notify(error.message);
					}
				})
		}
	}
}
