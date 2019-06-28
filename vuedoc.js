const ts = require('typescript')
const vuedoc = require('@vuedoc/parser');
const Loader = vuedoc.Loader;
 
class TypeScriptLoader extends Loader {
  load (source) {
    const options = {
      compilerOptions: {
        target: ts.ModuleKind.ESNext,
        module: ts.ModuleKind.ESNext
      }
    }
 
    const { outputText } = ts.transpileModule(source, options)
 
    // don't forget the return here
    return this.emitScript(outputText)
  }
}
 
const options = {
  filename: './src/components/extend.ts',
  loaders: [
    /**
     * Register TypeScriptLoader
     * Note that the name of the loader is either the extension
     * of the file or the value of the attribute `lang`
     */
    Loader.extend('ts', TypeScriptLoader)
  ]
}
 
vuedoc.parse(options).then((component) => {
  console.log(component)
}).catch(err => {
    console.log(err);
});