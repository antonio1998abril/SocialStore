module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/register',
                destination: 'http://localhost:5000/api/register'
            },{
                source:'/api/refresh_token',
                destination:'http://localhost:5000/api/refresh_token'
            },{
                source:'/api/info',
                destination:'http://localhost:5000/api/info'
            },{
                source:'/api/login',
                destination:'http://localhost:5000/api/login'
            },{
                source:'/api/logout',
                destination:'http://localhost:5000/api/logout'
            }
        ]
    }
}

