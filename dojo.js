var dojoConfig = {
    async: true,
    baseUrl: '.',
    packages: [
        'dojo',
        'dijit',
        'dojox',
    ]
};


// Hacer un inicio de cesion al registrar un nuevo Fan y permitirle distintas opciones. 

/*require(["dojo/dom"],function(dom){

    var numero = dom.byId(numero);
    dom.setSelectable("numero",false);

});*/

/*require(["dojo/dom","dojo/domReady!"], function(dom){
    var numero = dom.byId(numero);
    dom.setSelectable("numero", false);
  });*/



require(["dojo/parser","dijit/layout/BorderContainer","dijit/layout/TabContainer",
    "dijit/layout/ContentPane","dijit/TitlePane","dijit/form/TextBox","dijit/form/NumberTextBox","dijit/form/ValidationTextBox","dijit/form/FilteringSelect","dijit/Editor","dijit/form/DateTextBox"]);

require(["dojo/dom", "dojo/parser", "dijit/form/ValidationTextBox"]);



//Pruebas de validaciones
var after5 = function (constraints) {
    var date = new Date();
    if (date.getHours() >= 17) {
        return "\\d{5}";
    } else {
        return "\\D+";
    }
}

var email = function (constraints) {
    valido = dom.byId("email");
    return console.log(email.value);
}


// Creacion de los Dialogos
require(["dojo/ready", "dojo/parser", "dijit/Dialog", "dojo/domReady!"], function (ready, parser, Dialog) {

    ready(function () {

        exito = new Dialog({
            id: "dialogColorExito",
            title: "Exito",
            content: "Tu registro se realizo correctamente",
            //style: 'width: 300px'

        });

        /*Dialogo de ejemplo
        myDialog = new Dialog({
        title: "My Dialog",
        content: "Test content.",
        style: "width: 300px"
        });*/

        DialogError = new Dialog({
            id: "dialogColorError",
            title: "ERROR",
            style: 'width: 300px'

        });

    });


});


