(this.webpackJsonpapibase=this.webpackJsonpapibase||[]).push([[29],{348:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(5),o=a.n(c),l=a(10),i=a(13),s=a(71),u=a(21),m=a(250),d=a(266),f=a(359),p=a(86),b=a.n(p),E=a(87),v=a.n(E),h=a(22),O=a(14),I=a(15),j=a(9),g=a(360),x=a(26),T=a(11),y=a(23),N=a(18),w=function(e){var t=e.dataInicial,a=e.abrirModal,c=e.setAbrirModal,s=e.GetTipoTelefono,m=Object(y.a)(t),d=Object(i.a)(m,2),f=d[0],p=d[1],b=Object(n.useState)(!1),E=Object(i.a)(b,2),v=E[0],h=E[1],O=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(I.a)("tipotelefono",{method:"POST",body:JSON.stringify(f)});case 2:e.sent&&(Object(j.b)("Tipo de Tel\xe9fono registrado exitosamente"),s(),c(!1));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(I.a)("tipotelefono",{method:"PUT",body:JSON.stringify(f)});case 2:(t=e.sent)&&(Object(j.b)(t),s()),c(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(l.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),h(!0),!(t.tipo_telefonoId>0)){e.next=7;break}return e.next=5,w();case 5:e.next=9;break;case 7:return e.next=9,O();case 9:h(!1);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(g.a,{show:a,onHide:function(){return c(!1)}},!0===v?r.a.createElement(N.a,null):r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a.Header,{closeButton:!0},r.a.createElement(g.a.Title,{as:"h5"},t.tipo_telefonoId>0?"Actualizar Tipo de Tel\xe9fono":"Nuevo Tipo de Tel\xe9fono")),r.a.createElement(g.a.Body,null,r.a.createElement(T.ValidationForm,{onSubmit:k,onErrorSubmit:function(e,t,a){Object(j.c)("Por favor complete toda la informaci\xf3n solicitada por el formulario")}},r.a.createElement(x.a.Row,null,r.a.createElement(x.a.Group,{as:u.a,md:"12"},r.a.createElement(x.a.Label,{htmlFor:"descripcion"},"Descripci\xf3n"),r.a.createElement(T.TextInput,{name:"descripcion",id:"descripcion",required:!0,value:f.descripcion,onChange:p,errorMessage:"Campo obligatorio",placeholder:"Descripci\xf3n",autoComplete:"off",style:{textTransform:"capitalize"},type:"text"})),t.tipo_telefonoId>0&&r.a.createElement(x.a.Group,{as:u.a,md:"12"},r.a.createElement(x.a.Label,{htmlFor:"estadoId"},"Estado"),r.a.createElement(T.SelectGroup,{name:"estadoId",id:"estadoId",value:f.estadoId,required:!0,errorMessage:"Campo obligatorio",onChange:p},r.a.createElement("option",{value:""},"Seleccione un estado"),r.a.createElement("option",{value:"1"},"Activo"),r.a.createElement("option",{value:"2"},"Inactivo"))),r.a.createElement("div",{className:"col-sm-3"}),r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("button",{type:"button",onClick:function(){c(!1)},className:"btn btn-warning"}," Cancelar")),r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("button",{type:"submit",className:"btn btn-success"}," ",t.tipo_telefonoId>0?"Actualizar":"Registrar")))))))},k=a(80),C=function(){var e=Object(h.d)((function(e){return e})),t=Object(n.useState)(!0),a=Object(i.a)(t,2),c=a[0],p=a[1],E=Object(n.useState)([]),g=Object(i.a)(E,2),x=g[0],T=g[1],y=Object(n.useState)(!1),C=Object(i.a)(y,2),S=C[0],_=C[1],A=Object(n.useState)([]),M=Object(i.a)(A,2),z=M[0],B=M[1],D={tipo_telefonoId:"",descripcion:"",estadoId:1},F=Object(n.useState)(D),G=Object(i.a)(F,2),q=G[0],H=G[1],J=function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x.find((function(e){return 3===e.accesoId}))){e.next=6;break}return p(!0),e.next=4,Object(I.a)("tipotelefono?estadoId=1;2");case 4:(t=e.sent)&&B(t);case 6:p(!1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){!function(){if(null===e||void 0===e?void 0:e.accesos){var t=e.accesos.filter((function(e){return 7===e.menuId}));T(t)}p(!1)}()}),[]),Object(n.useEffect)((function(){J()}),[x]),r.a.createElement(O.a,null,r.a.createElement(s.a,{className:"btn-page"},r.a.createElement(u.a,{sm:12},r.a.createElement(m.a,null,r.a.createElement(m.a.Header,null,r.a.createElement(m.a.Title,{as:"h5"},"Tipos de Tel\xe9fono")),r.a.createElement(m.a.Body,null,!0===c?r.a.createElement(N.a,null):r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{className:"align-items-center m-l-0"},r.a.createElement(u.a,null),r.a.createElement(u.a,{className:"text-right"},x.find((function(e){return 1===e.accesoId}))&&r.a.createElement(d.a,{variant:"success",className:"btn-sm btn-round has-ripple",onClick:function(){_(!0),H(D)}},r.a.createElement("i",{className:"feather icon-plus"})," Agregar Tipo Tel\xe9fono"))),x.find((function(e){return 3===e.accesoId}))?r.a.createElement(f.a,{striped:!0,hover:!0,responsive:!0,bordered:!0,id:"mytable"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"C\xf3digo"),r.a.createElement("th",null,"Descripci\xf3n"),r.a.createElement("th",null,"Estado"),x.find((function(e){return 2===e.accesoId||4===e.accesoId}))&&r.a.createElement("th",null))),r.a.createElement("tbody",null,z.map((function(e){var t=e.tipo_telefonoId,a=e.descripcion,n=e.Estado.descripcion;return r.a.createElement("tr",{key:t},r.a.createElement("td",null,t),r.a.createElement("td",null,a),r.a.createElement("td",null,n),x.find((function(e){return 2===e.accesoId||4===e.accesoId}))&&r.a.createElement("td",{style:{textAlign:"center"}},x.find((function(e){return 2===e.accesoId}))&&r.a.createElement("button",{className:"btn-icon btn btn-info btn-sm",onClick:function(){!function(e){var t=z.find((function(t){return t.tipo_telefonoId===e})),a=t.tipo_telefonoId,n=t.descripcion,r=t.estadoId;H({tipo_telefonoId:a,descripcion:n,estadoId:r}),_(!0)}(t)}},r.a.createElement("i",{className:"feather icon-edit"})),x.find((function(e){return 4===e.accesoId}))&&r.a.createElement("button",{className:"btn-icon btn btn-danger btn-sm",onClick:function(){var e;e=t,v()(b.a).fire({title:"Alerta?",text:"Esta seguro que desea eliminar el elemento",type:"warning",showCloseButton:!0,showCancelButton:!0}).then(function(){var t=Object(l.a)(o.a.mark((function t(a){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a.value){t.next=8;break}return t.next=4,Object(I.a)("tipotelefono/".concat(e),{method:"DELETE"});case 4:(n=t.sent)&&(Object(j.b)(n),r=z.filter((function(t){return t.tipo_telefonoId!==e})),B(r)),t.next=9;break;case 8:Object(j.c)("No se elimin\xf3 ning\xfan elemento");case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},r.a.createElement("i",{className:"feather icon-trash-2"}))))})))):r.a.createElement(k.a,null)),!0===S&&r.a.createElement(w,{abrirModal:S,setAbrirModal:_,GetTipoTelefono:J,dataInicial:q}))))))};t.default=function(){return r.a.createElement(C,null)}},80:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(0),r=a.n(n),c=a(71),o=a(21),l=a(358),i=a(14),s=function(){return r.a.createElement(i.a,null,r.a.createElement(c.a,null,r.a.createElement(o.a,null,r.a.createElement(l.a,{variant:"danger"},r.a.createElement(l.a.Heading,{as:"h4"},"Informaci\xf3n!"),r.a.createElement("p",null,"No esta autorizado para poder visualizar los elementos"),r.a.createElement("hr",null),r.a.createElement("p",{className:"mb-0"},"Comuniquese con el administrador para la asignaci\xf3n de permisos")))))}}}]);
//# sourceMappingURL=29.840b82f2.chunk.js.map