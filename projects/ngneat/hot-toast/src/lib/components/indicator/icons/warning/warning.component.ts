import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningComponent {
  @Input() theme!: IconTheme;
}
