import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

import { AbilityModule } from "@casl/angular";
import { PureAbility, Ability } from "@casl/ability";
import { AppAbility, buildAbilityFor } from "./services/ability";

const ability = buildAbilityFor();

@NgModule({
  imports: [BrowserModule, FormsModule, AbilityModule],
  declarations: [AppComponent, HelloComponent],
  providers: [
    { provide: AppAbility, useValue: ability },
    { provide: PureAbility, useExisting: AppAbility }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
