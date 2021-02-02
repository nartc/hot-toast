import { Content } from '@ngneat/overview';
import { Observable, race, Subject } from 'rxjs';
import { HotToastContainerComponent } from './components/hot-toast-container/hot-toast-container.component';
import { HotToastClose, Toast, UpdateToastOptions, HotToastRefProps } from './hot-toast.model';

export class HotToastRef implements HotToastRefProps {
  updateMessage!: (message: Content) => void;
  updateToast!: (options: UpdateToastOptions) => void;
  afterClosed!: Observable<HotToastClose>;

  private _dispose!: () => void;
  set dispose(value: () => void) {
    this._dispose = value;
  }

  /** Subject for notifying the user that the toast has been closed. */
  private _onClosed = new Subject<HotToastClose>();

  constructor(private toast: Toast) {}

  getToast() {
    return this.toast;
  }

  /**Used for internal purpose
   * Attach ToastRef to container
   */
  appendTo(container: HotToastContainerComponent) {
    const { dispose, updateMessage, updateToast, afterClosed } = container.addToast(this);

    this.dispose = dispose;
    this.updateMessage = updateMessage;
    this.updateToast = updateToast;
    this.afterClosed = race(this._onClosed.asObservable(), afterClosed);
    return this;
  }

  /**
   * Closes the toast
   *
   * @param [closeData={ dismissedByAction: false }] -
   * Make sure to pass { dismissedByAction: true } when closing from template
   * @memberof HotToastRef
   */
  close(closeData: { dismissedByAction?: boolean } = { dismissedByAction: false }) {
    this._dispose();
    this._onClosed.next({ dismissedByAction: closeData.dismissedByAction!, id: this.toast.id });
    this._onClosed.complete();
  }
}
