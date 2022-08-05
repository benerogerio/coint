<template>
    <div></div>
</template>

<script>

  import admob from 'cordova-admob/www/admob'

  export default  {
    created(){
        return this.fireBanner()
    },
    methods : {
      fireBanner() {
        admob.setOptions({
          publisherId:           "ca-app-pub-6515701583756658/1084097670",  // Required
          //interstitialAdId:      "ca-app-pub-3940256099942544/1033173712",  // Optional
          autoShowBanner:        true,                                      // Optional
          //autoShowRInterstitial: false,                                     // Optional
          //autoShowRewarded:      false,                                     // Optional
          //tappxIdiOS:            "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
          //tappxIdAndroid:        "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
          //tappxShare:            0.5                                        // Optional
        });

        admob.createBannerView();

      }
    }

  }
</script>
