import { ChangeDetectorRef, Component, VERSION } from "@angular/core";
import { AbilityBuilder } from "@casl/ability";
import { timeout } from "rxjs/operators";
import { interval } from "rxjs";
import defineRulesFor, { AppAbility, Todo } from "./services/ability";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  todoFalseUpdateTest: Todo = { assignee: "Martin", type: "Todo" };
  todoUpdateTest: Todo = { assignee: "me", type: "Todo" };
  name = "Angular " + VERSION.major;

  constructor(private abilities: AppAbility, private cd: ChangeDetectorRef) {
    this.abilities.update(defineRulesFor());
    this.addNewRulesAtRuntime();
  }

  addNewRulesAtRuntime() {
    const { can, cannot, rules } = new AbilityBuilder<AppAbility>();
    cannot("delete", "Todo", { assignee: "john" });
    cannot("update", "Todo", { assignee: "john" });

    const newRules = [...this.abilities.rules, ...rules];
    this.abilities.update(newRules);
    this.testUpdate();
  }

  testUpdate() {
    interval(2000).subscribe(() => {
      this.todoFalseUpdateTest.assignee = "john";
      this.cd.markForCheck();
    });
  }
}
