import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconTheme } from '../../hot-toast.model';

@Component({
  selector: 'hot-toast-animated-icon',
  templateUrl: './animated-icon.component.html',
  styleUrls: ['./animated-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedIconComponent {
  @Input() iconTheme!: IconTheme;
}
