(this.webpackJsonpapibase=this.webpackJsonpapibase||[]).push([[22],{355:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(5),l=t.n(c),o=t(10),i=t(13),s=t(71),u=t(21),m=t(250),d=t(359),f=t(86),b=t.n(f),p=t(111),E=t.n(p),h=t(87),g=t.n(h),v=t(22),N=t(39),O=t(14),j=t(15),I=t(88),y=t(9),x=t(80),_=t(18),k=function(){var e=Object(v.d)((function(e){return e})),a=Object(n.useState)(!0),t=Object(i.a)(a,2),c=t[0],f=t[1],p=Object(n.useState)([]),h=Object(i.a)(p,2),k=h[0],w=h[1],C=Object(n.useState)([]),D=Object(i.a)(C,2),T=D[0],z=D[1],A=function(){var e=Object(o.a)(l.a.mark((function e(){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!k.find((function(e){return 3===e.accesoId}))){e.next=7;break}return Object(I.b)("#mytable"),f(!0),e.next=5,Object(j.a)("persona?&estadoId=1;2");case 5:(a=e.sent)&&z(a);case 7:f(!1),Object(I.a)("#mytable");case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){!function(){if(null===e||void 0===e?void 0:e.accesos){var a=e.accesos.filter((function(e){return 12===e.menuId}));w(a)}f(!1)}()}),[]),Object(n.useEffect)((function(){A()}),[k]),r.a.createElement(O.a,null,r.a.createElement(s.a,{className:"btn-page"},r.a.createElement(u.a,{sm:12},r.a.createElement(m.a,null,r.a.createElement(m.a.Body,null,!0===c?r.a.createElement(_.a,null):r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{className:"align-items-center m-l-0"},r.a.createElement(u.a,null),r.a.createElement(u.a,{className:"text-right"},k.find((function(e){return 1===e.accesoId}))&&r.a.createElement(N.a,{variant:"success",className:"btn-sm btn-round has-ripple",to:"/base/catalogo/personaupsert"},r.a.createElement("i",{className:"feather icon-plus"})," Nueva Persona"))),k.find((function(e){return 3===e.accesoId}))?r.a.createElement(d.a,{striped:!0,hover:!0,responsive:!0,bordered:!0,id:"mytable"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Codigo"),r.a.createElement("th",null,"Nombre"),r.a.createElement("th",null,"Fecha de Nacimiento"),r.a.createElement("th",null,"Correo"),r.a.createElement("th",null,"Genero"),r.a.createElement("th",null,"Estado"),k.find((function(e){return 2===e.accesoId||4===e.accesoId}))&&r.a.createElement("th",null))),r.a.createElement("tbody",null,T.map((function(e){var a=e.personaId,t=e.nombre1,n=e.nombre2,c=e.nombre_otros,i=e.apellido1,s=e.apellido2,u=e.apellido_casada,m=e.email,d=e.fecha_nacimiento,f=e.Genero.descripcion,p=e.Estado.descripcion,h=t;return n&&(h+=" "+n),c&&(h+=" "+c),h+=" "+i,s&&(h+=" "+s),u&&(h+=" "+u),r.a.createElement("tr",{key:a},r.a.createElement("td",null,a),r.a.createElement("td",null,h),r.a.createElement("td",null,E()(d).format("DD/MM/YYYY")),r.a.createElement("td",null,m),r.a.createElement("td",null,f),r.a.createElement("td",null,p),k.find((function(e){return 2===e.accesoId||4===e.accesoId}))&&r.a.createElement("td",{style:{textAlign:"center"}},k.find((function(e){return 2===e.accesoId}))&&r.a.createElement(N.a,{className:"btn-icon btn btn-info btn-sm",to:"/base/catalogo/personaupsert/".concat(btoa("idpersona=".concat(e.personaId)))},r.a.createElement("i",{className:"feather icon-edit"})),k.find((function(e){return 4===e.accesoId}))&&r.a.createElement("button",{className:"btn-icon btn btn-danger btn-sm",onClick:function(){var a;a=e.personaId,g()(b.a).fire({title:"Alerta?",text:"Esta seguro que desea eliminar el elemento",type:"warning",showCloseButton:!0,showCancelButton:!0}).then(function(){var e=Object(o.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.value){e.next=8;break}return e.next=4,Object(j.a)("persona/".concat(a),{method:"DELETE"});case 4:(n=e.sent)&&(Object(y.b)(n),r=T.filter((function(e){return e.personaId!==a})),z(r)),e.next=9;break;case 8:Object(y.c)("No se elimin\xf3 ning\xfan elemento");case 9:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}())}},r.a.createElement("i",{className:"feather icon-trash-2"}))))})))):r.a.createElement(x.a,null)))))))};a.default=function(){return r.a.createElement(k,null)}},80:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var n=t(0),r=t.n(n),c=t(71),l=t(21),o=t(358),i=t(14),s=function(){return r.a.createElement(i.a,null,r.a.createElement(c.a,null,r.a.createElement(l.a,null,r.a.createElement(o.a,{variant:"danger"},r.a.createElement(o.a.Heading,{as:"h4"},"Informaci\xf3n!"),r.a.createElement("p",null,"No esta autorizado para poder visualizar los elementos"),r.a.createElement("hr",null),r.a.createElement("p",{className:"mb-0"},"Comuniquese con el administrador para la asignaci\xf3n de permisos")))))}},88:function(e,a,t){"use strict";t.d(a,"a",(function(){return c})),t.d(a,"b",(function(){return l}));var n=t(92),r=t.n(n);r.a.DataTable=t(106),t(110);var c=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;r()(e).DataTable({searching:!0,bLengthChange:!1,bAutoWidth:!1,lengthMenu:[[10,25,50,-1],[10,25,50,"Todos"]],displayLength:a,language:{processing:"Cargando informaci\xf3n",search:"Filtrar por:",lengthMenu:"Mostrar _MENU_ filas",info:"Vizualizaci\xf3n  _END_ de _TOTAL_ filas",infoEmpty:"Vizualizaci\xf3n del elemento 0 a 0 de 0 filas",infoFiltered:"(Filtrado de _MAX_ filas en total)",infoPostFix:"",loadingRecords:"Cargando...",zeroRecords:"No se logr\xf3 encontrar ninguna coincidencia",emptyTable:"No existen registros",paginate:{first:"Primera",previous:"Anterior",next:"Siguiente",last:"Ultima"},aria:{sortAscending:": active para ordenar la columna en orden ascendente",sortDescending:": active para ordenar la columna en orden descendente"}}})},l=function(e){r()(e).DataTable().destroy()}}}]);
//# sourceMappingURL=22.207f8956.chunk.js.map