var arrPersonas=[];

var buttonAgregar = document.getElementById("btn-agregar-persona");
var buttonGuardar = document.getElementById("btn-guardar-persona");

buttonAgregar.addEventListener("click", function () {
	$('.modal.fade').modal('show');
});

buttonGuardar.addEventListener("click", function () {
	addPersona();
	bindTablaPersonas();
});

function addPersona() {
	let _arrFechaNacimiento = (document.getElementById('fechaNacimiento').value).split('-');
	let _fechaNacimiento = new Date(_arrFechaNacimiento[0],_arrFechaNacimiento[1], _arrFechaNacimiento[2]);
	let _fechaActual = new Date();


	let nPersona = {
		nombre: document.getElementById('txtNombre').value,
		correo: document.getElementById('txtCorreo').value,
		fechaNacimiento: _fechaNacimiento,
		edad: (_fechaActual.getFullYear() - _fechaNacimiento.getFullYear()),
	};

	arrPersonas.push(nPersona);
}

function deletePersona(nombre){
	let currentIndex = arrPersonas.findIndex((f)=>f.nombre==nombre);

	if(currentIndex != -1){
		arrPersonas.splice(currentIndex, 1);
	}
}

function bindTablaPersonas() {
	let table = document.getElementById('tablePersonas'); 
	let table_tbody = table.getElementsByTagName('tbody')[0];

	table_tbody.innerHTML = '';

	for(var itemPersona of arrPersonas){
		let index = table_tbody.rows.length;
		let row = table_tbody.insertRow(index);

		let cell_nombre = row.insertCell(0);
		let cell_correo = row.insertCell(1);
		let cell_edad = row.insertCell(2);
		let cell_btn_eliminar = row.insertCell(3);

		cell_nombre.innerHTML = itemPersona.nombre;
		cell_correo.innerHTML = itemPersona.correo;
		cell_edad.innerHTML = itemPersona.edad;
		cell_btn_eliminar.innerHTML = `<a href="#" class="btn-eliminar-persona" data-nombre='${itemPersona.nombre}'>Eliminar</a>`;

		var buttonEliminar = document.querySelectorAll(`[data-nombre='${itemPersona.nombre}']`)[0];

		buttonEliminar.addEventListener("click", function () {
			let currentRow = this.parentNode.parentNode;
			currentRow.parentNode.removeChild(currentRow);

			deletePersona(this.dataset.nombre);

		});
	}
}
