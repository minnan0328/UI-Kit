const base = {
    
}

const config = {
    dev: {
        ...base,

    },
    lab: {
        ...base,
    },
    prod: {
        ...base,
    }
}
console.log(process.env.type);
const type = process.env.type;

let setting = config.dev;

if (type === 'lab') {
    setting = config.lab;
} else if (type === 'prod') {
    setting = config.prod;
}

export default {
    isDev: type === 'dev',
    ...setting
};