// Funcionalidad de la pestaña "Buscar Pokemon"
require(["dojo/dom", "dojo/on", "dojo/mouse", "dojo/request", "dijit/form/Button", "dijit/form/ToggleButton", "dojo/html", "dojo/_base/lang", 'dojox/grid/EnhancedGrid', 'dojo/data/ItemFileWriteStore', "dojox/grid/enhanced/plugins/Pagination", "dojo/domReady!"],

    function (dom, on, mouse, request, Button, ToggleButton, Mhtml, lang, EnhancedGrid, ItemFileWriteStore, Pagination) {

        let idgrid = "grid";
        let ArrayDePokemones = [];

        //El problema de la grilla, es al ponerle imagenes. Para solucionarlo ahi que ponerle un height en px a las imagenes.

        //Primero carga el Layout y la nueva grilla. 
        /*set up layout*/
        var layout = [[
            { 'name': 'Nombre', 'field': 'Nombre', 'width': '20%' },
            { 'name': 'Tipo', 'field': 'Tipo', 'width': '20%' },
            { 'name': 'Altura', 'field': 'Altura', 'width': '20%', },
            { 'name': 'Peso', 'field': 'Peso', 'width': '20%' },
            { 'name': 'Batallas', 'field': 'Batallas', 'width': '20%' },
            { 'name': 'Frente', 'field': 'Frente', 'width': '20%', formatter: (Frente) => { return `<img alt="" height="100px" src="${Frente}"/>` } },
            { 'name': 'Espalda', 'field': 'Espalda', 'width': '20%', 'height': '100px', formatter: (Espalda) => { return `<img alt="" height="100px" src="${Espalda}"/>` } },
        ]];

        var data = {
            identifier: 'id',
            items: ArrayDePokemones
        };

        let store = new ItemFileWriteStore({ data: data });


        var button = new Button({
            iconClass: 'dijitIconSearch',  //Colocar el nombre del icono
            showLabel: true, //Mostrar o no mostrar el contenido de la etiqueta.
            label: "Buscar",
            onClick: function () {
                console.log("Estamos buscando a tu pokemon, espere....");



                const url = "https://pokeapi.co/api/v2/pokemon/";
                var pokemonName = document.getElementById('pokemonName').value;
                console.log(pokemonName);



                request.get(url + pokemonName, { handleAs: "json" }).then(

                    function (response) {

                        //Agregar el Filteringselect de dijit, para que tenga algunos pokemones predefinidos


                        var data_list =
                        {
                            id: response.id,
                            Nombre: response.name,
                            Tipo: response.types[0].type.name,
                            Altura: Math.round(response.height * 10),
                            Peso: Math.round(response.weight / 10),
                            Batallas: response.game_indices.length,
                            Frente: response.sprites.front_default,
                            Espalda: response.sprites.back_default,
                        };

                        ArrayDePokemones.push(data_list);


                        console.log(ArrayDePokemones);

                        var data = {

                            identifier: 'id',

                            items: ArrayDePokemones

                        };

                        let store = new ItemFileWriteStore({ data: data });

                        grid.delete;

                        grid.store = store;

                        grid.render();

                        console.log(dom.byId("respuesta"));



                        /*
                        //Creamos la tabla en HTML
                        var html = "<table class=`table` border= `1px;><thead><tr><th scope=`col`>Nombre</th><th scope=`col`>Altura</th><th scope=`col`>Peso</th><th scope=`col`>Tipo</th><th scope=`col`>Batallas</th><th scope=`col`>Frente</th><th scope=`col`>Espalda</th></tr></thead>";
    
                        // Creamos el objeto pokemon y le decimos de donde sacamos cada atributo, en cada llamada.
                        pokeObj = {
                            id: response.id,
                            Nombre: response.name,
                            Tipo: response.types[0].type.name,
                            Altura: Math.round(response.height * 10),
                            Peso: Math.round(response.weight / 10),
                            Batallas: response.game_indices.length,
                            Frente: response.sprites.front_default,
                            Espalda: response.sprites.back_default,
                        };
    
                        ArrayDePokemones.push(pokeObj); //Agregamos el poke objeto a una lista.
    
                        //Recorremos la lista y la añadimos a una tabla
                        ArrayDePokemones.forEach(element => {
                            html = html + "<tr>";
                            html = html + "<th scope='row'>" + element.Nombre + "</th>";
                            html = html + "<th scope='row'>" + element.Altura + "cm" + "</th>";
                            html = html + "<th scope='row'>" + element.Peso + "kg" + "</th>";
                            html = html + "<th scope='row'>" + element.Tipo + "</th>";
                            html = html + "<th scope='row'>" + element.Batallas + "</th>";
                            html = html + "<th scope='row'>" + `<img src="${element.Frente}" alt=""></th>`;
                            html = html + "<th scope='row'>" + `<img src="${element.Espalda}" alt=""></th>`;
                            html = html + "</tr>";
                        });
                        html = html + "</table>";
                        
                        Mhtml.set(respuesta,html);
    
    
                        //respuesta.innerHTML = html;
                        */

                    },
                    function (error) {
                        respuesta.innerHTML = "<div class=\"error\">" + error + "<div>";;
                    }


                );

            }

        }, "buscarpokemon");

        // Repetir o recorrer la ya precargado en data_list

        /*var rows = 1;
        for (var i = 0, l = ArrayDePokemones.length; i < rows; i++) {
            data.items.push(lang.mixin(ArrayDePokemones[i % l]));
        }*/


        //create a new grid
        let grid = new EnhancedGrid({
            id: idgrid,
            store: store,
            plugins: {
                pagination: {
                    position: "bottom",
                    sizeSwitch: false,
                    gotoButton: true,
                    defaultPageSize: 3,
                },
            },
            structure: layout,
            rowSelector: '1px'
        });

        /*append the new grid to the div*/
        grid.placeAt("respuesta");

        /*Call startup() to render the grid*/
        grid.startup();

        button.startup();

    });


