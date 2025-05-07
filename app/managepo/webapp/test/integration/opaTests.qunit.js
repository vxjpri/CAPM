sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'vxj02/po/managepo/test/integration/FirstJourney',
		'vxj02/po/managepo/test/integration/pages/POsList',
		'vxj02/po/managepo/test/integration/pages/POsObjectPage',
		'vxj02/po/managepo/test/integration/pages/PoItemsSetObjectPage'
    ],
    function(JourneyRunner, opaJourney, POsList, POsObjectPage, PoItemsSetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('vxj02/po/managepo') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePOsList: POsList,
					onThePOsObjectPage: POsObjectPage,
					onThePoItemsSetObjectPage: PoItemsSetObjectPage
                }
            },
            opaJourney.run
        );
    }
);