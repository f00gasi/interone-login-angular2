import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpService } from "../http.service";


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  providers: [HttpService]
})
export class LoginformComponent implements OnInit {

	userInput: Object = {};

	submitted: Boolean = false;
	validLogin: Boolean = false;
	isLoading: Boolean = false;

	@ViewChild('usernameInput') input1: ElementRef;
	@ViewChild('passwordInput') input2: ElementRef;

	constructor(private httpService: HttpService, private renderer: Renderer) {}

	ngOnInit() {}

	onSubmit(form: NgForm) {
		this.isLoading = true;

		this.httpService.getUser().subscribe(data => {
			this.validLogin = this.checkUser(data);
			this.submitted = true;

			setTimeout( () => {
				this.isLoading = false;
			}, 800);
		});

		this.blurClearElements();
		//console.log(this);
	}

	// MOCKUP CHECKT USER & PASSWORD
	checkUser(serverData: Object) {
		return this.userInput['username'] == serverData['username'] && this.userInput['password'] == serverData['password'];
	}

	blurClearElements() {
		this.renderer.setElementProperty(this.input1.nativeElement , 'value' , '');
		this.renderer.setElementProperty(this.input2.nativeElement , 'value' , '');
		this.renderer.invokeElementMethod(this.input1.nativeElement, 'blur');
		this.renderer.invokeElementMethod(this.input2.nativeElement, 'blur');
	}

}
