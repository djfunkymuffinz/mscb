const express = require('express');
const app = express();
const tabs = [{
   title: 'Home',
   template: 'home.ejs',
   id: 'home',
   tooltip: 'Homepage for MSCB',
   isDefault: true
}, {
   title: 'Performances',
   template: 'performances.ejs',
   id: 'performances',
   tooltip: 'Upcoming MSCB performances'
}, {
   title: 'Join',
   template: 'join.ejs',
   id: 'join',
   tooltip: 'Would you like to become a musician in the band?'
}, {
   title: 'Donate',
   template: 'donate.ejs',
   id: 'donate',
   tooltip: 'Support MSCB with your donations'
}, {
   title: 'Photos',
   template: 'photos.ejs',
   id: 'photos',
   tooltip: 'Photos from recent concerts'
}, {
   title: 'Members',
   template: 'members.ejs',
   id: 'members',
   tooltip: 'Section for band members only - password required',
   doRender: 'anon'
}, {
   title: 'Listening',
   template: 'listening.ejs',
   id: 'listening',
   doRender: 'member'
}, {
   title: 'Database',
   template: 'database.ejs',
   id: 'database',
   doRender: 'member'
}, {
   title: 'Documents',
   template: 'documents.ejs',
   id: 'documents',
   doRender: 'member'
}]

app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/assets', express.static('./assets'));

app.get('/', function(req,res) {
   //req.isLoggedIn = true;
   res.locals.renderTab = (tab) => {
      return tab.doRender === 'member' && req.isLoggedIn;
   };

   res.render('index', {
      tabs,
      renderTab: (tab) => {
         if (!tab.doRender) return true;
         return req.isLoggedIn ? tab.doRender === 'member' : tab.doRender === 'anon';
      }
   });
});

app.listen(3000);
