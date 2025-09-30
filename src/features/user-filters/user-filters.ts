import { ChangeDetectionStrategy, Component, signal, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tuiItemsHandlersProvider, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { Debounce } from '../../shared/lib/debounce';

interface Character {
  readonly id: number;
  readonly name: string;
  readonly filter: string;
}

@Component({
  selector: 'app-user-filters',
  imports: [FormsModule, TuiChevron, TuiDataListWrapper, TuiSelect, TuiTextfield],
  templateUrl: './user-filters.html',
  styleUrl: './user-filters.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: signal((x: Character) => x.name),
      identityMatcher: signal((a: Character, b: Character) => a.id === b.id),
    }),
  ],
})
export class UserFilters {
  private debouncedEmit: () => void;

  protected readonly filters: Character[] = [
    { id: 1, name: 'Имя', filter: 'name' },
    { id: 2, name: 'Емайл', filter: 'email' },
    { id: 3, name: 'Юзернейм', filter: 'username' },
    { id: 4, name: 'Название компании', filter: 'company.name' },
    { id: 5, name: 'Телефон', filter: 'phone' },
    { id: 6, name: 'Вебсайт', filter: 'website' },
  ];

  protected valueInput = '';
  protected selectFilter: Character | null = null;

  constructor(private useDebounce: Debounce) {
    this.debouncedEmit = this.useDebounce.debounce(() => this.emitChange(), 1000);
  }

  @Output() filterChange = new EventEmitter<{
    filter: string,
    value: string
  }>

  onInputChange(value: string) {
    this.valueInput = value
    this.debouncedEmit()
  }

  onFilterChange(character: Character) {
    this.selectFilter = character
    this.valueInput = ''
    this.emitChange()
  }

  private emitChange() {
    if (!this.selectFilter) return

    this.filterChange.emit({
      filter: this.selectFilter.filter,
      value: this.valueInput
    })
  }
}
