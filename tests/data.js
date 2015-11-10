var testData = {
    veryBasicCSS: {
        input: '.someClass{someDirective:someValue;}',
        output: '[{"selector":".someClass","rules":[{"directive":"someDirective","value":"someValue"}]}]'
    },
    basicCSS: {
        input: 'html{\n    color:black;\n}',
        output: '[{"selector":"html","rules":[{"directive":"color","value":"black"}]}]'
    },
    basicCSS2: {
        input: '/*\nSome Comments\nBaby \n*/\nhtml{\n    color:black;\n}',
        output: '[{"comments":"/*\\nSome Comments\\nBaby \\n*/","selector":"html","rules":[{"directive":"color","value":"black"}]}]'
    },
    basicCSS3: {
        input: '\n\/*\n    Some Comment\n*\/\nhtml{\n    color:black;\n}\nbody { var-my-margin: 12px }\nh1 {  margin-top: var(my-margin);\n      background-image: linear-gradient(to top, white, #c0c0c0); }\n',
        output: '[{"comments":"\/*\\n    Some Comment\\n*\/","selector":"html","rules":[{"directive":"color","value":"black"}]},{"selector":"body","rules":[{"directive":"var-my-margin","value":"12px"}]},{"selector":"h1","rules":[{"directive":"margin-top","value":"var(my-margin)"},{"directive":"background-image","value":"linear-gradient(to top, white, #c0c0c0)"}]}]'
    },
    basicCSS4: {
        input: '.someClass{someDirective:some\n Value;}',
        output: '[{"selector":".someClass","rules":[{"directive":"someDirective","value":"some\\n Value"}]}]'
    },
    basicCSS5: {
        input: '.someClass{margin:0;}',
        output: '[{"selector":".someClass","rules":[{"directive":"margin","value":"0"}]}]'
    },
    advCSS: {
        input: '@media screen and (min-width: 780px) {\n  .supernova {\n    background-color: #fafafa;\n  }\n}',
        output: '[{"selector":"@media screen and (min-width: 780px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"background-color","value":"#fafafa"}]}]}]'
    },
    advCSS2: {
        input: '@media screen and (min-width: 780px) and (max-width: 840px) {\n  .supernova {\n    padding: 30px 0;\n  }\n}\n@media screen and (min-width: 840px) and (max-width: 900px) {\n  .supernova {\n    padding: 60px 0;\n  }\n}',
        output: '[{"selector":"@media screen and (min-width: 780px) and (max-width: 840px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"padding","value":"30px 0"}]}]},{"selector":"@media screen and (min-width: 840px) and (max-width: 900px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"padding","value":"60px 0"}]}]}]'
    },
    advCSS3: {
        input: '@media screen and (min-width: 780px) {\n  .supernova {\n    background-color: #fafafa;\n  }\n  .supernova body {\n    background-color: #fafafa;\n  }\n  .supernova .form-all {\n    border: 1px solid #e1e1e1;\n    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);\n    -moz-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);\n    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);\n  }\n}\n@media screen and (min-width: 780px) and (max-width: 840px) {\n  .supernova {\n    padding: 30px 0;\n  }\n}\n@media screen and (min-width: 840px) and (max-width: 900px) {\n  .supernova {\n    padding: 60px 0;\n  }\n}\n@media screen and (min-width: 900px) {\n  .supernova {\n    padding: 90px 0;\n  }\n}\n.form-all {\n  background-color: #ffffff;\n}\n.form-header-group {\n  border-color: #e6e6e6;\n}\n.form-matrix-table tr {\n  border-color: #e6e6e6;\n}\n.form-matrix-table tr:nth-child(2n) {\n  background-color: #f2f2f2;\n}',
        output: '[{"selector":"@media screen and (min-width: 780px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"background-color","value":"#fafafa"}]},{"selector":".supernova body","rules":[{"directive":"background-color","value":"#fafafa"}]},{"selector":".supernova .form-all","rules":[{"directive":"border","value":"1px solid #e1e1e1"},{"directive":"-webkit-box-shadow","value":"0 3px 9px rgba(0, 0, 0, 0.1)"},{"directive":"-moz-box-shadow","value":"0 3px 9px rgba(0, 0, 0, 0.1)"},{"directive":"box-shadow","value":"0 3px 9px rgba(0, 0, 0, 0.1)"}]}]},{"selector":"@media screen and (min-width: 780px) and (max-width: 840px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"padding","value":"30px 0"}]}]},{"selector":"@media screen and (min-width: 840px) and (max-width: 900px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"padding","value":"60px 0"}]}]},{"selector":"@media screen and (min-width: 900px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"padding","value":"90px 0"}]}]},{"selector":".form-all","rules":[{"directive":"background-color","value":"#ffffff"}]},{"selector":".form-header-group","rules":[{"directive":"border-color","value":"#e6e6e6"}]},{"selector":".form-matrix-table tr","rules":[{"directive":"border-color","value":"#e6e6e6"}]},{"selector":".form-matrix-table tr:nth-child(2n)","rules":[{"directive":"background-color","value":"#f2f2f2"}]}]'
    },
    advCSS4: {
        input: '@font-face {\nfont-family: myFirstFont;\nsrc: url(sansation_light.woff);\n}',
        output: '[{"selector":"@font-face","type":"font-face","rules":[{"directive":"font-family","value":"myFirstFont"},{"directive":"src","value":"url(sansation_light.woff)" }] }]'
    },
    advCSS5: {
        input: '@font-face {\nfont-family: myFirstFont;\nsrc: url(sansation_light.woff) format(woff)\nurl(sansation_light.otf) format(opentype);\n}',
        output: '[{"selector":"@font-face","type":"font-face","rules":[{"directive":"font-family","value":"myFirstFont"},{"directive":"src","value":"url(sansation_light.woff) format(woff)\\nurl(sansation_light.otf) format(opentype)" }] }]'
    },
    advCSS6: {
        input: '/*--------------------------------------------------------------\nA big comment\n--------------------------------------------------------------*/@media screen and (min-width: 780px) {\n  .supernova {\n    background-color: #fafafa;\n  }\n}',
        output: '[{"comments": "/*--------------------------------------------------------------\\nA big comment\\n--------------------------------------------------------------*/","selector":"@media screen and (min-width: 780px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"background-color","value":"#fafafa"}]}]}]'
    }
};



