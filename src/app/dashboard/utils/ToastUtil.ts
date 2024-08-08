import { MessageService } from 'primeng/api';

export class ToastUtils {

  static showToast(messageService: MessageService, text: string, severity: string) {
    messageService.add({ severity: severity, detail: text, life: 2000 });
  }
}
