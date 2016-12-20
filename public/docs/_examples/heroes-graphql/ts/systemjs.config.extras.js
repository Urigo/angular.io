
/** App specific SystemJS configuration */
System.config({

  map: {
    'apollo-client':                      'npm:apollo-client',
    'apollo-client-rxjs':                 'npm:apollo-client-rxjs',
    'apollo-angular':                     'npm:apollo-angular',

    'graphql':                            'npm:graphql',
    'whatwg-fetch':                       'npm:whatwg-fetch',
    'graphql-tag':                        'npm:graphql-tag',
    'symbol-observable':                  'npm:symbol-observable',
    'redux':                              'npm:redux/dist/redux.min.js',
    'graphql-tools':                      'npm:graphql-tools',
    'graphql-anywhere':                   'npm:graphql-anywhere',

    'deprecated-decorator':               'npm:deprecated-decorator',
    'node-uuid':                          'npm:node-uuid',
    'uuid':                               'npm:uuid',
    'iterall':                            'npm:iterall',

    'lodash':                             'npm:lodash',

    'lodash-es':                          'npm:lodash-es',
    'lodash._arraycopy':                  'npm:lodash._arraycopy',
    'lodash._arrayeach':                  'npm:lodash._arrayeach',
    'lodash.assign':                      'npm:lodash.assign',
    'lodash.isstring':                    'npm:lodash.isstring',
    'lodash.mapvalues':                   'npm:lodash.mapvalues',
    'lodash.isnumber':                    'npm:lodash.isnumber',
    'lodash.isequal':                     'npm:lodash.isequal',
    'lodash.isnull':                      'npm:lodash.isnull',
    'lodash.isundefined':                 'npm:lodash.isundefined',
    'lodash.isobject':                    'npm:lodash.isobject',
    'lodash.countby':                     'npm:lodash.countby',
    'lodash.identify':                    'npm:lodash.identify',
    'lodash.uniq':                        'npm:lodash.uniq',
    'lodash.flatten':                     'npm:lodash.flatten',
    'lodash.isfunction':                  'npm:lodash.isfunction',
    'lodash.pick':                        'npm:lodash.pick',
    'lodash.forown':                      'npm:lodash.forown',
    'lodash.merge':                       'npm:lodash.merge',
    'lodash.identity':                    'npm:lodash.identity',
    'lodash.omit':                        'npm:lodash.omit',
    'lodash.clonedeep':                   'npm:lodash.clonedeep',
    'lodash.includes':                    'npm:lodash.includes',
    'lodash._createassigner':             'npm:lodash._createassigner',
    'lodash.isarguments':                 'npm:lodash.isarguments',
    'lodash.isarray':                     'npm:lodash.isarray',
    'lodash.isplainobject':               'npm:lodash.isplainobject',
    'lodash.istypedarray':                'npm:lodash.istypedarray',
    'lodash.keys':                        'npm:lodash.keys',
    'lodash.toplainobject':               'npm:lodash.toplainobject',
    'lodash._bindcallback':               'npm:lodash._bindcallback',
    'lodash._isiterateecall':             'npm:lodash._isiterateecall',
    'lodash.restparam':                   'npm:lodash.restparam',
    'lodash._basefor':                    'npm:lodash._basefor',
    'lodash.keysin':                      'npm:lodash.keysin',
    'lodash._getnative':                  'npm:lodash._getnative',
    'lodash._basecopy':                   'npm:lodash._basecopy'
  },
  packages: {
      
    'apollo-client':              { main: './index.js', defaultExtension: 'js' },
    'apollo-client-rxjs':         { main: './build/src/index.js', defaultExtension: 'js' },
    'apollo-angular':             { main: './build/bundles/apollo.umd.js', defaultExtension: 'js' },

    'whatwg-fetch':               { main: './fetch.js', defaultExtension: 'js' },
    'redux':                      { format: 'cjs', defaultExtension: 'js' },
    'graphql-tag':                { main: './index.js', defaultExtension: 'js' },
    
    'graphql':     { 
      main: './index.js', 
      defaultExtension: 'js',
      map: {
        './type': './type/index.js',
        './language': './language/index.js',
        './execution': './execution/index.js',
        './validation': './validation/index.js',
        './error': './error/index.js',
        './utilities': './utilities/index.js'
      }, 
    },
    'graphql-tools':              { 
      main: '/dist/index.js', 
      defaultExtension: 'js',
      //map: { uuid: '@empty' }
    },
    'graphql-anywhere':           { 
      //format: 'cjs', 
      main: '/lib/src/index.js', 
      defaultExtension: 'js',
    /*
      map: {
        './getFromAST': './getFromAST',
        './directives': './directives',
        './storeUtils': './storeUtils',
        './utilities': './utilities'
      }
    */
    },


    'deprecated-decorator':       { main: '/bld/index.js', defaultExtension: 'js' },
    'node-uuid':                  { main: './uuid.js', defaultExtension: 'js' },
    'uuid':                       { main: './lib/rng-browser.js', defaultExtension: 'js' },
    'iterall':                    { main: './index.js', defaultExtension: 'js' },
    'symbol-observable':          { main: './index.js', defaultExtension: 'js' },

    'lodash':                     { main: './index.js', defaultExtension: 'js' },
    'lodash-es':                  { main: './index.js', defaultExtension: 'js' },
    'lodash._arraycopy':          { main: './index.js', defaultExtension: 'js' },
    'lodash._arrayeach':          { main: './index.js', defaultExtension: 'js' },
    'lodash.assign':              { main: './index.js', defaultExtension: 'js' },
    'lodash.isstring':            { main: './index.js', defaultExtension: 'js' },
    'lodash.mapvalues':           { main: './index.js', defaultExtension: 'js' },
    'lodash.isnumber':            { main: './index.js', defaultExtension: 'js' },
    'lodash.isequal':             { main: './index.js', defaultExtension: 'js' },
    'lodash.isnull':              { main: './index.js', defaultExtension: 'js' },
    'lodash.isundefined':         { main: './index.js', defaultExtension: 'js' },
    'lodash.isobject':            { main: './index.js', defaultExtension: 'js' },
    'lodash.countby':             { main: './index.js', defaultExtension: 'js' },
    'lodash.identify':            { main: './index.js', defaultExtension: 'js' },
    'lodash.uniq':                { main: './index.js', defaultExtension: 'js' },
    'lodash.flatten':             { main: './index.js', defaultExtension: 'js' },
    'lodash.isfunction':          { main: './index.js', defaultExtension: 'js' },
    'lodash.pick':                { main: './index.js', defaultExtension: 'js' },
    'lodash.forown':              { main: './index.js', defaultExtension: 'js' },
    'lodash.identity':            { main: './index.js', defaultExtension: 'js' },
    'lodash.merge':               { main: './index.js', defaultExtension: 'js' },
    'lodash.omit':                { main: './index.js', defaultExtension: 'js' },
    'lodash.clonedeep':           { main: './index.js', defaultExtension: 'js' },
    'lodash.includes':            { main: './index.js', defaultExtension: 'js' },
    'lodash._createassigner':     { main: './index.js', defaultExtension: 'js' },
    'lodash.isarguments':         { main: './index.js', defaultExtension: 'js' },
    'lodash.isarray':             { main: './index.js', defaultExtension: 'js' },
    'lodash.isplainobject':       { main: './index.js', defaultExtension: 'js' },
    'lodash.istypedarray':        { main: './index.js', defaultExtension: 'js' },
    'lodash.keys':                { main: './index.js', defaultExtension: 'js' },
    'lodash.toplainobject':       { main: './index.js', defaultExtension: 'js' },
    'lodash._bindcallback':       { main: './index.js', defaultExtension: 'js' },
    'lodash._isiterateecall':     { main: './index.js', defaultExtension: 'js' },
    'lodash.restparam':           { main: './index.js', defaultExtension: 'js' },
    'lodash._basefor':            { main: './index.js', defaultExtension: 'js' },
    'lodash.keysin':              { main: './index.js', defaultExtension: 'js' },
    'lodash._getnative':          { main: './index.js', defaultExtension: 'js' },
    'lodash._basecopy':           { main: './index.js', defaultExtension: 'js' }
  }
});
