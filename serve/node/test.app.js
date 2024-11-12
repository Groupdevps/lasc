function main(){
  consign({
    cwd: __dirname
  })
      .include("libs/config.js")
      .then("models/index.js")
      .then("libs/middlewares.js")
      .then("routes")
      .then("libs/bootApi.js")     
      .into(app);
 

      
 //var udp_streaming = require('./libs/bootUDPserver').initServices();
 redisController.init(disks);
 // streamingController.start();

  app.disable('etag');
  app.use(express.json({limit:'200mb'}));
  app.use(express.urlencoded({ extended: false, limit:'200mb' }));
  app.use(cookieParser());
  app.use(sessions({
    secret:["ZVIZNnyTuOhAopgbcSxkwQZZiFpulQgi"],
    saveUninitialized: false,
    resave : false
  }))

  //var udp_streaming = require('./libs/bootUDPserver').initServices();
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.set('config',env);

  app.use(logger('dev'));

  app.use(express.static(path.join(__dirname, 'public')));


 // app.use(express.static("/opt/alice-media-j"))
  app.use(express.static("/opt/alice-media"));

  // app.set('static', path.join(__dirname, 'public')); // origin form
  app.set('static', express.static( "/opt/alice-media"));
  // console.log( "static folder : **********************", app.get('static'))
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}
