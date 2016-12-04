var fs = require('fs');

//fs.readFile('tes2t.txt', {encoding: 'utf-8'},function(err, data) {
//   if(err) {
//       console.log(err);
//   } else {
//       console.log(data);
//   }
//});

//fs.stat(__filename, function(err, stat) {
//    console.log(stat.isFile());
//    console.log(stat);
//});

fs.writeFile('file.tmp', 'data', function(err){
   if(err) throw err;
    fs.rename('file.tmp', 'new.tmp', function(err) {
        if(err) throw err;
        fs.unlink('new.tmp', function(err) {
            if(err) throw err;
        })
    })
});