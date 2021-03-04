const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const serviceAccount = require("../../node-pruebas-firebase-firebase-adminsdk-e79hn-8971a3a370.json");


//iniciación del admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-pruebas-firebase-default-rtdb.firebaseio.com'
});

const db = admin.database();

router.get('/', (req, res) => {
    res.render('index');
});
//------VISTA CLIENTES----------
///vista cliente
router.get('/cliente', (req, res) => {
    db.ref('Cliente').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('cliente', { Cliente: data });
    });
});

//crear  nuevo cliente
router.post('/nuevo-cliente', (req, res) => {

    const nuevoCliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion
    }
    db.ref('Cliente').push(nuevoCliente);
    res.redirect('/cliente');
});
//eliminar cliente
router.get('/eliminar-cliente/:id', (req, res) => {
    db.ref(`Cliente/${req.params.id}`).remove();
    res.redirect('/cliente');
})

//------VISTA PRODUCTOS----------

router.get('/producto', (req, res) => {
    db.ref('Producto').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('producto', { Producto: data });
    });
});

//crear Seleccionar producto
router.post('/nuevo-producto', (req, res) => {

    const nuevoProducto = {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad
    }
    db.ref('Producto').push(nuevoProducto);
    res.redirect('/producto');
});
//eliminar PRODUCTO
router.get('/eliminar-producto/:id', (req, res) => {
    db.ref(`Producto/${req.params.id}`).remove();
    res.redirect('/producto');
});

//------VISTA SEDE----------
router.get('/sede', (req, res) => {
    db.ref('Sede').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('sede', { Sede: data });
    });
});

//crear Seleccionar producto
router.post('/nueva-sede', (req, res) => {

    const nuevaSede = {
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono1: req.body.telefono1,
        telefono2: req.body.telefono2
    }
    db.ref('Sede').push(nuevaSede);
    res.redirect('/sede');
});
//eliminar PRODUCTO
router.get('/eliminar-sede/:id', (req, res) => {
    db.ref(`Sede/${req.params.id}`).remove();
    res.redirect('/sede');
});



module.exports = router;