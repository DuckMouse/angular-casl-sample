import { Component, VERSION } from "@angular/core";

import defineRulesFor, { AppAbility, Todo } from "./services/ability";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
     todoFalseTest: Todo = { assignee: "x", type: 'Todo' };
     todoTest: Todo = { assignee: "me", type: 'Todo' };
  name = "Angular " + VERSION.major;

  constructor(private abilities: AppAbility) {


    this.abilities.update(defineRulesFor());
    console.log(this.abilities.rules);

    console.log(this.abilities.can("delete", this.todoFalseTest));
    console.log(this.abilities.can("delete", this.todoTest));

  }
}
