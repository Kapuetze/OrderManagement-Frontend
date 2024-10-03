import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AccountService, User, UserService } from 'src/app/shared/services/ordermanagement-api';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	private destroyed$ = new Subject();

	registerForm: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.email, Validators.required]),
		password: new FormControl(null, Validators.required),
		cpassword: new FormControl(null, Validators.required)
	});

	constructor(private _router: Router, private _userService: UserService, private _accountService: AccountService) { }

	ngOnInit() {
		//this.validateErrors(this.registerForm);
	}

	// onChange() {
	// 	this.validateErrors(this.registerForm);
	// }

	// onFieldChange(key: string) {
	// 	let control = this.registerForm.get(key);
	// 	if (control != null) {
	// 		this.getControlError(control);
	// 	}
	// }

	// validateErrors(form: FormGroup) {
	// 	// let errors = this.registerForm.errors;
	// 	// console.log(this.registerForm.controls);

	// 	Object.keys(form.controls).forEach(key => {
	// 		let control = form.controls[key];

	// 		// Get potential error message for each form field
	// 		control.valueChanges
	// 		.pipe(debounceTime(200))
	// 		.pipe(distinctUntilChanged())
	// 		.pipe(takeUntil(this.destroyed$))
	// 		.subscribe((change) => {
	// 			this.getControlError(control);
	// 		})
	// 	});
	// }

	// getControlError(control: AbstractControl) {
	// 	// Get potential error message for each form field
	// 	const controlErrors = control.errors;
	// 	if (controlErrors != null) {
	// 		Object.keys(controlErrors).forEach(keyError => {
	// 			console.log('Error: ' + keyError + ', err value: ', controlErrors[keyError]);
	// 		});
	// 	}
	// }

	register() {
		console.log("SUBMIT");
		if (!this.registerForm.valid || (this.registerForm.controls["password"].value != this.registerForm.controls["cpassword"].value)) {
			console.log("Invalid credentials!");
			return;
		} else {
			let user: User = {
				email: this.registerForm.controls["email"].value,
				userName: this.registerForm.controls["email"].value
			};
			this._userService.userPost(this.registerForm.controls["password"].value, user)
				.subscribe({
					next: (data) => {
						console.log("Success: " + data);
						this._router.navigate(["/user/login"]);
					},
					error: (error) => {
						console.log("Error: " + error.message);
					}
				})
		}
	}

	/** Password must equal confirm password */
	checkPasswords(control: AbstractControl): ValidationErrors | null {
		let pass = control.get("password");
		let confirmPass = control.get("cpassword");

		return pass?.value === confirmPass?.value ? null : { passwordsDontMatch: true };
	};

	ngOnDestroy() {
		this.destroyed$.next(true);
		this.destroyed$.complete(); 
	}
}
