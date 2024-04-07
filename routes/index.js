var express = require('express');
var router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {fileSize: 20 * 1024 * 1024}});

const postController = require('../controllers/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Redirige a la página de lista de quizzes al ingresar a la página principal
  res.render('index', { title: 'Blog' });
});

/* GET author page. */
router.get('/author', function(req, res, next) {
  // Renderiza la vista autor.ejs cuando se accede a /author
  res.render('author', { title: 'Autor' });
});

// Autoload para rutas que usen :quizId
router.param('postId', postController.load);

// Rutas para el recurso /quizzes
router.get('/posts',                     postController.index); // muestra la lista de quizzes
router.get('/posts/:postId(\\d+)',       postController.show); // muestra un quiz específico
router.get('/posts/new',                 postController.new); // muestra el formulario para crear un nuevo quiz
router.post('/posts',                    upload.single('image'), // crea un nuevo quiz
                                           postController.create);
router.get('/posts/:postId(\\d+)/edit',  postController.edit); // muestra el formulario para editar un quiz existente
router.put('/posts/:postId(\\d+)',       upload.single('image'), // actualiza un quiz existente
                                           postController.update);
router.delete('/posts/:postId(\\d+)',    postController.destroy); // elimina un quiz existente

// Ruta para el archivo adjunto de un quiz
router.get('/posts/:postId(\\d+)/attachment', postController.attachment);


module.exports = router;
