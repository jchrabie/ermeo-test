import { DragDropModule } from '@angular/cdk/drag-drop';
import { JsonPipe, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColumnComponent } from './column/column.component';
import { Column } from './shared/model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ColumnComponent,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgFor,
    JsonPipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columns = signal<Column[]>([
    { name: 'Column1', values: [1, 15, 5, 3] },
    { name: 'Column2', values: [52, 21] },
    { name: 'Column3', values: [7, 30] },
  ]);

  add(): void {
    this.columns.mutate(columns => {
      if (columns.length < 9) {
        columns.push({ name: `Column${columns.length + 1}`, values: [] });
      }
    });
  }

  update(columnName: string, index: number): void {
    this.columns.mutate(columns => (columns[index].name = columnName));
  }

  delete(index: number): void {
    this.columns.update(columns => {
      columns.splice(index, 1);

      return columns;
    });
  }

  trackByFn(index: number): number {
    return index;
  }
}
