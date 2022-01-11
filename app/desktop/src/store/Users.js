Ext.define('ModernApp.store.Users', {
    extend: 'Ext.data.Store',

    alias: 'store.users',

    model: 'ModernApp.model.User',
    storeId: 'usersStore',
    // data: { items: [

    //     { name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" , id: "1"},
    //     { name: 'Deanna',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
    //     { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444" }
    // ]},

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
