import { Inject, NgModule, Pipe, PipeTransform } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

import { AbilityModule } from "@casl/angular";
import { PureAbility, AnyAbility } from "@casl/ability";
import { AppAbility, detectAppSubjectType } from "./services/ability";
import { AbleCustomPipe } from "./pipes/able.pipe";

@NgModule({
  imports: [BrowserModule, FormsModule, AbilityModule],
  declarations: [AppComponent, HelloComponent, AbleCustomPipe],
  providers: [
    {
      provide: AppAbility,
      useValue: new AppAbility([], {
        detectSubjectType: detectAppSubjectType
      })
    },
    { provide: PureAbility, useExisting: AppAbility }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
