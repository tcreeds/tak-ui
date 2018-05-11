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
  margin-top: 60px;
}
button{
    border: 2px solid blue;
    border-radius: 0.3em;
    background: blue;
    color: white;
    font-size: 1em;
    font-family: Helvetica;
    cursor: pointer;
    padding: 0 0.2em;
}
input{
    border: 1px solid transparent;
    transition: border 0.25s ease;
    box-sizing: border-box;
}
input:hover, input:focus{
    border: 1px solid black;
}
</style>
