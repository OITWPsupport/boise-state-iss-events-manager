<link rel="stylesheet" href="<?= $css; ?>"/>
<script src="<?= $dependencies; ?>"></script>
<script>
	var initBsuEventsApp = function(name){
		angular.bootstrap(document.getElementById("<?= $id; ?>"),[name]);
	};
	// Load jQuery if not loaded
	if(!window.jQuery) {
		var j = '2.1.1';
		document.write("<script type='text/javascript' src='//ajax.googleapis.com/ajax/libs/jquery/" + j + "/jquery" +
		".min.js'><\/script>");
	}
	// Load angular if not loaded
	if(typeof angular == "undefined") {
		var a = '1.3.3';
		document.write("<script type='text/javascript' src='//ajax.googleapis.com/ajax/libs/angularjs/" + a + "/angular.min.js'><\/script>");
	}
</script>
<script src="https://apis.google.com/js/client.js"></script>