var diffTestData = {
    diffBasic: {
        css1: '{"selector":".form-label-left,.form-label-right","rules":[{"directive":"width","value":"150px"},{"directive":"color","value":"red"}]}',
        css2: '{"selector":".form-label-left,.form-label-right","rules":[{"directive":"width","value":"150px"},{"directive":"color","value":"blue"}]}',
        diff: '{"selector":".form-label-left,.form-label-right","rules":[{"directive":"color","value":"red"}]}'
    },
    diffBasic2: {
        css1: '{"selector":".form-label","rules":[{"directive":"white-space","value":"normal"}]}',
        css2: '{"selector":".form-label","rules":[{"directive":"white-space","value":"normal"}]}',
        diff: false
    }
};

var cssIntelligentPushData = {
    pushBasic: {
        styles: '[]',
        newStyle: '{"selector":".form-textbox,.form-textarea,.form-radio-other-input,.form-checkbox-other-input,.form-captcha input,.form-spinner input,.form-checkbox-item label,.form-radio-item label","rules":[{"directive":"color","value":"#ccc"}]}',
        result: '[{"selector":".form-textbox,.form-textarea,.form-radio-other-input,.form-checkbox-other-input,.form-captcha input,.form-spinner input,.form-checkbox-item label,.form-radio-item label","rules":[{"directive":"color","value":"#ccc"}]}]'
    },
    pushBasic2: {
        styles: '[{"selector":".first","rules":[{"directive":"color","value":"blue"},{"directive":"margin","value":"10px"}]},{"selector":".second","rules":[{"directive":"color","value":"red"},{"directive":"margin","value":"20px"}]}]',
        newStyle: '{"selector":".first","rules":[{"directive":"padding","value":"5px"}]}',
        result: '[{"selector":".first","rules":[{"directive":"color","value":"blue"},{"directive":"margin","value":"10px"},{"directive":"padding","value":"5px"}]},{"selector":".second","rules":[{"directive":"color","value":"red"},{"directive":"margin","value":"20px"}]}]'
    },
    pushBasic3: {
        styles: '[{"selector":"@media screen and (min-width: 780px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"background-color","value":"#fafafa"}]}]}]',
        newStyle: '{"selector":"@media screen and (min-width: 780px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"background-color","value":"#bada55"}]}]}',
        result: '[{"selector":"@media screen and (min-width: 780px)","type":"media","subStyles":[{"selector":".supernova","rules":[{"directive":"background-color","value":"#fafafa"}]},{"selector":".supernova","rules":[{"directive":"background-color","value":"#bada55"}]}]}]'
    }
};

