'use strict';
const app = require('./express/server');
let port = 3005;
app.listen(port, function(){
  console.log(`Server started on port ${port}...`);
});
