const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('js/app.js', 'utf8');

const vConsole = new jsdom.VirtualConsole();
vConsole.on("log", function (message) { console.log("console.log:", message); });
vConsole.on("error", function (message) { console.error("console.error:", message); });
vConsole.on("jsdomError", function (error) { console.error("jsdomError:", error.stack, error.detail); });

const dom = new JSDOM(html, { runScripts: "dangerously", virtualConsole: vConsole });
dom.window.eval(`
  window.supabase = {
    createClient: () => ({
      from: () => ({
        select: async () => ({
          data: [{ id: 1, name: "Test API Product", price: 500, image: "", desc: "Testing" }]
        }),
        insert: async () => ({ error: null })
      })
    })
  };
`);

dom.window.eval(js);

setTimeout(() => {
    console.log("App Root HTML:", !!dom.window.document.getElementById('app-root').innerHTML);
}, 1000);
