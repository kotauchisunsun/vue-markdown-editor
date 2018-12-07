<template>
    <div id="app">
        <div id="nav">
            <div id="title"><router-link to="/">VMarks</router-link></div>
        </div>
        <div id="content">
            <router-view/>
        </div>
    </div>
</template>

<style>

html {
    height: 100%;
}

body {
    height: 100%;
    background: #222e3c;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
}

#nav {
    padding: 30px;
    width: 100%;
    background: #000000;
}

#nav #title {
    font-size: 50px;
    text-align: left;
    color: #ddddff;
    vertical-align: middle;
}

#nav #title a {
    color: #ddddff;
    text-decoration: none;
}

#nav #title a:hover {
    color: #bbbbcc;
}

#content {
    height: 100%;
    width: 100%;
}
</style>
