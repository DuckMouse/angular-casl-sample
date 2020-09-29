import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  detectSubjectType
} from "@casl/ability";

export class Todo {
  type?: "Todo";
  assignee?: string;
}

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "Todo" | any | "all";

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor() {
  const { can, rules } = new AbilityBuilder<AppAbility>(AppAbility);
  can(["read", "create", "update", "delete", "manage"], "all");

  return rules;
}

export function detectAppSubjectType(subject?: Subjects) {
  if (subject && typeof subject === "object" && subject.type) {
    return subject.type;
  }

  return detectSubjectType(subject);
}
