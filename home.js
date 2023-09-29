"use strict";

var issuingProviders = {
    Unknown: 'unknown',
    AAD: 'aad',
    B2C: 'b2c',
    IEF: 'ief',
    Google: 'google',
    MSA: 'msa'
}

var Jwt = function (encodedToken) {
    encodedToken = encodedToken.trim();
    this.encodedToken = encodedToken;
    this.decodedHeader = jwt_decode(encodedToken, { header: true });
    this.decodedClaims = jwt_decode(encodedToken.trim());

    var parts = encodedToken.split('.');
    if (parts.length < 2 || parts.length > 3)
        throw new Error('Invalid token, there must be two or three parts.');

    // Public properties
    this.encodedHeader = parts[0];
    this.encodedClaims = parts[1];
    this.encodedSignature = parts[2];
    this.hasSignature = parts.length === 3 && parts[2];
    this.issuingProvider = getIssuingProvider(this.decodedClaims);

    function getIssuingProvider(decodedClaims) {
        var iss = 'iss';
        var tfp = 'tfp';
        var acr = 'acr';
        var b2cPolicyPrefix = 'b2c_1_';
        var iefPolicyPrefix = 'b2c_1a_';

        var issValue = decodedClaims[iss];
        if (!issValue) return '';

        issValue = issValue.toLowerCase();
        var tfpValue = decodedClaims[tfp];
        var acrValue = decodedClaims[acr];

        if ((issValue.indexOf('https://login.microsoftonline.com/') === 0 || issValue.match(/https:\/\/[^./]*\.b2clogin.com\//gi))
            && issValue.indexOf('2.0') > -1) {
            if ((tfpValue && tfpValue.toLowerCase().indexOf(b2cPolicyPrefix) === 0) ||
                (acrValue && acrValue.toLowerCase().indexOf(b2cPolicyPrefix) === 0)) {
                return issuingProviders.B2C;
            } else if ((tfpValue && tfpValue.toLowerCase().indexOf(iefPolicyPrefix) === 0) ||
                (acrValue && acrValue.toLowerCase().indexOf(iefPolicyPrefix) === 0)) {
                return issuingProviders.IEF;
            }
        }

        if ((issValue.indexOf('https://login.chinacloudapi.cn/') === 0 || issValue.match(/https:\/\/[^./]*\.b2clogin.cn\//gi))
            && issValue.indexOf('2.0') > -1) {
            if ((tfpValue && tfpValue.toLowerCase().indexOf(b2cPolicyPrefix) === 0) ||
                (acrValue && acrValue.toLowerCase().indexOf(b2cPolicyPrefix) === 0)) {
                return issuingProviders.B2C;
            } else if ((tfpValue && tfpValue.toLowerCase().indexOf(iefPolicyPrefix) === 0) ||
                (acrValue && acrValue.toLowerCase().indexOf(iefPolicyPrefix) === 0)) {
                return issuingProviders.IEF;
            }
        }

        if (issValue.indexOf('https://login.microsoftonline.com/') === 0 ||
            issValue.indexOf('https://sts.windows.net/') === 0 ||
            issValue.indexOf('https://login.windows.net/') === 0 ||
            issValue.indexOf('https://login.microsoft.com/') === 0 ||
            issValue.indexOf('https://login.microsoft.com/') === 0) {
            return issuingProviders.AAD;
        }

        if (issValue.indexOf('https://login.chinacloudapi.cn/') === 0 ||
            issValue.indexOf('https://sts.chinacloudapi.cn/') === 0) {
            return issuingProviders.AAD;
        }

        if (issValue.indexOf('accounts.google.com') === 0 ||
            issValue.indexOf('https://accounts.google.com') === 0) {
            return issuingProviders.Google;
        }

        return issuingProviders.Unknown;
    }
}

function getUrlFragment(fragmentId) {
    fragmentId = fragmentId + '=';
    if (window.location.hash && window.location.hash.length > 0) {
        var fragmentValueStartIndex = 0;
        var fragmentIdStartIndex = window.location.hash.indexOf(fragmentId);
        if (fragmentIdStartIndex > -1) {
            fragmentValueStartIndex = fragmentIdStartIndex + fragmentId.length;
        }

        if (fragmentValueStartIndex > 0) {
            var fragmentValue = window.location.hash.substring(fragmentValueStartIndex);
            var ampIndex = fragmentValue.indexOf('&');
            if (ampIndex !== -1) {
                fragmentValue = fragmentValue.substring(0, ampIndex);
            }

            return fragmentValue;
        }

        return null;
    }
}

function decodeFragmentValue(fragmentValue) {
    fragmentValue = fragmentValue.replace(/\+/g, '%20');
    fragmentValue = decodeURIComponent(fragmentValue);
    return fragmentValue;
}