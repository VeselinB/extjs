Ext.define('ModernApp.view.User.UserViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.Userviewstore',
    model: 'ModernApp.model.User',
    //  groupField: 'dept',
    storeId: 'usersStore',

    proxy: {
        type: 'ajax',
        url: "http://jsonplaceholder.typicode.com/users",
        reader: {
            type: 'json',
            rootProperty: 'users',

        }
    },
    autoLoad: true
});
