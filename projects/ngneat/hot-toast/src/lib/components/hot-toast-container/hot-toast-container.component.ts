import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Content } from '@ngneat/overview';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HOT_TOAST_MARGIN } from '../../constants';
import { HotToastRef } from '../../hot-toast-ref';
import {
  AddToastRef,
  CreateHotToastRef,
  HotToastClose,
  Toast,
  ToastConfig,
  ToastPosition,
  UpdateToastOptions,
} from '../../hot-toast.model';
import { HotToastComponent } from '../hot-toast/hot-toast.component';

@Component({
  selector: 'hot-toast-container',
  templateUrl: './hot-toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotToastContainerComponent {
  @Input() defaultConfig!: ToastConfig;

  @ViewChildren(HotToastComponent) hotToastComponentList!: QueryList<HotToastComponent>;

  toasts: Toast[] = [];
  toastRefs: CreateHotToastRef[] = [];

  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<HotToastClose>();

  private onClosed$ = this._onClosed.asObservable();

  constructor(private cdr: ChangeDetectorRef) {}

  trackById(index: number, toast: Toast) {
    return toast.id;
  }

  calculateOffset(toastId: string, position: ToastPosition) {
    const visibleToasts = this.toasts.filter((t) => t.visible && t.position === position);
    const index = visibleToasts.findIndex((toast) => toast.id === toastId);
    return index !== -1
      ? visibleToasts
          .slice(...(this.defaultConfig.reverseOrder ? [index + 1] : [0, index]))
          .reduce((acc, t) => acc + (t.height || 0) + HOT_TOAST_MARGIN, 0)
      : 0;
  }

  updateHeight(height: number, toast: Toast) {
    toast.height = height;
    this.cdr.detectChanges();
  }

  addToast(ref: HotToastRef): AddToastRef {
    this.toastRefs.push(ref);

    const toast = ref.getToast();

    this.toasts.push(ref.getToast());

    this.cdr.detectChanges();

    return {
      dispose: () => {
        this.closeToast(toast.id);
      },
      updateMessage: (message: Content) => {
        toast.message = message;
        this.cdr.detectChanges();
      },
      updateToast: (options: UpdateToastOptions) => {
        this.updateToasts(toast, options);
        this.cdr.detectChanges();
      },
      afterClosed: this.getAfterClosed(toast),
    };
  }

  closeToast(id: string) {
    const comp = this.hotToastComponentList.find((item) => item.toast.id === id);
    if (comp) {
      comp.close();
    }
  }

  beforeClosed(toast: Toast) {
    toast.visible = false;
  }

  afterClosed(closeToast: HotToastClose) {
    const toastIndex = this.toasts.findIndex((t) => t.id === closeToast.id);
    if (toastIndex > -1) {
      this._onClosed.next(closeToast);
      this.toasts = this.toasts.filter((t) => t.id !== closeToast.id);
      this.toastRefs = this.toastRefs.filter((t) => t.getToast().id !== closeToast.id);
      this.cdr.detectChanges();
    }
  }

  hasToast(id: string) {
    return this.toasts.findIndex((t) => t.id === id) > -1;
  }

  private getAfterClosed(toast: Toast) {
    return this.onClosed$.pipe(filter((v) => v.id === toast.id));
  }

  private updateToasts(toast: Toast, options?: UpdateToastOptions) {
    this.toasts = this.toasts.map((t) => ({ ...t, ...(t.id === toast.id && { ...toast, ...options }) }));
  }
}
