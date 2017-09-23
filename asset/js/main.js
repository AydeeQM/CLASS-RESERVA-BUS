"use strict";

class Reserve {
    constructor(numSeat, row) {
        this.numSeat = numSeat;
        this.row = row;
        this.passengers = [];
        this.currentCell = undefined;
    }

    renderSeat() {
        let col = this.numSeat / this.row;
        let passage = '';
        let table = "";
        table += "<table class='celda' border='5' cellpadding='10' cellpadding='10' cellspacing='5' align='center' bordercolor='blue'>";
        for (let i = 1; i <= this.row; i++) {
            table += "<tr>";
            let group_seat = i;
            for (let j = 0; j < col; j++) {
                table += "<td>" + group_seat + "</td>";
                group_seat += 4;
            }
            (i == 2) ? passage += "<td></td>" : passage = "";
            table += "</tr>" + passage;
        }
        table += "</table>";

        $("#tablero").append(table);
    }

    inboxUser() {
        $('table tr td').click((event) => {
            $("#mostrar").html(parseInt(event.target.textContent));

            let num = parseInt($('#mostrar').text());//numero del asiento

            this.currentCell = $(event.target);//recupera el TD actual

            //recorre el array this.passengers
            $.grep(this.passengers, (value, index) => {
                if (num == this.passengers[index].Item) {
                    $("#nombre").val(this.passengers[index].Nombre);
                    $("#apell").val(this.passengers[index].Apellido);
                    $("#eldni").val(this.passengers[index].Dni);
                }
            });

        });
    }

    addUser() {
        $('#agregar').click(() => {
            let data = {};
            let asiento = parseInt($('#mostrar').text());
            let suNombre = $('#nombre').val();
            let suApellido = $('#apell').val();
            let suDNI = parseInt($('#eldni').val());

            data.Item = asiento;
            data.Nombre = suNombre;
            data.Apellido = suApellido;
            data.Dni = suDNI;

            this.passengers.push(data);

            alert('El pasajero ' + ' ' + data.Nombre + ' ' + data.Apellido + ' en el asiento N° ' + data.Item + ' se ha agregado correctamente');

            this.currentCell.css('background', '#F8ED50');

            $("#nombre").val('');
            $("#apell").val('');
            $("#eldni").val('');

        });
    }

    printList() {
        $('#buscar').click(() => {
            let id_dni = parseInt($('#dni').val());
            $.grep(this.passengers, (value, index) => {
                if (id_dni == this.passengers[index].Dni) {
                    $("#nombre").val(this.passengers[index].Nombre);
                    $("#apell").val(this.passengers[index].Apellido);
                    $("#eldni").val(this.passengers[index].Dni);
                }
            });
        });
    }

    cancelSeat() {
        $('#cancela').click(() => {
            let num = parseInt($('#mostrar').text());
            $.grep(this.passengers, (value, index) => {
                let ss = this.passengers[index].Item
                let itemtoRemove = this.passengers[index];
                if (num === ss) {
                    this.passengers.splice($.inArray(itemtoRemove, this.passengers), 1);
                }
            });

            this.currentCell.css('background', 'transparent');

            $("#nombre").val('');
            $("#apell").val('');
            $("#eldni").val('');
        });
    }

    consulUser() {
        $('#consulta').click(() => {
            $("#nombre").val('');
            $("#apell").val('');
            $("#eldni").val('');
        });
    }
}

let bus_Reserve = new Reserve(32, 4);
bus_Reserve.renderSeat();
bus_Reserve.inboxUser();
bus_Reserve.addUser();
bus_Reserve.printList();
bus_Reserve.cancelSeat();
bus_Reserve.consulUser();

