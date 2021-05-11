
/*require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/TabContainer",
    "dijit/layout/ContentPane"]);*/





require([
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dijit/registry',
    "dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/TabContainer",
    "dijit/layout/ContentPane"
], function (dom, domConstruct, on, registry) {

    /* ¿Cambio del campo de la fecha ?
    on(registry.byId("desdeCuando"),"change",function (value){

        dijit.byId("hastaCuando").set("disabled",true);
        
    });*/

    /*let hoy = new Date();
    let mayorEdad = new Date();
    mayorEdad.setFullYear(mayorEdad.getFullYear() - 18);*/



    var nombre = sessionStorage.getItem('name');
    var pais = sessionStorage.getItem('pais');

    var titulo = domConstruct.create("h1", { innerHTML: `Bienvenido ${nombre} al Fan club de Pokemon` });
    var saludos = domConstruct.create("h1", { innerHTML: `Saludos para toda ${pais}` });
    domConstruct.place(titulo, "titulo");
    domConstruct.place(saludos, "saludos");

});

require(["dojo/dom", "dojo/on", "dojo/query", "dijit/registry", "dojo/dom-style", "dojo/ready"], function (dom, on, query,registry, domStyle) {

    //dijit.byId("hastaCuando").set("disable",true);


    //Obtengo los input de tipo radio
    var f = query("input[type=radio]");

    on(f, "change", function () {

        console.log(f);

        if (f[0].checked == true) {
            console.log("Entro");
            query(".contenidoPrincipiante").style("display", "contents");
            query(".contenidoVeterano").style("display", "none");

        } else {
            query(".contenidoPrincipiante").style("display", "none");
            query(".contenidoVeterano").style("display", "contents");

        }

        /* Corte de NOTICIA */
        if (f[2].checked == true) {
            console.log(f[2].checked);
            domStyle.set(dom.byId("noticiaContenidoSi"), "display", "contents");
            domStyle.set(dom.byId("noticiaContenidoNo"), "display", "none");
            // Mostramos el boton de envio del Formulario
            query(".boton").style("display", "contents");
        } else {
            if (f[3].checked == true) {
                domStyle.set(dom.byId("noticiaContenidoNo"), "display", "contents");
                domStyle.set(dom.byId("noticiaContenidoSi"), "display", "none");
            }

        }



    });





});




