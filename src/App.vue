<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
    box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1em;
}
#app > img {
    //transform: scale(0.5);
    width: 2em;
    height: 2em;
}
button{
    border: 2px solid blue;
    border-radius: 0.3em;
    background: blue;
    color: white;
    font-size: 1em;
    font-family: Helvetica;
    cursor: pointer;
    padding: 0.1 0.3em;
    text-transform: uppercase;
    transition: all 0.25s ease;
}
button:hover{
    background: white;
    color: blue;
}
input{
    border: none;
    transition: border 0.25s ease;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    margin-bottom: 0.2em;
    font-size: 1em;
    padding-bottom: 0.2em;
}
.display-input{
    border: 1px solid transparent;
}
.display-input:hover, .display-input:focus{
    border: 1px solid black;
}
</style>
