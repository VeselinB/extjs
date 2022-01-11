Ext.define('ModernApp.view.User.UserView',{
    extend: 'Ext.grid.Grid',
    xtype: 'Userview',
    cls: 'Userview',
    requires: ['Ext.grid.rowedit.Plugin'],
    controller: {type: 'Userviewcontroller'},
    viewModel: {type: 'Userviewmodel'},
    store: {type: 'Userviewstore'},
    //grouped: true,
    defaults:{
        editable: false, 
    },
    groupFooter: {
        xtype: 'gridsummaryrow'
    },
    // plugins: {
    //     rowedit: {
    //         autoConfirm: false
    //     }
    // },
    columns: [
        {
            text: 'Id',
            dataIndex: 'id',
            editable: true,
            width: 30,
            cell: {userCls: 'bold'}
        },
        {
            text: 'Name',
            dataIndex: 'name',
            editable: true,
            flex:1,
            cell: {userCls: 'bold'}
        },
        {text: 'Email',
        dataIndex: 'email',
      
        width: 230},
        {
            text: 'Phone',
            dataIndex: 'phone',
            editable: true,
            width: 150
        },
        {
            text: 'Actions',
            iconCls: 'x-fa fa-image',
            flex: 1,

            cell: {
                xtype: "widgetcell",
                widget: {
                    xtype: "button",

                    text: '',

                    menu: {
                        xtype: 'menu',
                        items: [{
                            text: 'Edit',

                            iconCls: 'x-fa fa-edit',
                            listeners: {
                                click: {
                                    fn: 'editUserData',
                                    // data: this
                                }
                            }
                        }, {
                            text: 'Delete',
                            iconCls: 'x-fa fa-remove',
                            handler: "deleteUser"


                        },]

                    },

                }
            }

        },
    ],
    listeners: {
        canceledit: 'onEditCancelled'
    }
});
