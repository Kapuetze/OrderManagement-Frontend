import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

//import the authentication JWT HTTP interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { AuthGuard } from './shared/auth/auth.guard';
import { CustomUtilitiesModule } from './custom-utilities/custom-utilities.module';
import { ApiModule, Configuration, ConfigurationParameters } from './shared/services/ordermanagement-api';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CustomUtilitiesModule,
		ApiModule.forRoot(() => {
			const params: ConfigurationParameters = {
				credentials: { "Bearer": "Bearer " + localStorage.getItem("jwt_token")! }
			}

			return new Configuration(params)
		})
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	},
	{
		provide: ErrorHandler,
		useClass: ErrorHandler
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
