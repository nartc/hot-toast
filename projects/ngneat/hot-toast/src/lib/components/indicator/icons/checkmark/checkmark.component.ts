import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../../../hot-toast.model';

@Component({
  selector: 'hot-toast-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckMarkComponent {
  @Input() theme!: IconTheme;
}
