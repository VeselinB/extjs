Ext.define('ModernApp.store.Images', {
    extend: 'Ext.data.Store',

    alias: 'store.images',

    model: 'ModernApp.model.Image',
    storeId: 'usersStore',


    proxy: {
        type: 'ajax',
        url: "http://jsonplaceholder.typicode.com/photos",
        reader: {
            type: 'json',
            rootProperty: 'images',

        }
    },
    autoLoad: true
});