/*
    data regarding unit tests of functions of FullInspector
*/
var unitTest = {
    stripComments : {
        input : '\/*\n   Some Css Comments\n   \n*\/\n.classSelector{\n   margin : 20px; \/* single line css comment *\/\n}',
        output :  '\n.classSelector{\n   margin : 20px; \n}'
    },
    findCorrespondingRule : {
        input1 :[
                    {
                        directive : 'margin',
                        value : '0px'
                    },
                    {
                        directive : 'background',
                        value : 'black'
                    },
                ],
        input2 : 'background',
        output :{
                    directive : 'background',
                    value : 'black'
                }
    },
    findBySelector : {
        input1 :[
                    {
                        selector : '.someSelector',
                        rules : [
                            {
                                directive : 'margin',
                                value : '0 auto'
                            },
                            {
                                directive : 'font-size',
                                value : '20px'
                            },
                        ]
                    },{
                        selector : '.selector',
                        rules : [
                            {
                                directive : 'border',
                                value : '1px solid red'
                            },
                            {
                                directive : 'color',
                                value : 'blue'
                            },
                        ]
                    }
                ],
        input2 : '.selector',
        output :[
                    {
                            selector : '.selector',
                            rules : [
                                {
                                    directive : 'border',
                                    value : '1px solid red'
                                },
                                {
                                    directive : 'color',
                                    value : 'blue'
                                },
                            ]
                    }
                ]
    },
    cssDiff1 : {
        input1 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '5 auto'
                },
                {
                    directive : 'font-size',
                    value : '20px'
                },
            ]
        },
        input2 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '0 auto'
                },
                {
                    directive : 'font-size',
                    value : '20px'
                },
            ]
        },
        output : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '5 auto'
                },
            ]
        }
    },
    cssDiff2 : {
        input1 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '0 auto'
                },
                {
                    directive : 'padding',
                    value : '0'
                },
                {
                    directive : 'font-size',
                    value : '20px'
                },
            ]
        },
        input2 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '0 auto'
                },
                {
                    directive : 'font-size',
                    value : '20px'
                },
            ]
        },
        output : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'padding',
                    value : '0'
                },
            ]
        }
    },
    cssDiff3 : {
        input1 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '0 auto'
                },
            ]
        },
        input2 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '0 auto'
                },
                {
                    directive : 'font-size',
                    value : '20px'
                },
            ]
        },
        output : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'font-size',
                    value : '20px',
                    type : 'DELETED'
                },
            ]
        }
    },
    cssDiff4 : {
        input1 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '0 auto'
                },
                {
                    directive : 'font-size',
                    value : '20px'
                },
            ]
        },
        input2 : {
            selector : '.someSelector2',
            rules : [
                {
                    directive : 'margin',
                    value : '0 auto'
                },
                {
                    directive : 'font-size',
                    value : '20px'
                },
            ]
        },
        output : false
    },
    cssDiff5 : {
        input1 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'padding',
                    value : '0 auto'
                },
                {
                    directive : 'font-size',
                    value : '30px'
                }
            ]
        },
        input2 : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'margin',
                    value : '0 auto'
                },
                {
                    directive : 'font-size',
                    value : '20px'
                }
            ]
        },
        output : {
            selector : '.someSelector',
            rules : [
                {
                    directive : 'padding',
                    value : '0 auto'
                },
                {
                    directive : 'font-size',
                    value : '30px'
                },
                {
                    directive : 'margin',
                    value : '0 auto',
                    type : 'DELETED'
                }
            ]
        }
    },
    parseRules1 : {
            input : '\n\ncolor:white;\n    font-size:18px;\n    color:red',
            output : [
                {
                    directive : 'color',
                    value : 'white'    
                },
                {
                    directive : 'font-size',
                    value : '18px'    
                },
                {
                    directive : 'color',
                    value : 'red'    
                }
            ]
    }
};

