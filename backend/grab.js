var http = require('http');

//objs = [{"href":"application-management","name":"Application Management"},{"href":"application-operations","name":"Application Operations"},{"href":"atos-analytics","name":"Atos Analytics"},{"href":"consulting","name":"Atos Consulting"},{"href":"atos-worldgrid","name":"Atos Worldgrid"},{"href":"big-data","name":"Big data"},{"href":"business-integration-solutions","name":"Business Integration Solutions"},{"href":"business-process-solutions","name":"Business Process Solutions"},{"href":"civil-national-security","name":"Civil &amp; National Security"},{"href":"cloud","name":"Cloud"},{"href":"erp-consolidation-and-harmonization","name":"Consolidation &amp; Harmonization"},{"href":"cyber-security","name":"Cyber Security"},{"href":"data-center-services","name":"Data Center Services"},{"href":"enterprise-content-management","name":"ECM"},{"href":"extreme-performance-computing-environments","name":"Extreme Performance Computing Environments"},{"href":"managed-infrastructure-solutions","name":"Managed Infrastructure Solutions"},{"href":"media-solutions","name":"Media Solutions"},{"href":"manufacturing-execution-systems","name":"MES"},{"href":"multichannel-mobility","name":"Multichannel &amp; Mobility"},{"href":"network-and-communications","name":"Network &amp; Communications"},{"href":"operations-support-systems","name":"OSS"},{"href":"outsourcing","name":"Outsourcing"},{"href":"product-lifecycle-management","name":"PLM"},{"href":"sap-business-process-solutions","name":"SAP Business Process Solutions"},{"href":"sap-industry-solutions","name":"SAP Industry Solutions"},{"href":"smart-mobility","name":"Smart Mobility"},{"href":"smart-utility","name":"Smart Utility"},{"href":"social-collaboration","name":"Social Collaboration"},{"href":"sustainability-solutions","name":"Sustainability Solutions"},{"href":"tax-state-treasury-and-customs","name":"Tax, State Treasury and Customs "},{"href":"technology-transformation-services","name":"Technology Transformation Services"},{"href":"telco-network-products","name":"Telco Network Products"},{"href":"testing","name":"Testing"},{"href":"workplace-services","name":"Workplace Services"},{"href":"worldline","name":"Worldline"}];
var queue = [];
var res = [];
var pageNumber = 1;

// Options to be used by request 
var options = {
   host: 'uk.atos.net',
   port: '80',
   path: '/en-uk/home/we-do.html'
};

var req = http.request(options, function(response){
    var body = '';
    response.on('data', function(data) {
        body += data;
    });
   
    response.on('end', function() {
        var weDoPoint = body.indexOf('<a href="/en-uk/home/we-do.html" target="_self" title="We Do">We Do</a>');
        var endMenuPoint = body.indexOf('</ul>',weDoPoint);
        var menuString = body.substring(body.indexOf('<li',weDoPoint), endMenuPoint);
        var menuItems = menuString.split('</li>');
        
        for(var i=0;i<menuItems.length-1;i++){
            var item = menuItems[i];
            queue.push({
                service_id: pageNumber++,
                name: item.substring(item.indexOf('title="')+'title="'.length, item.indexOf('"', item.indexOf('title="')+'title="'.length)),
                href: item.substring(item.indexOf('href="')+'href="'.length, item.indexOf('"', item.indexOf('href="')+'href="'.length))
            });
        }
        
        NoIdea(queue.shift());
    });
});
req.end();

var pagesToLoad = 0;
var pagesLoaded = 0;

function NoIdea(obj){
    pagesToLoad++;
    
    var callback = function(response){
       var body = '';
       
       if(response.headers.location !== undefined){
            queue.push({service_id: pageNumber++, name:obj.name, href:response.headers.location.substring(response.headers.location.indexOf('.net/') + '.net'.length)});
            body = '';
       }
       
       response.on('data', function(data) {
          body += data;
       });
       
       response.on('end', function() {
          if(body!='' && response.headers.location === undefined){
              obj.data = body;
              res.push(obj);
              
              obj.subPages=[];
              var weDoPoint = body.indexOf('<a href="/en-uk/home/we-do.html" target="_self" title="We Do">We Do</a>');
              var currentMenuPoint = body.indexOf('class="linkdisable"', weDoPoint);
              if(obj.href=='/en-uk/home/be-digital.html') currentMenuPoint = body.indexOf('href="/en-uk/home/be-digital.html" target="_self"');
              var endCurrentMenuPoint = body.indexOf('</li>', currentMenuPoint);
              var subMenuPoint = body.indexOf('<ul', currentMenuPoint);
              
              if(subMenuPoint == -1 || subMenuPoint >= endCurrentMenuPoint){}
              else{
                  var subMenuEndPoint = body.indexOf('</ul>', subMenuPoint);
                  var subMenuString = body.substring(body.indexOf('<li',subMenuPoint), subMenuEndPoint);
                  var subMenuItems = subMenuString.split('</li>');
                  for(var i=0;i<subMenuItems.length-1;i++){
                      var item = subMenuItems[i];
                      var link = item.substring(item.indexOf('href="')+'href="'.length, item.indexOf('"', item.indexOf('href="')+'href="'.length));
                      queue.push({
                         service_id: pageNumber++,
                         name: item.substring(item.indexOf('title="')+'title="'.length, item.indexOf('"', item.indexOf('title="')+'title="'.length)),
                         href: link,
                         parent: obj.href
                      });
                      
                      obj.subPages.push(link);
                  }
              }
          }
          //console.log(obj.name + (obj.parent!==undefined?(" : " + obj.parent):""));
          pagesLoaded++;
          if(queue.length>0) NoIdea(queue.shift());
          checkIfDone();
       });
    }
    
    options.path = obj.href;
    var req = http.request(options, callback);
    req.end();
}

function checkIfDone(){
    var done = true;
    if(pagesLoaded < pagesToLoad){
        done = false;
    }
    if(done){
        for(var i=0;i<res.length;i++){
            res[i].data = res[i].data.substring(res[i].data.indexOf('<div class="containercolumn contains_3col add20pxrightmargin"'));
            var str = res[i].data;
            var indexIgnore = 0;
            var divs = 0;
            while(divs > -1){
                if(str.indexOf('<div') < str.indexOf('</div') ){
                    divs++;
                    indexIgnore += str.indexOf('<div') + 1;
                    str = str.substr(str.indexOf('<div') + 1);
                }
                else{
                    divs--;
                    if(divs>=0) indexIgnore += str.indexOf('</div') + 1;
                    str = str.substr(str.indexOf('</div') + 1);
                }
            }
            res[i].data = res[i].data.substr(0, indexIgnore-1);
        }
        console.log(JSON.stringify(res));
    }
}