// Funcionamiento de la pestaña del club de fan
require(["dojo/dom",
    "dojo/dom-construct",
    "dojo/request",
    "dojo/on",
    "dijit/form/Button",
    "dojo/dom-attr",
    "dojo/ready",
    "dijit/Dialog",
    "dojo/dom-style",
    "dojo/domReady!"],
    function (dom, domConstruct, request, on, Button, domAttr, ready, Dialog, domStyle) {

        var contador = 1;

        //Generamos y Personalizamos los botones.
        var button = new Button({
            iconClass: 'dijitIconTable',  //Colocar el nombre del icono
            showLabel: true, //Mostrar o no mostrar el contenido de la etiqueta.
            label: "Descargar Lista del FAN CLUB",
            style: "visibility: hidden;",
        }, "descargarFans")

        var buttonFan = new Button({
            iconClass: 'dijitIconNewTask',
            showLabel: true,
            label: "¡¡UNITE A NUESTRO FAN CLUB!!",
        }, "aniadirFan")

        var buttonOK = new Button({
            showLabel: true,
            label: "OK",
        }, "EnviarD")

        var buttonEliminar = new Button({
            iconClass: 'dijitIconDelete',
            showLabel: true,
            label: "Dejar nuestro Fan Club :(",
            style: "visibility: hidden;"
        }, "eliminarFan")

        var buttonInicioSesion = new Button({
            iconClass: 'dijitIconKey',
            showLabel: true,
            label: "INICIAR SESION",
        }, "InicioSesion")
        
        var buttonIngresar = new Button({
            showLabel: true,
            label: "OK",
        }, "Ingresar")
        

        buttonOK.startup();
        button.startup();
        buttonFan.startup();
        buttonEliminar.startup();
        buttonInicioSesion.startup();
        buttonIngresar.startup(); //El boton OK del inicio de Sesion

        //Dialogo de inicio de sesion
        on(buttonInicioSesion,"click",function(){
            IniciodeSesionD.show();
        })

        //Añadir un nuevo fan a la base de datos
        on(buttonFan, "click", function () {
            InscripcionFan.show();
        });


        on(buttonOK, "click", function () {


            nameF = dom.byId("nameF").value;
            apellidoF = dom.byId("apeF").value;
            emailF = dom.byId("emailF").value;
            emailConfirmar = dom.byId("emailConfirmar").value;
            Paisf = dom.byId("paisF").value;
            nombreCompleto = nameF + " " + apellidoF;

            if (emailF != emailConfirmar ) {
                domStyle.set(dom.byId("errorMail"),"display", "contents");

            } else {



                //console.log(nombreCompleto + " " + emailF + Paisf);

                /*var xhrArgs = {
                    url: "https://6086c2dea3b9c200173b6c61.mockapi.io/",
                    postData: dojo.toJson({id:"1000",Pais:Paisf,name:nombreCompleto,email:emailF}),
                    handleAs: "text", 
                    }
                
                var deferred = dojo.xhrPost(xhrArgs);*/

                request.post("https://6086c2dea3b9c200173b6c61.mockapi.io/usuarios", {
                    data: {
                        Pais: Paisf,
                        name: nombreCompleto,
                        email: emailF
                    },
                }).then(function (text) {

                    var fan = JSON.parse(text)
                    console.log("The server returned: ", fan);

                    //Almacenamos el fan en el storage
                    sessionStorage.setItem('name', fan.name);
                    sessionStorage.setItem('pais', fan.Pais)

                    ready(function () {

                        registroFanClub = new Dialog({
                            id: "registroFC",
                            title: "¡¡BIENVENIDO!!",
                            content: "Bienvenido " + fan.name + " ya estas registrado en nuestra lista oficial. " + " \n " + "Tu numero de socio es: " + fan.id,
                            style: 'width: 300px'

                        });

                    });

                    registroFanClub.show();
                    InscripcionFan.hide();
                    registroFanClub.show();

                
                    setTimeout(function(){
                        registroFanClub.hide();
                        domStyle.set(dom.byId("iconoCarga"), 'visibility', 'visible');
                    },3000);
                    
                    //Icono Weidt que indique la redireccion.
                    setTimeout(function(){

                        window.location = "http://127.0.0.1:5500/beneficiosFanClub.html";
                    },6000);

                    endLoading();
                    
                    



                });

            }
        });



        /* CONFIGURACION DEL ICONO DE CARGA */
        var iconoCarga;
		require(["dojo/_base/declare", "dojo/dom"],
			function (declare, dom) {
				var iconoCarga = declare(null, {
					overlayNode: null,
					constructor: function () {
						// save a reference to the overlay
						this.overlayNode = dom.byId('iconoCarga');
					},
					// called to hide the loading overlay
					endLoading: function () {

								domStyle.set(node, 'display', 'none');
						
							}
						});
						iconoCarga = new iconoCarga();
					});




        //Traer la tabla del Club de fan
        on(dom.byId("descargarFans"), "click", function () {

            console.log("Click");

            if (contador != 1) {
                domConstruct.empty("fans");
            }

            const DATOSFAN = "https://6086c2dea3b9c200173b6c61.mockapi.io/usuarios";


            request.get(DATOSFAN, { handleAs: "json" }).then(

                function (response) {

                    contador++;

                    response.forEach(fan => {

                        /*domConstruct.create("Le pasamos que vamos a crear, en este caso un "tr" y con el innerHTML le pasamos el contenido
                        interactivo)*/
                        let fila = domConstruct.create("tr", {
                            innerHTML: `<td>${fan.id}</td> <td>${fan.name}</td> <td>${fan.email}</td> <td>${fan.Pais}</td>`,
                        });

                        domConstruct.place(fila, "fans");
                        tabla = dom.byId("FanClub");
                        domAttr.set(tabla, "style", { visibility: "visible" }); //Seteamos el atributo de la tabla en Visible.
                    });




                }

            );


        })



    });



