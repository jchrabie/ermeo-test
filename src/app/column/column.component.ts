import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorItemDirective } from '../shared/directives';
import { ColumnItemComponent } from './column-item/column-item.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Column } from '../shared/model';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    NgFor,
    ColorItemDirective,
    ColumnItemComponent,
    DragDropModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input({ required: true }) set column(column: Column) {
    this.title.update(() => column.name);
    this.list.update(() => column.values);
  }

  @Output() titleChange = new EventEmitter<string>();

  @Output() deleteColumn = new EventEmitter<void>();

  title = signal<string>('');
  list = signal<number[]>([]);
  count = computed(() => this.list().length);

  add(): void {
    this.list.mutate(list => list.push(0));
  }

  update(index: number, value: number): void {
    this.list.mutate(list => (list[index] = value));
  }

  delete(index: number): void {
    this.list.update(list => {
      list.splice(index, 1);

      return list;
    });
  }

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.refresh();
  }

  trackByFn(index: number) {
    return index;
  }

  refresh(): void {
    this.list.update(l => l);
  }
}
