import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
  	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm : FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.email, Validators.required]),
		password: new FormControl(null, Validators.required),
		cpassword: new FormControl(null, Validators.required)
	}, this.checkPasswords );

  	constructor(private _router: Router, private _userService: UserService) { }

  	ngOnInit() {
	  
	}

	register() {
		if (!this.registerForm.valid || (this.registerForm.controls["password"].value != this.registerForm.controls["cpassword"].value)) {
			console.log("Invalid credentials!");
			return;
		}else{
			this._userService.register(JSON.stringify(this.registerForm.value))
			.subscribe(
				data => { 
					console.log("Success: " + data); 
					this._router.navigate(["/user/login"]);
				},
				error => {
					console.log("Error: " + error.message);
				}
				
			)
		}
	}

	/** Password must equal confirm password */
	checkPasswords(control: AbstractControl): ValidationErrors | null {
		let pass = control.get("password");
		let confirmPass = control.get("cpassword");

		return pass === confirmPass ? null : { passwordsDontMatch: true };
	};

}
