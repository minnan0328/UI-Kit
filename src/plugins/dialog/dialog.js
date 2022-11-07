import Toast from './toast/toast.vue';
import Alert from './alert/alert.vue';
import Confirm from './confirm/confirm.vue';
import { createApp } from 'vue';
class Dialog {
    constructor(component) {
        this.app = createApp(component);
        this.mounted = false;
        this.vm = null;
    }

    mount() {
        if (this.mounted) {
            return;
        }

        const node = document.createElement('div');
        document.body.appendChild(node);

        this.vm = this.app.mount(node);
        this.mounted = true;
    }

    open(message, option) {
        this.mount();
        this.vm.open(message, option);
    }

    close() {
        this.mount();
        this.vm.close();
    }
}

const install = function(app) {
    const toastDialog = new Dialog(Toast);
    const alertDialog = new Dialog(Alert);
    const confirmDialog = new Dialog(Confirm);


    app.config.globalProperties.$toast = (title, message) => {
        toastDialog.open(title, message);
    };

    app.config.globalProperties.$alert = (title, message) => {
        alertDialog.open(title, message);
    };

    app.config.globalProperties.$confirm = (title, message, ok, okBtnText) => {
        confirmDialog.open(title, message, ok, okBtnText);
    };
};

export default { install };
