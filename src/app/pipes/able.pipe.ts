import { Inject, Pipe, PipeTransform } from "@angular/core";
import { AnyAbility, PureAbility } from "@casl/ability";
import { Observable } from "rxjs";

@Pipe({ name: "ableCustom", pure: false })
export class AbleCustomPipe<T extends AnyAbility> implements PipeTransform {
  private _ability: T;
  constructor(@Inject(PureAbility) ability: T) {
    this._ability = ability;
  }
  transform(...args: Parameters<T["can"]>): Observable<boolean> {
    return new Observable(s => {
      const output = Array.isArray(args[0])
        ? args[0].some(arg => this._ability.can(arg, args[1]))
        : this._ability.can(...args);
      const emit = () => s.next(output);
      emit();
      return this._ability.on("updated", emit);
    });
  }
}
