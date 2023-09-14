import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-column-item',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnItemComponent {
  @Input({ required: true }) value!: number;

  @Output() valueChange = new EventEmitter<number>();

  @Output() delete = new EventEmitter<void>();
}
