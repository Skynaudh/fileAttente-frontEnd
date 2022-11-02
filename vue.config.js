module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: 'http://192.168.137.1:8000'

    }
};