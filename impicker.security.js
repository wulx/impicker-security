// References:
//   https://developers.inkfilepicker.com/docs/security
//   http://stackoverflow.com/a/17894932/2469833
//   https://gist.github.com/nicolashery/7785605
impicker = {
  // Take an object or JSON string and encode it to
  // URL-safe Base64 with trailing "="
  encodePolicy: function(policy) {
    var str = policy, encodedPolicy;

    if (Object.prototype.toString.call(policy) !== '[object String]') {
      str = JSON.stringify(policy);
    }

    str = CryptoJS.enc.Utf8.parse(str);
    encodedPolicy = CryptoJS.enc.Base64.stringify(str);

    return encodedPolicy;
  },
 
  // Take an object or JSON string, encode it to Base64 
  // and encrypt with a secret using HMAC-SHA256
  signPolicy: function(encodedPolicy, secret) {
    var signature = CryptoJS.HmacSHA256(encodedPolicy, secret).toString();

    return signature;
  },

  // append the encoded policy and signature to the Ink file URL
  secureUrl: function(inkUrl, policy, secret, debug) {
    var encodedPolicy = this.encodePolicy(policy),
        signature = this.signPolicy(encodedPolicy, secret),
        securedUrl;

    if (debug === true)
        inkUrl = inkUrl + "/debug/security";

    securedUrl = inkUrl + "?policy=" + encodedPolicy + "&signature=" + signature;

    return securedUrl;
  },

  // security options in JSON
  security: function(policy, secret) {
    var encodedPolicy = this.encodePolicy(policy),
        signature = this.signPolicy(encodedPolicy, secret);

    return {"policy": encodedPolicy, "signature": signature};
  },

  // https://developers.inkfilepicker.com/docs/security/#createPolicy
  // The expiration date of this policy after which it will no longer be valid.
  // The type should be an integer and it is expressed in seconds since 1970
  expiry: function(seconds) {
    // http://jsperf.com/gettime-vs-now-0
    // Date.now() is faster, but doesn't work in IE6~8
    return Math.floor(new Date().getTime()/1000 + seconds);
  }
};