//Validacion del formulario 
require([
    "dojo/dom",
    "dojo/on",
    "dijit/registry",
    "dojo/ready",
    "dojo/_base/array",
    "dojo/_base/event",
    "dojo/query",
    "dojox/validate/web",
    "dojox/validate/check",
    "dojo/_base/lang",],
    function (dom, on, registry, ready, arrayUtil, baseEvent, query, validate, validateCheck, lang) {

        function doCheck(form) {

            //console.log(form[0]);

            var results = validate.check(form, profile),
                r = dom.byId("result");
            //console.log(results);

            /*if (results.isSuccessful()) {
                //	everything passed, log it to the result div
                console.log("Resultado final = " + results.isSuccessful);
                r.innerHTML = "Everything passed validation!";
            }*/
            // El contador de Invalides va a permanecer en cero, si no se presentan campos invalidos, en caso contrario aumentara.
            var contadorInvalides = 0;
            var s = "";
            /* SI QUEREMOS OBTENER LOS CAMPOS VACIOS
            var missing = results.getMissing();
                console.log("Campos vacios = " + missing);

            if (missing.length) {
                s += '<h4>The following fields are missing:</h4>'
                    + '<ol>';
                arrayUtil.forEach(missing, function (field) {
                    s += '<li>' + field + '</li>';
                });
                s += '</ol>';
            }*/

            var invalid = results.getInvalid();

            console.log("Campos invalidos = " + invalid);

            //s += '<h4>The following fields are invalid:</h4>';


            invalid.forEach(element => {

                if (element.field == undefined) {  //Con esta condicion evito que se me agreguen al string, aquellos que son objetos.
                    contadorInvalides++;
                    console.log(element);

                    s += '<p>' + element + '</p>';
                }
            });


            if (contadorInvalides != 0) {
                DialogError.set("content", "Los siguientes campos no son validos:\n" + s);
                DialogError.show();
            } else {
                exito.show();
                console.log("Esta correcto");
            }



        }

        //	wait until after our requires are actually loaded.
        profile = {
            trim: ["nombre", "apellido"],
            required: ["nombre", "apellido", "dni", "email", "tFijo", "tCelular", "calle", "numero", "CP"],
            constraints: {
                nombre: validate.isText,
                apellido: validate.isText,
                dni: validate.isDNI,
                email: [validate.isEmailAddress, false, true],
                tFijo: validate.telefonoFijo,
                tCelular: validate.celular,
                calle: validate.isText,
                numero: validate.isNumber,
                CP: validate.isCP,
            },

        };

        //Esto impide mandar un comentario con mas de 120 caracteres.
        var booleanCaracterInvalido = false;

        ready(function () {

            on(registry.byId("comentarios"), "change", function (evento) {

                console.log('editor1 onChange handler: ' + arguments[0])
                //var validacionCaracteres = false;
                var texto = arguments[0];
                var largo = (texto.length);
                console.log(largo);
                if (texto.length > 20) {
                    console.log('Ya te pasaste');
                    LimiteCaracteres.show();
                    booleanCaracterInvalido = true;

                } else {
                    booleanCaracterInvalido = false;
                }

            });

        })




        //	set up the form handler.
        var f = query("form")[0];
        f.onsubmit = function (e) {
            baseEvent.stop(e);
            if (booleanCaracterInvalido == false) {
                doCheck(f);
            } else {
                LimiteCaracteres.show();
            }

        };

    });


//VALIDACIONES PERSONALIZADAS DEL FORMULARIOS

require(["dojo", "dojo/_base/lang"
], function (dojo, lang) {
    var validate = lang.getObject("dojox.validate", true);

    validate.isOver666 = function (value, flags) {
        console.log('validate');
        return (parseInt(value) > 666);
    };

    validate.isDNI = function (value, flags) {
        return (value.length == 8);

    }

    validate.isCP = function (value, flags) {
        return (value.length == 4);

    }

    validate.celular = function (value, flags) {

        var test = validate.isNumberFormat(value, { format: "##-########" });
        return (test);
    };

    validate.telefonoFijo = function (value, flags) {

        var test = validate.isNumberFormat(value, { format: "(###) ####-####" });
        return (test);
    };


    return validate;
});





