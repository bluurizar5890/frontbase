import PNotify from "pnotify/dist/es/PNotify";
const success = (mensaje) => {
    const notice = PNotify.success({
        title: 'Información!',
        text: mensaje,
        hide: true,
        icon: true,
        modules: {
            Buttons: {
                closer: true,
                sticker: true
            }
        }
    });
    notice.on('click', function() {
        notice.close();
    });
}

const error = (mensaje) => {
    const notice = PNotify.error({
        title: 'Información!',
        text: mensaje,
        hide: true,
        icon: true,
        modules: {
            Buttons: {
                closer: true,
                sticker: true
            }
        }
    });
    notice.on('click', function() {
        notice.close();
    });
}

const info = (mensaje) => {
    const notice = PNotify.info({
        title: 'Información!',
        text: mensaje,
        hide: true,
        icon: true,
        modules: {
            Buttons: {
                closer: true,
                sticker: true
            }
        }
    });
    notice.on('click', function() {
        notice.close();
    });
}



export default{success,error,info}