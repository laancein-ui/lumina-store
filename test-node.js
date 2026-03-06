const dom = require('jsdom').JSDOM;
const window = new dom('').window;
const script = window.document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
script.onload = () => {
    console.log("Supabase type:", typeof window.supabase);
    if (window.supabase) {
        console.log("createClient type:", typeof window.supabase.createClient);
    }
};
window.document.head.appendChild(script);
