// third argument u can imagine as a useCapture flag, if true capturing happens, if false bubbling happens

// case 1: Event Bubbling
// document.getElementById('grandparent').addEventListener('click', () => {
//     console.log('grandparent clicked!');
// }, false)
// document.getElementById('parent').addEventListener('click', () => {
//     console.log('parent clicked!');
// }, false)
// document.getElementById('child').addEventListener('click', () => {
//     console.log('child clicked!');
// }, false)
// Output: child clicked!, parent clicked!, grandparent clicked! (click on child div)


// case 2: Event Capturing
// document.getElementById('grandparent').addEventListener('click', () => {
//     console.log('grandparent clicked!');
// }, true)
// document.getElementById('parent').addEventListener('click', () => {
//     console.log('parent clicked!');
// }, true)
// document.getElementById('child').addEventListener('click', () => {
//     console.log('child clicked!');
// }, true)
// Output: grandparent clicked!, parent clicked!, child clicked! (click on child div)


// case 3: First Event Capturing happens then event bubbling
// document.getElementById('grandparent').addEventListener('click', () => {
//     console.log('grandparent clicked!');
// }, true)
// document.getElementById('parent').addEventListener('click', () => {
//     console.log('parent clicked!');
// }, false)
// document.getElementById('child').addEventListener('click', () => {
//     console.log('child clicked!');
// }, true)
// Output: grandparent clicked!, child clicked!, parent clicked! (click on child div)


// case 4: First Event Capturing happens then event bubbling
// document.getElementById('grandparent').addEventListener('click', () => {
//     console.log('grandparent clicked!');
// }, true) // capturing
// document.getElementById('parent').addEventListener('click', () => {
//     console.log('parent clicked!');
// }, false) // bubbling
// document.getElementById('child').addEventListener('click', () => {
//     console.log('child clicked!');
// }, false) // bubbling
// Output: grandparent clicked!, child clicked!, parent clicked! (click on child div)

// You can stop all these propogations by using event.stopPropagation()
// case 1: bubbling
// document.getElementById('grandparent').addEventListener('click', () => {
//     console.log('grandparent clicked!');
// }, false)
// document.getElementById('parent').addEventListener('click', () => {
//     console.log('parent clicked!');
// }, false)
// document.getElementById('child').addEventListener('click', (e) => {
//     console.log('child clicked!');
//     e.stopPropagation();
// }, false)
// Output: child clicked!  (click on child)

// case 2: capturing
// document.getElementById('grandparent').addEventListener('click', () => {
//     console.log('grandparent clicked!');
// }, true)
// document.getElementById('parent').addEventListener('click', () => {
//     console.log('parent clicked!');
// }, true)
// document.getElementById('child').addEventListener('click', (e) => {
//     console.log('child clicked!');
//     e.stopPropagation();
// }, true)
// Output: grandparent clicked! parent clicked! child clicked!  (click on child)
// because first capturing happens then it comes to child click and sees stopPropagation

// case 3: capturing
document.getElementById('grandparent').addEventListener('click', (e) => {
    console.log('grandparent clicked!');
    e.stopPropagation();
}, true)
document.getElementById('parent').addEventListener('click', () => {
    console.log('parent clicked!');
}, true)
document.getElementById('child').addEventListener('click', (e) => {
    console.log('child clicked!');
    e.stopPropagation();
}, true)
// Output: grandparent clicked!  (click on child)
// because first capturing happens then it comes to grandparent click and sees stopPropagation