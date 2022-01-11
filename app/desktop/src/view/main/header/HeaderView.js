Ext.define('ModernApp.view.main.header.HeaderView', {
    extend: 'Ext.Toolbar',
    xtype: 'headerview',
    cls: 'headerview',
    viewModel: {},
    items: [
        { 
            xtype: 'container',
            cls: 'headerviewtext',
            bind: { html: '{heading}' }
        },
        '->',
        {
        
            xtype: 'button',
            bind: { hidden: '{hide_button}' },
            ui: 'headerbutton',
            reference: 'detailtoggle',
            handler: 'newUser',
            iconCls: 'x-fa fa-plus'
        }
    ]
});
