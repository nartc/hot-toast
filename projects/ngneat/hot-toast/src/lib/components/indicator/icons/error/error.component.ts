import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input() theme!: IconTheme;
}
