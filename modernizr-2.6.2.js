body {
    padding-top: 50px;
    padding-bottom: 20px;
}

/* 768/750, 992/970, 1200/1170*/
@media (min-width: 868px) {
    .container {
        max-width: 850px;
    }
}

@media (min-width: 1092px) {
    .container {
        max-width: 1070px;
    }
}

@media (min-width: 1300px) {
    .container {
        max-width: 1270px;
    }
}

@media (min-width: 1400px) {
    .container {
        max-width: 1370px;
    }
}

@media (min-width: 1500px) {
    .container {
        max-width: 1470px;
    }
}

/* Set padding to keep content from hitting the edges */
.body-content {
    padding-left: 15px;
    padding-right: 15px;
}

/* Override the default bootstrap behavior where horizontal description lists 
   will truncate terms that are too long to fit in the left column 
*/
.dl-horizontal dt {
    white-space: normal;
}

/* Set width on the form input elements since they're 100% wide by default */
input,
select,
textarea {
    max-width: 280px;
}

#claims { 
    padding-top: 15px;
}

#decodedToken {
    min-height: 300px;
}

.mono {
    font-family:monospace;
}

.prewrapbreakword {
    white-space: pre;
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
}

.prewrapbreakall {
    white-space: pre;
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-break: break-all;
}

.forcebreakword {
    word-break: break-all;
}

#idtoken {
    min-height: 300px;
}

#encodedToken {
    min-height: 100px;
}

div#tokenErrorText::before,
div#tokenErrorText::after {
    display: none;
}

div#encodedToken::before,
div#encodedToken::after
{
    display: none;
}

#issuingProviderDescription, #encodedTokenHeader {
    padding-left: 20px;
    font-size: 0.85em;
}

#tokenErrorPanel {
    display: none;
}

.jwtHeader {
    color: #B00;
}

.jwtClaims {
    color: #00B;
}

.jwtSignature {  
    color: #090;
}
