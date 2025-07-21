localStorage.setItem("hello", "world");
localStorage.setItem("hello1", "world1");
localStorage.getItem("hello");
localStorage.removeItem("hello1");
localStorage.clear();

// if you ant to store an object, do JSON.stringify(obj)
// when retrieving, do JSON.parse(obj) 

// session storage
sessionStorage.setItem("hello3", "world");
sessionStorage.setItem("hello4", "world1");
sessionStorage.getItem("hello3");
sessionStorage.removeItem("hello4");
sessionStorage.clear();
