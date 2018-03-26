import {Injectable, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToasterService {
  constructor(public toast: ToastsManager) {
  }

  showSuccess(title, message) {
    this.toast.success(message, title);
  }

  showError(title, message) {
    this.toast.error(message, title);
  }

  showWarning(title, message) {
    this.toast.warning(message, title);
  }

  showInfo(title, message) {
    this.toast.info(message, title);
  }
}
