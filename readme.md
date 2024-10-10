# TALLER DE PROGRAMACION 2

## Instrucciones de resolución de examen

Es tu primer día en [tecnoshare.com](http://tecnoshare.com) luego de un intenso entrenamiento de 10 semanas por fin tenes la oportunidad de mostrar lo que aprendiste, y tu potencial como desarrollador backend en nodejs con express y mongodb.

Luego de abrir el correo encuentras un mail de tu Líder Técnico con tu primera asignación!! 💪

> Bienvenid@! estuvimos esperando por horas que llegares, tenemos varias tareas criticas y prioritarias en nuestro backlog. Por favor presta mucha atención a las instrucciones. No dudes en preguntarme cualquier cosa, aunque generalmente estoy muy ocupado resolviendo problemas heredados de las rotaciones de los desarrolladores.

> En el presente repositorío encontrarás un proyecto de nodejs que ya tiene codigo base del backend con el que vamos a trabajar. Te aconsejo que sigas los siguientes pasos para armar tu entorno de trabajo.

> 1. Realizar un Fork del presente repositorio
> 2. Realizar un clone del presente repositorio
> 3. Instalar las dependencias
> 4. Solicitar las variables de entorno que contiene la conexion string a mongodb (antes de preguntar, revisa el chat, seguro estan ahí)
> 5. Ejecutar el servidor web de la api REST con el script de npm start-dev si queres trabajar con nodemon (tendrías que instalarlo) con start solo, tambien funciona.
>    El backend se conecta con una base de datos Mongodb en la cual se encuentra la base de datos **sample_supplies** con una collection llamada **sales**, ahí se encuentran aprox. 5.001 ventas.
> 6. Proba el endpoint que ya se encuentra desarrollado: /api/sales debería retornar un json con 5.001 películas. Sin embargo te aconsejo que uses el paginado que tiene para probar (mira la definición del end-point). Sí por algun motivo no llegase a funcionar, solicita asistencia.

> ### TUS TAREAS SON LAS SIGUIENTES POR ORDEN DE PRIORIDAD
>
> 1. Necesitamos un endpoint que nos devuelva una venta (**sales**) particular por \_id
> 2. Necesitamos un endpoint que nos permita filtrar las ventas por localización (**storeLocation**). Por emeplo todas las ventas de las tiendas en Seatle
> 3. El equipo de frontend esta preparando una pagina que permita filtrar tanto por localización como por el medio que se hizo la venta (**purchaseMethod**) y ademas si se uso un cupon (**couponUsed**)
> 4. Recientemente nos llegó un requerimiento para promocionar en la pagina los productos mas vendidos. Por lo cual se requiere un endpoint que retorne los 10 productos mas vendidos

> ### SI TE DA EL TIEMPO DAME UN MANO TAMBIEN EN...
>
> 5. El equipo Marketing esta preparando una promoción via mail para los clientes mas satisfechos, y rebajas para los clientes mas insatisfechos. Para tal efecto, se quiere un endpoint que proporcione a los clientes ordenados por satisfacción (**satisfaction**)
>
> Desde ya muchas gracias por la colaboración! 😉 como te comente en la entrevista soy muy detallista en la prolijidad del codigo y la performance cada detalle cuenta, no me gusta mucho las cosas fuera del estandar de APIREST, sin embargo si no estas seguro, es mejor que lo resuelvas como puedas y me dejes notas en el readme.md del repo, para que yo pueda probar.

## Intrucciones para la entrega

Si ya terminaste o son las 10:00 asegurate de seguir los siguientes pasos para la entrega:

1. Completar el listado de endpoints, especificando parametros si los hubiera, mas abajo en este mismo archivo.
2. Realizar un commit a tu repo con un mensaje con tu nombre completo
3. Realizar un push a tu repositorio
4. Realizar un pull request a mi repositorio

## Listado de endpoint

## Listado de Endpoints

- 1 - Obtener todas las ventas: Este endpoint permite obtener una lista paginada de todas las ventas. Puedes aplicar filtros por localización, método de compra y si se utilizó un cupón. Utiliza los parámetros de consulta `pageSize` para definir el número de ventas a devolver por página (por defecto es 0) y `page` para especificar el número de la página que deseas obtener (por defecto es 0). Además, puedes filtrar las ventas por `location` (la localización de la tienda), `purchaseMethod` (como "In store" o "Phone") y `couponUsed` (filtra según el uso de cupones, `true` o `false`). Por ejemplo, una solicitud podría verse así:
 GET /api/sales?pageSize=10&page=1&location=New York&purchaseMethod=Phone&couponUsed=true
 
 2 - 
- Obtener una venta por ID: Este endpoint te permite obtener una venta específica utilizando su ID único. Debes proporcionar el ID de la venta que deseas recuperar. Un ejemplo de uso sería:
  GET /api/sales/5bd761dcae323e45a93ccff8

  3- 
- Obtener los 10 productos más vendidos: No lo he podido ahcer funcionar.

4-
- Obtener clientes ordenados por satisfacción: Este endpoint proporciona una lista de clientes ordenados de mayor a menor satisfacción, calculando la satisfacción promedio por cliente. Un ejemplo de solicitud sería:
GET /api/sales/customers/satisfaction

Todos los endpoints devuelven datos en formato JSON.





