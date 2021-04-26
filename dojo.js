var dojoConfig = {
    async: true,
    baseUrl: '.',
    packages: [
        'dojo',
        'dijit',
        'dojox',
    ]
};

require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/TabContainer",
    "dijit/layout/ContentPane", "dijit/TitlePane", "dijit/form/TextBox", "dijit/form/NumberTextBox", "dijit/form/ValidationTextBox", "dijit/form/FilteringSelect"]);

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

// Le colocamos el array de pokemons afuera de la funcion, para que se vaya cargando a medida que los solicitamos.



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


require(["dojo/dom", "dojo/dom-construct", "dojo/request", "dojo/on", "dijit/form/Button", "dojo/dom-attr", "dojo/domReady!"],
    function (dom, domConstruct, request, on, Button, domAttr) {

        var button = new Button({  //Buscar el icono, de descarga !!
            iconClass: 'dijitIconTable',  //Colocar el nombre del icono
            showLabel: true, //Mostrar o no mostrar el contenido de la etiqueta.
            label: "DescargarLista",
        }, "descargarFans")

        button.startup();

        on(dom.byId("descargarFans"), "click", function () {
            console.log("Click");

            const DATOSFAN = "https://6086c2dea3b9c200173b6c61.mockapi.io/usuarios";


            request.get(DATOSFAN, { handleAs: "json" }).then(

                function (response) {

                    console.log(response);

                    response.forEach(fan => {
                        console.log(fan.name);
                        /*domConstruct.create("Le pasamos que vamos a crear, en este caso un "tr" y con el innerHTML le pasamos el contenido
                        interactivo)*/
                        let fila = domConstruct.create("tr",{
                            innerHTML: `<td>${fan.name}</td> <td>${fan.email}</td> <td>${fan.Pais}</td>`,
                         });

                        domConstruct.place(fila, "fans");
                        tabla = dom.byId("FanClub");
                        domAttr.set(tabla, "style", { visibility: "visible" }); //Seteamos el atributo de la tabla en Visible.
                    });




                }

            );





            /*var fila = domConstruct.toDom("<tr><td>Fernando</td><td>Fernando@gmail.com</td><td>Argentina</td></tr>");
            domConstruct.place(fila, "fans");
            tabla = dom.byId("FanClub");
            //domConstruct.create(tabla, { style: { visibility: "visible" } },"fans");

            domAttr.set(tabla, "style", { visibility: "visible" });*/

        })



    });