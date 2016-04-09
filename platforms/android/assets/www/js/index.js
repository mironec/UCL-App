/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		$('.tab').click(function(){
			var dat = $(this).data('showScreen');
			if(dat === undefined) return;
			$(this).closest(".screen").hide();
			$( "#" + dat ).show();
		});
    },

    onDeviceReady: function() {

        /*textHackArr = textHack.split('<li class=" leftNavLineheight">');

        var welcomeScreenData = [];
        for(var i=0;i<textHackArr.length;i++){
            if(textHackArr[i].indexOf('target="_self"')==-1) continue;
            var obj = {};
            obj.name = textHackArr[i].substring(textHackArr[i].indexOf('<a href=')+5);
            obj.name = obj.name.substring(obj.name.indexOf('">')+2);
            obj.name = obj.name.substring(0,obj.name.indexOf('</a>'));
            welcomeScreenData.push(obj);
        }

        console.log(JSON.stringify(welcomeScreenData));*/

        var welcomeScreenData = [{"name":"ITO Services"},{"name":"Application Management"},{"name":"Application Operations"},{"name":"Atos Analytics"},{"name":"Atos Consulting"},{"name":"Atos Worldgrid"},{"name":"Big data"},{"name":"Business Integration Solutions"},{"name":"Business Process Solutions"},{"name":"Civil &amp; National Security"},{"name":"Cloud"},{"name":"Consolidation &amp; Harmonization"},{"name":"Cyber Security"},{"name":"Data Center Services"},{"name":"ECM"},{"name":"Extreme Performance Computing Environments"},{"name":"Managed Infrastructure Solutions"},{"name":"Media Solutions"},{"name":"MES"},{"name":"Multichannel &amp; Mobility"},{"name":"Network &amp; Communications"},{"name":"OSS"},{"name":"Outsourcing"},{"name":"PLM"},{"name":"SAP Business Process Solutions"},{"name":"SAP Industry Solutions"},{"name":"Smart Mobility"},{"name":"Smart Utility"},{"name":"Social Collaboration"},{"name":"Sustainability Solutions"},{"name":"Tax, State Treasury and Customs "},{"name":"Technology Transformation Services"},{"name":"Telco Network Products"},{"name":"Testing"},{"name":"Workplace Services"},{"name":"Worldline"}];
        
        var children = [];
        for(var i = 0; i < welcomeScreenData.length; i++){
            var e = document.createElement("button");
            e.type = 'button';
            e.className = 'btn btn-default tab col-lg-4 col-md-4 col-sm-6 col-xs-12';
            e.innerHTML = welcomeScreenData[i].name;

            var jobj = $(e);
            jobj.data('showScreen','tab1Screen');
            jobj.click(function(){
                var dat = $(this).data("showScreen");
                if(dat === undefined || dat == "") return;
                $(this).closest(".screen").hide();
                $( "#" + dat ).show();
            });

            $('#welcomeScreen .row').append(jobj);
        }
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();