module.exports = {
    github: {
        version: '3.0.0',
        debug: false,
        protocol: 'https',
        host: 'api.github.com',
        headers: {
            'user-agent': 'Star Liner'
        },
        authentication: {
            type: 'basic',
            username: '',
            password: ''
        }
    }
};
