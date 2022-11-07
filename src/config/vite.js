const base = {
    
}

const config = {
    dev: {
        ...base,
        APIProxyPath: '',
        server: {
            host: true,
            port: 8082,
            proxy: {}
        }
    },
    lab: {
        ...base,
        APIProxyPath: '',
        server: {}
    },
    prod: {
        ...base,
        APIProxyPath: '',
        server: {}
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
