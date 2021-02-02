import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme, ToastType } from '../../hot-toast.model';

@Component({
  selector: 'hot-toast-indicator',
  templateUrl: 'indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorComponent {
  @Input() theme!: IconTheme;
  @Input() type!: ToastType;
}
