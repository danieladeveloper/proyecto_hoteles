document.addEventListener("DOMContentLoaded", function(event){
    imprimir_todos_hoteles();

    

   

    
});

function buscar(){
    //var fecha1=document.getElementById("control_fecha1").value;
    //var fecha2=document.getElementById("control_fecha2").value;
    var fecha_vector= document.querySelectorAll(".control_fecha");
    console.log(fecha_vector);


    //Si el tipo_cliente es true, es cliente con recompensas
    //Si es false, es cliente normal
    var tipo_cliente=document.getElementById("control_cliente").checked;
    console.log("tipo cliente",tipo_cliente);



    var tarjeta_html="";

    fecha_vector.forEach(fecha_item=>{
        var fecha_actual=fecha_item.value;

        if(!isNaN(Date.parse(fecha_actual)))
            {
                
                var hotel_seleccionado = null;
                var fecha_consulta = new Date(fecha_actual);
                if(es_fin_semana(fecha_consulta)){
                    //calcular el valor con precio de fin de semana
                    console.log("es fin de semana");
                    if(tipo_cliente==true) // ciente recompensa
                    {
                        console.log("es cliente recompensa");
                        var precio_menor=hoteles[0].tarifa_finsemana_rec;
                        hotel_seleccionado= hoteles[0];
        
                        hoteles.forEach(hotel_item => {
                            if(hotel_item.tarifa_finsemana_rec<precio_menor)
                                hotel_seleccionado = hotel_item;
                        });
                    }
                    else{ //cliente normal
                        console.log("es cliente normal");
                        var precio_menor=hoteles[0].tarifa_finsemana_reg;
                        hotel_seleccionado= hoteles[0];
        
                        hoteles.forEach(hotel_item => {
                            if(hotel_item.tarifa_finsemana_reg<precio_menor)
                                hotel_seleccionado = hotel_item;
                        });
                    }
        
        
                }
                else{
        
                    console.log("dia normal");
        
                    //calcular el valor con precio de dia normal 
                    if(tipo_cliente==true) // ciente recompensa
                    {
                        console.log("cliente recompensa");
                        var precio_menor=hoteles[0].tarifa_semana_rec;
                        hotel_seleccionado= hoteles[0];
        
                        hoteles.forEach(hotel_item => {
                            if(hotel_item.tarifa_semana_rec<precio_menor)
                                hotel_seleccionado = hotel_item;
                        });
                    }
                    else{ 
                        console.log("cliente normal");
                        //cliente normal
                        var precio_menor=hoteles[0].tarifa_semana_reg;
                        hotel_seleccionado= hoteles[0];
        
                        hoteles.forEach(hotel_item => {
                            if(hotel_item.tarifa_semana_reg<precio_menor)
                                hotel_seleccionado = hotel_item;
                        });
                    }
                }
                //console.log(hoteles)
                
                let calificacion_actual=calificar_estrellas(hotel_seleccionado.calificacion);
    
                tarjeta_html+= `
                    <div class="tarjeta_hotel">
                                <h3 class="hotel_nombre">Para el ${fecha_actual} tu mejor opción es : ${hotel_seleccionado.nombre_hotel}</h3>
                                <div class="imagen_hotel">
                                    <img src="${hotel_seleccionado.imagen_hotel}" alt="${hotel_seleccionado.nombre_hotel}">
                                </div>
                                <div class="hotel_calificacion">${calificacion_actual}</div>
                                <div class="hotel_precio_semana_regular">Precio regular:${hotel_seleccionado.tarifa_semana_reg} USD</div>
                                <div class="hotel_precio_semana_recompensa">Precio recompensa:${hotel_seleccionado.tarifa_semana_rec} USD</div>
                                <div class="hotel_precio_finsemana_regular">Precio regular fin de semana:${hotel_seleccionado.tarifa_finsemana_reg} USD</div>
                                <div class="hotel_precio_finsemana_recompensa">Precio recompensa fin de semana:${hotel_seleccionado.tarifa_finsemana_rec} USD</div>
                    </div>
                    `;
                    
        
            }
            else{
                alert("seleccione una fecha")
            }
        
        


    })
    document.getElementById("resultados").innerHTML=tarjeta_html;



    

    

}

function imprimir_todos_hoteles(){
        var tarjeta_html = "";
        hoteles.forEach(hotel_item => {

            let calificacion_actual=calificar_estrellas(hotel_item.calificacion);
            tarjeta_html+=
            `
            <div class="tarjeta_hotel">
                        <h3 class="hotel_nombre">${hotel_item.nombre_hotel}</h3>
                        <div class="imagen_hotel">
                            <img src="${hotel_item.imagen_hotel}" alt="${hotel_item.nombre_hotel}">
                        </div>
                        <div class="hotel_calificacion">${calificacion_actual}</div>
                        <div class="hotel_precio_semana_regular">Precio tarifa regular:${hotel_item.tarifa_semana_reg} USD</div>
                        <div class="hotel_precio_semana_recompensa">Precio tarifa recompensa:${hotel_item.tarifa_semana_rec} USD</div>
                        <div class="hotel_precio_finsemana_regular">Precio tarifa regular fin de semana:${hotel_item.tarifa_finsemana_reg} USD</div>
                        <div class="hotel_precio_finsemana_recompensa">Precio tarifa recompensa fin de semana:${hotel_item.tarifa_finsemana_rec} USD</div>
            </div>
            `;
            document.getElementById("resultados").innerHTML=tarjeta_html;

        
        });
}


function es_fin_semana(fecha){
    return fecha.getDay()==0 || fecha.getDay()==6;

}

function calificar_estrellas(calificacion){
    var estrellas="";
    for(let i=0; i<calificacion; i++){
        estrellas+="*";
    }

    return estrellas;
}

