﻿var tIngredientes;
$(document).ready(function () {
    jQuery.support.cors = true;
    CargaUnidadesMedida();
    $("#bLimpiar").on("click", function () {
        Limpiarfrm();
    });
    $("#bGuardar").on("click", function () {
        Guardarfrm();
    });

    tIngredientes = $('#tIngredientes').DataTable({
        //dom: 'lrtip',
        //searching: true,
        //lengthChange: false,
        //info: false,
        //select: false,
        //responsive: false,
        //pagingType: 'simple',
        //scrollY: "450px",
        //scrollCollapse: true,     

        columns: [


            {
                data: "Id", visible: false
                , render: function (data, type, row) {
                    var str = "<span><i class=' fa fa-phone'></i>";
                    if (row.IdSucursal > 0)
                        str += "<i style='margin-left:5px;' class='fa fa-arrow-circle-right'></i></span>";
                    else if (row.IdSucursal === 8)
                        str += "<i style='margin-left:5px;' class='fa fa-arrow-circle-left'></i></span>";
                    return str;
                }
            },
            {
                data: "Ingrediente", title: "Ingrediente"
            },
            {
                data: "UnidadMedida", title: "Unidad de Medida"
            },
            {
                data: "Cantidad", title: "Cantidad"
            },
            {
                data: "Estatus", title: "Estatus", render: function (data, type, row) {
                    var strEstatus = "<button class='btn btn-danger' onclick='Eliminar(" + row.Id + ")' type='button'>Eliminar</button>";

                    return strEstatus;
                }
            }




        ],

        ajax: {

            url: "https://localhost:44376/" + "api/WaIngredientes",
            crossDomain: true,

            dataType: "json",
            dataSrc: ""
        }
    });


    $('#tIngredientes').on('click', 'tr', function () {
        var objIngrediente = tIngredientes.row(this).data();
        Cargafrm(objIngrediente);

    });
})


function Cargafrm(Ingredientes) {
    $("#hId").val(Ingredientes.Id);
    $("#txtIngrediente").val(Ingredientes.Ingrediente);
    $("#sUnidadMedidaId").val(Ingredientes.UnidadMedidaId);
    $("#txtCantidad").val(Ingredientes.Cantidad);
}

function Limpiarfrm() {
    $("#frmIngrediente")[0].reset();
    $("#hId").val(0);
}

function Guardarfrm() {
    $.post("https://localhost:44376/" + "api/WaIngredientes", $("#frmIngrediente").serialize(), function (data) {
        Limpiarfrm();
        tIngredientes.ajax.reload();
    })
}


function Eliminar(id) {
    $.SmartMessageBox({
        title: "Pastor Enchilado",
        content: "¿Deseas Eliminar el registro? </br> Da clic en si para confirmar",
        buttons: '[No][Si]'
    }, function (ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.get("https://localhost:44376/" + "api/WaIngredientes/Eliminar?id=" + id, function (data) {
                Limpiarfrm();
                tIngredientes.ajax.reload();
                $.smallBox({
                    title: "Pastor Enchilado",
                    content: "Registro Eliminado",
                    color: "#3276B1",

                    icon: "fa fa-trash  swing animated",
                    timeout: 4000

                });
            })
        }
        if (ButtonPressed === "No") { }

    });




}
function CargaUnidadesMedida() {
    $.get("https://localhost:44376/" + "api/WaUnidadMedida", function (data) {
        var stringUnidadesMedida="";
        for (var i = 0; i < data.length; i++) {
            stringUnidadesMedida += "<option selected value=" + data[i].Id + ">" + data[i].UnidadMedida +"</option>";
        }
        $("#sUnidadMedidaId").html(stringUnidadesMedida);
    });
}

