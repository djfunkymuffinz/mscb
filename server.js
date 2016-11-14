const express = require('express');
const app = express();
const tabs = [{
   title: 'Home',
   template: 'home.ejs',
   id: 'home',
   isDefault: true,
}, {
   title: 'Performances',
   template: 'performances.ejs',
   id: 'performances',
}, {
   title: 'Join',
   template: 'join.ejs',
   id: 'join',
}, {
   title: 'Donate',
   template: 'donate.ejs',
   id: 'donate',
}, {
   title: 'Photos',
   template: 'photos.ejs',
   id: 'photos',
}, {
   title: 'Members',
   template: 'members.ejs',
   id: 'members',
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
