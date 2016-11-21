const express = require('express');
const app = express();
const performances = [{
   title: 'Dorchester Arts Showcase',
   id: 'dcfa-card',
   info: 'Sunday, September 25, 2016\n2:00 PM In front of the Courthouse, Cambridge, MD'
}, {
   title: 'Easton Club East',
   id: 'ece-card',
   info: 'Sunday, October 16, 2016\n4:00 PM Easton, MD'
}, {
   title: 'Easton Waterfowl Festival',
   id: 'wf-card',
   info: 'Saturday, November 12, 2016\n2:00 PM Thompson Park, Easton, MD'
}, {
   title: 'Christmas Concert',
   id: 'nchs-card',
   info: 'Tuesday, 29 November\n7:00 PM North Caroline High School Auditorium'
}, {
   title: 'Christmas Concert',
   id: 'mumc-card',
   info: 'Sunday December 4, 2016\n6:30 PM St. Marks United Methodist Church, Easton, MD'
}, {
   title: 'Christmas in St. Michaels',
   id: 'cism-card',
   info: 'Saturday December 10, 2016\n10:00 AM At the Reviewing Stand, Railroad Ave, St. Michaels, MD'
}, {
   title: 'Saint Patrick\'s Concert',
   id: 'spd-card',
   info: 'Sunday March 5, 2017\n4:00 PM Christ Church, Cambridge, MD'
}, {
   title: 'Maryland Community Band Festival',
   id: 'mcbf-card',
   info: 'Saturday June 10, 2017\n1:00 PM Historic Springfield Barn, Williamsport, MD'
}, {
   title: 'Flag Day Concert and Flag Day Ceremony',
   id: 'fd-card',
   info: 'Wednesday June 14, 2017\nEaston Elks Lodge, Easton, MD'
}]
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
      performances,
      tabs,
      renderTab: (tab) => {
         if (!tab.doRender) return true;
         return req.isLoggedIn ? tab.doRender === 'member' : tab.doRender === 'anon';
      }
   });
});

app.listen(3000);
