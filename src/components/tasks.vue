<template>
    <div id="task-view" class="cf">
        <span id="userGreeting" v-once>Hi {{user}}!</span>
        <h2>TASKS</h2>
        <button id="logout-btn" v-on:click="logout">LOGOUT</button>
        <div id="tasks-header">
            <div class="newtask-container">
                <input type="text" placeholder="New Task Name" v-model='newTaskName' v-on:keyup.enter="addTask" />
                <button v-on:click="addTask">ADD TASK</button>
            </div>
            <div>
                <button class="save-tasks" v-on:click='saveTasks'>SAVE TASKS</button>
            </div>
        </div>

        <ul class="task-list cf">
            <li class="cf" v-for="task in tasks" :key="task.id">
                <task-item class="task-item cf" v-on:deletetask='deleteTask' :task='task'></task-item>
            </li>
        </ul>
    </div>
</template>

<script>

import TaskItem from '@/components/taskitem'
import { EventBus } from '@/components/eventbus'
import Out from '@/components/out'

export default {
    data: function() {
        return {
            newTaskName: '',
            tasks: [],
            user: Out.getUser()
        }
    },

    mounted: function(){
        EventBus.$on('login-change', this.checkAuth)
        EventBus.$on('login-change', () => {
            if (Out.checkAuth())
                this.loadTasks()
        })
        if (Out.checkAuth())
            this.loadTasks()
    },

    methods: {

        logout: function(){
            Out.logout();
            this.$router.replace('/login')
        },

        checkAuth: function(){
            this.loggedIn = Out.checkAuth()
            console.log("checking home auth")
        },

        deleteTask: function(item){
            this.tasks.splice(this.tasks.indexOf(item), 1)
        },
        addTask: function(){
            this.tasks.push({
                id: this.newId(),
                name: this.newTaskName,
                tags: []
            })
            this.newTaskName = ''
        },
        saveTasks: function(){
            Out.saveTasks(this.tasks).then(()=> console.log("saved"))
        },
        loadTasks: function(){
            Out.loadTasks().then((response) => {
                this.tasks = response.data;
                console.log(this.tasks)
            })
        },
        newId: function(){
            let num = localStorage.getItem("idCounter") || 0
            localStorage.setItem("idCounter", ++num)
            return num;
        }
    },

    components: {
        TaskItem
    }
}
</script>

<style>
    #task-view{
        width: 90%;
        margin-left: 5%;
        padding: none;
    }
    #logout-btn{
        position: absolute;
        top: 1em;
        left: 03em;
    }
    #tasks-header{
        margin-bottom: 1em;
    }
    .newtask-container{
        margin-bottom: 2em;
    }
    .save-tasks{
        float: right;
        margin-right: 5%;
    }
    .task-list{
        position: relative;
        list-style-type: none;
        margin-bottom: 0.2em;
        float: left;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        padding: 0;
    }
    .task-list > li{
        position: relative;
        margin-bottom: 1em;
        float: left;
        width: 100%;
    }
    .task-item{
        width: 100%;
        padding: 0.5em;
        box-shadow: 1.5px 1.5px 4px black;
    }
    .cf:before,
    .cf:after {
        content: " ";
        display: table;
    }

    .cf:after {
        clear: both;
    }
</style>
