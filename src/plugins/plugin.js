import clickaway from './clickaway/clickaway';
import dateFormat from './date-format/date-format';
import dialog from './dialog/dialog';

const install = function (app) {
    app.use(clickaway);
    app.use(dateFormat);
    app.use(dialog);
};

export default { install };
