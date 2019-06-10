const express = require('express');
const {projects} = require('./data.json');

const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
  res.render('index', {projects});
});

app.get('/about', (req, res)=>{
  res.render('about');
});

app.get('/project/:id', (req, res)=>{
  const {id} = req.params;

  if (id >= 0 && id <= projects.length) {

    const {project_name,
           description,
           technologies,
           live_link,
           github_link,
           image_urls} = projects[id];

    const templateData = {project_name,
                          description,
                          technologies,
                          live_link,
                          github_link,
                          image_urls};

    res.render('project', templateData);

  } else {

      const err = new Error('Project ' + id + ' does not exist');
      err.status = 404;
      throw err;

  }

});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(( err, req, res, next ) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600)
    res.status(err.status);
  else
    res.status(500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
