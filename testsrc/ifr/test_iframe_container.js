var TestIframeContainer = function() {};

TestIframeContainer.createContainerForTest = function( testName, hub, clientID, params, paramsAsIs, urlparamstring )
{
    var component1Path = COMPONENT1_DOMAIN + HUB20_PATH + '/',
        channel,
        pathToTestsrc,
        tunnelURI;
    
    if ( ! paramsAsIs && params && params.IframeContainer ) {
        if ( ! params.IframeContainer.uri ) {
            params.IframeContainer.uri = TestIframeContainer.createIframeURI(component1Path + 
                    "testsrc/ifr/" + testName + ".html", urlparamstring );
        }
        if ( ! params.IframeContainer.tunnelURI ) {
            channel = OpenAjax.gadgets.rpc.getRelayChannel();
            if (channel === 'wpm' || channel === 'ifpc') {
                pathToTestsrc = testHelper.pathToTestsrc(window.location.href);
                params.IframeContainer.tunnelURI = testHelper.tunnelURIFromConfigURLParam(pathToTestsrc);
            }
        }
        if (!params.IframeContainer.clientRelay) {
            params.IframeContainer.clientRelay = testHelper.tunnelURIFromConfigURLParam(component1Path);
        }
    }
    
    return new OpenAjax.hub.IframeContainer( hub, clientID, params );
};

TestIframeContainer.createIframeURI = function( uri, urlparamstring )
{
    var config = OpenAjax.gadgets.util.getUrlParameters().config;
	var paramStr = "";
	if (config && urlparamstring) {
		paramStr = "?config=" + config + "&" + urlparamstring;
	} else if (config) {
		paramStr = "?config=" + config;
	} else if (urlparamstring) {
		paramStr = "?" + urlparamstring;
	}
    return uri + paramStr;
};
