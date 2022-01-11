Ext.define("ModernApp.view.form.Form", {

    extend: 'Ext.form.Panel',
    xtype: "ui-form",
    id: "form",
    viewModel: { type: 'Userviewmodel' },
    title: 'User Form',
    height: 350,
    width: 300,
    bodyPadding: 10,
    defaultType: 'textfield',
    initialize: function () {
        this.getViewModel().doSetData({ name: "name" });
        var formData = this.getViewModel().doGetData();
        console.log(formData)
    },
    items: [
        {
            fieldLabel: 'First Name',
            name: "ddd",
            bind: {
                value: '{form}'
            }
        },
        {
            fieldLabel: 'Last Name',
            name: 'form.phone',
            bind: {
                value: '{form.phone}'
            }
        },

    ],
})