var cssDiffFailedValues = [
    {
        css1 : '{"selector":".form-textarea, .form-textbox","rules":[{"directive":"border","value":"1px solid #b7bbbd"},{"directive":"-webkit-border-radius","value":"2px"},{"directive":"-moz-border-radius","value":"2px"},{"directive":"border-radius","value":"2px"},{"directive":"padding","value":"4px"},{"directive":"background","value":"transparent !important"},{"directive":"width","value":"100%"},{"directive":"-webkit-appearance","value":"none"},{"directive":"-webkit-box-shadow","value":"inset 0 0 4px rgba(0,0,0,0.2), 0 1px 0 rgb(255,255,255)"},{"directive":"-moz-box-shadow","value":"inset 0 0 4px rgba(0,0,0,0.2), 0 1px 0 rgb(255,255,255)"},{"directive":"box-shadow","value":"inset 0 0 4px rgba(0,0,0,0.2), 0 1px 0 rgb(255,255,255)"},{"directive":"border","value":"1px solid #AEAEAE"},{"directive":"color","value":"#333"},{"directive":"font-family","value":"\\"Verdana\\", sans-serif"},{"directive":"-webkit-box-sizing","value":"border-box"},{"directive":"-moz-box-sizing","value":"border-box"},{"directive":"box-sizing","value":"border-box"}]}',
        css2 : '{"selector":".form-textarea, .form-textbox","rules":[{"directive":"border","value":"1px solid #b7bbbd"},{"directive":"-webkit-border-radius","value":"2px"},{"directive":"-moz-border-radius","value":"2px"},{"directive":"border-radius","value":"2px"},{"directive":"padding","value":"4px"},{"directive":"background","value":"transparent !important"},{"directive":"width","value":"100%"},{"directive":"-webkit-appearance","value":"none"},{"directive":"-webkit-box-shadow","value":"inset 0 0 4px rgba(0,0,0,0.2), 0 1px 0 rgb(255,255,255)"},{"directive":"-moz-box-shadow","value":"inset 0 0 4px rgba(0,0,0,0.2), 0 1px 0 rgb(255,255,255)"},{"directive":"box-shadow","value":"inset 0 0 4px rgba(0,0,0,0.2), 0 1px 0 rgb(255,255,255)"},{"directive":"border","value":"1px solid #AEAEAE"},{"directive":"color","value":"#333"},{"directive":"font-family","value":"\\"Verdana\\", sans-serif"},{"directive":"-webkit-box-sizing","value":"border-box"},{"directive":"-moz-box-sizing","value":"border-box"},{"directive":"box-sizing","value":"border-box"}]}',
        output : false
    }
];