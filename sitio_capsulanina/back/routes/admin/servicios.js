var express = require('express');
var router = express.Router();
var serviciosModel = require('../../models/serviciosModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



router.get('/', async function(req, res, next) {

  var servicios = await serviciosModel.getServicios();

  servicios = servicios.map(servicio => {
    if (servicio.img_id) {
      const imagen = cloudinary.image(servicio.img_id, {
        width : 100,
        height: 100,
        crop: 'fill' //pad
      });
      return {
        ...servicio,
        imagen
      }
    } else {
      return {
        ...servicio,
        imagen: ''
      }
    }
  });

  res.render('admin/servicios', { 
    layout: 'admin/layout',
    persona: req.session.nombre,
    servicios
  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  })
})

router.post('/agregar', async (req, res, next) => {
  try {

    var img_id = '';
    console.log(req.files.imagen);

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }
    
    if (req.body.servicios != "" && req.body.descripcion !="" && req.body.precio != "" ) {
      await serviciosModel.insertServicio({
        ...req.body,
        img_id
      });
      res.redirect('/admin/servicios')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error){
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo el servicio'
    })
  }
})

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  let servicio = await serviciosModel.getServiciosById(id);
  if (servicio.img_id) {
      await (destroy(servicio.img_id));
  }

  await serviciosModel.deleteServiciosById(id);
  res.redirect('/admin/servicios');
})

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  console.log(req.params.id);
  var servicios = await serviciosModel.getServiciosById(id);

  res.render('admin/modificar' , {
    layout: 'admin/layout',
    servicios
  })
});

router.post('/modificar', async (req, res, next) => {
  try {

      let img_id = req.body.img_original;
      let borrar_img_vieja = false;
      if (req.body.img_delete === "1") {
        img_id = null;
        borrar_img_vieja = true;
      } else {
          if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
            borrar_img_vieja = true;
          }
      }
      if (borrar_img_vieja && req.body.img_original) {
        await (destroy(req.body.img_original));
      }

      var obj = {
        servicio: req.body.servicio,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        img_id
      }
      console.log(obj)

    await serviciosModel.modificarServiciosById(obj, req.body.id);
    res.redirect('/admin/servicios');

  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    })
  }
})

module.exports = router;