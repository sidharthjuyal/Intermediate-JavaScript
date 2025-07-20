let arr = ["Sid", "Vex"];
let object = {
    name: "Sid",
    city: "Kotdwar",
    getIntro: function() {
        console.log(this.name + " from " + this.city);
    }
}

let object2 = {
    name: "Vex",
}

// Never Do This
object2.__proto__ = object;

// prototypal inheritence
console.log(object2.name);
console.log(object2.city);
console.log(object2.getIntro());

// you can also make some variables and functions accessible to some objects using this
// for example:  Function.prototype.myBind = function() {console.log("my bind");}