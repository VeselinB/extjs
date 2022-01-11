let emailValidator = Ext.create('Ext.data.validator.Email');

function addRecordToBackend(data) {
	return Ext.Ajax.request({
		url: "http://jsonplaceholder.typicode.com/users",
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			...data
		}),
		success: function (response) {

			let res = Ext.decode(response.responseText)
			console.log(res)
			return addRecordToStore(data)
			// Ext.StoreManager.lookup('usersStore').add({
			//     name: 'mode2',
			//     id: 2
			// });;
			// console.log(Ext.StoreManager.lookup('usersStore').data)
		}
	});
}

function setEditedRecordToStore(id, editedRecord) {
	let storeItems = Ext.StoreManager.lookup('usersStore').getData().items
	let newStoreItems = [...storeItems];
	for (let i = 0; i < storeItems.length; i++) {
		if (storeItems[i].data.id == id) {
			newStoreItems[i].data = { ...editedRecord, id };

		}

	}
	Ext.StoreManager.lookup('usersStore').loadData(newStoreItems, true)
}

function updataRecordUserToBackend(id, user) {
	return Ext.Ajax.request({
		url: "http://jsonplaceholder.typicode.com/users/" + id,
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			...user
		}),
		success: function (response) {

			let res = Ext.decode(response.responseText)
			console.log(res)
			setEditedRecordToStore(id, user)
			// Ext.StoreManager.lookup('usersStore').add({
			//     name: 'mode2',
			//     id: 2
			// });;
			// console.log(Ext.StoreManager.lookup('usersStore').data)
		}
	});
}


function addRecordToStore(data) {

	let id = Ext.StoreMgr.lookup("usersStore").getCount() + 1;

	Ext.StoreManager.lookup('usersStore').add(
		{ ...data, id }
	);;

}

function openDialog(data, id) {

	let mode = !!data ? "edit" : "new";

	var form = new Ext.form.Panel({
		defaults: {
			enableKeyEvents: true,
			required: true,
			listeners: {
				keyup: function () {
					console.log(this.isValid())

					if (this.up().isValid()) {
						Ext.getCmp('btnid').enable();
					} else {
						Ext.getCmp('btnid').disable()
					}

				},
				change: function () {
					console.log(this.isValid())
					if (this.up().isValid()) {
						Ext.getCmp('btnid').enable();
					} else {
						Ext.getCmp('btnid').disable()
					}
					console.log('changed');
				}
			}
		},
		layout: {
			type: 'vbox',
			align: 'left'
		},
		items: [
			{
				xtype: 'textfield',
				fieldLabel: 'Name',
				name: 'name',
				labelAlign: 'top',
				label: 'Name',
				width: 265,
				allowBlank: false,
				value: !!data ? data.name : null,

				placeholder: 'Please Enter Something'//Doesnt Show
			},
			{
				xtype: 'textfield',
				fieldLabel: 'Email',
				label: 'Email',
				name: 'email',
				labelAlign: 'top',
				width: 265,
				allowBlank: false,
				value: !!data ? data.email : null,

				validators: [emailValidator],


			},
			{
				xtype: 'textfield',
				fieldLabel: 'Phone',
				label: 'Phone',
				name: 'phone',
				labelAlign: 'top',
				width: 265,
				allowBlank: false,
				required: true,
				value: !!data ? data.phone : null

			},
			// {
			//     xtype: 'myaddressfield'
			// }
		],



	},

	)

	let title = !!data ? "Edit" : "New User"
	var dialog = Ext.create({
		xtype: 'dialog',
		title: title,

		maximizable: false,
		// html: 'Content<br>goes<br>here',
		items: [
			form
		],

		buttons: [{
			id: "btnid",
			disabled: true,

			text: 'OK',
			handler: function () {
				form.validate();


				if (mode == "new") {
					addRecordToBackend(form.getValues())
						.then(() => {
							dialog.destroy()
						})
				} else {
					// TODO
					updataRecordUserToBackend(id, form.getValues())
						.then(() => {
							dialog.destroy()
						})



				}

			}
		}],
		listeners: {
			initialize: function () {

				if (!!data) {
					Ext.getCmp('btnid').enable();
				}
			}
		}
		// ok: function () {  // standard button (see below)
		//     // dialog.destroy();
		//     disabled: true,
		//     addRecordToBackend({ name: "Istzo" }).then(()=>{
		//         dialog.destroy();
		//     })
		// },
		// cancel: function () {  // standard button (see below)
		//     form.reset();
		//    // dialog.destroy();
		// }

	});

	dialog.show();




}

Ext.define('ModernApp.ApplicationController', {
	extend: 'Ext.app.ViewController',
	newUser: function () {
		openDialog()
	},

	editUserData: function (record) {

		var id = record.up().up().up().up().cells[0]._rawValue



		var index = Ext.StoreMgr.lookup("usersStore").find('id', id);
		var rec = Ext.StoreMgr.lookup("usersStore").getAt(index);
		openDialog(rec.data, id)

		// TODO ???
		// this.getViewModel().doSetData({data:rec.data}).then((res)=>{
		// 	console.log(res)

		// 		openDialog(rec.data)

		// });


	},
})