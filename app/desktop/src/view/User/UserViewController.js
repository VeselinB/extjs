function removeRecordFromBackend(id) {
	return Ext.Ajax.request({
		url: "http://jsonplaceholder.typicode.com/users/" + id,
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },

		success: function (response) {

			// let res = Ext.decode(response.responseText)
			// console.log(res)
			return removeRecordFromStore(id)

		}
	});
}

function removeRecordFromStore(id) {

	var index = Ext.StoreMgr.lookup("usersStore").find('id', id);

	Ext.StoreManager.lookup('usersStore').removeAt(index);


}

function confirmDialog() {
	var dialog = Ext.create({
		xtype: 'dialog',
		html: "Are you sure?",

		buttons: [
			{



				text: 'NO',
				handler: function () {

					dialog.destroy();

				}
			}, {



				text: 'OK',
				handler: function () {
					removeRecordFromBackend()
						.then(() => {
							dialog.destroy();
						})
				}
			},
		],
	},

	)

	dialog.show();
}

Ext.define('ModernApp.view.User.UserViewController', {
	extend: 'ModernApp.ApplicationController',
	alias: 'controller.Userviewcontroller',



	deleteUser: function (record) {
		var id = record.up().up().up().up().cells[0]._rawValue
		confirmDialog()
		//  removeRecordFromBackend(id)
	},

	onEditCancelled: function (editor, value, startValue, eOpts) {
		var user = Ext._find(value.record.store.config.data.items, { name: value.record.data.name });
		Ext.Msg.confirm('Confirm', value.record.data.name + ': ' + user.phone + ' is phone number', 'onConfirm', this);
	}
});


