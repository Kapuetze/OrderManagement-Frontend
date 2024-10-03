import { Component, OnInit } from '@angular/core';
import { UserHelper } from '../../user.service';
import { Router } from "@angular/router";
import { User, UserService } from 'src/app/shared/services/ordermanagement-api';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user: User = {
		email: '',
		userName: ''
	};

	constructor(private userService: UserService, private router: Router) { }

	ngOnInit() {
		this.userService.userGet()
			.subscribe(
				data => this.user = data as User
			)
	}

}
