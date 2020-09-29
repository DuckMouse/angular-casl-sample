import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  detectSubjectType
} from "@casl/ability";

export class Todo {
  type?: "Todo";
  id?: number;
  title?: string;
  assignee?: string;
  completed?: boolean;
}

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "Todo" | Todo | "all";

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor() {
  const { can, rules } = new AbilityBuilder<AppAbility>();

  can('read', 'all')
  can(["read", "create"], "Todo");
  can("update", "Todo", { assignee: "me" });


  return rules;
}

function detectAppSubjectType(subject?: Subjects) {
  if (subject && typeof subject === "object" && subject.type) {
    return subject.type;
  }

  return detectSubjectType(subject);
}

export function buildAbilityFor(): AppAbility {
  return new AppAbility(defineRulesFor(), {
    detectSubjectType: detectAppSubjectType
  });
}
