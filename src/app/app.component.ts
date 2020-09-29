import { Component, VERSION } from "@angular/core";

import { AbilityBuilder } from "@casl/ability";

import defineRulesFor, { AppAbility, Todo } from "./services/ability";

const negativeAssignee: string = "john";
const positiveAssignee: string = "me";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  todoFalseUpdateTest: Todo = { assignee: negativeAssignee, type: "Todo" };
  todoUpdateTest: Todo = { assignee: positiveAssignee, type: "Todo" };

  constructor(private abilities: AppAbility) {
    this.abilities.update(defineRulesFor());
    console.log(this.abilities.rules);
    this.addNewRulesAtRuntime();
  }

  addNewRulesAtRuntime() {
    const { cannot, rules } = new AbilityBuilder<AppAbility>();
    cannot("delete", "Todo", { assignee: negativeAssignee });
    cannot("update", "Todo", { assignee: negativeAssignee });

    const newRules = [...this.abilities.rules, ...rules];
    this.abilities.update(newRules);
  }
}
