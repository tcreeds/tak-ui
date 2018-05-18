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
            <div class='saved-container'>
                <span class="tasks-saved" v-if='unsavedData.dataSaved && !unsavedData.requestOut'>saved</span>
                <span class="tasks-unsaved" v-if='!unsavedData.dataSaved || unsavedData.requestOut'>unsaved</span>
            </div>
        </div>
        <input type="radio" id="one" value="open" v-model="taskStateFilter">
        <label for="one">Open</label>
        <input type="radio" id="two" value="completed" v-model="taskStateFilter">
        <label for="two">Completed</label>
        <ul class="task-list cf">
            <li class="cf" v-for="task in taskView" :key="task.id">
                <task-item class="task-item cf" v-on:deletetask='deleteTask' v-on:datachanged='onDataChanged' :task='task'></task-item>
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
            user: Out.getUser(),
            timeoutId: 0,
            taskStateFilter: 'open',
            unsavedData: {
                requestOut: false,
                dataSaved: true
            }
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

    computed: {
        taskView: function(){
            console.log(this.taskStateFilter)
            switch(this.taskStateFilter){
                case 'open': return this.openTasks(); break;
                case 'completed': return this.completedTasks(); break;
            }
        }
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
            this.onDataChanged()
        },
        addTask: function(){
            this.tasks.push({
                id: this.newId(),
                state: 'open',
                name: this.newTaskName,
                tags: []
            })
            this.newTaskName = ''
        },
        saveTasks: function(){
            if (!this.unsavedData.requestOut && !this.unsavedData.dataSaved) {
                this.unsavedData.requestOut = true
                Out.saveTasks(this.tasks)
                    .then(this.onDataSaved)
                    .catch(this.onDataSaveFailed)
            }
        },
        loadTasks: function(){
            Out.loadTasks().then((response) => {
                this.tasks = response.data;
                console.log(this.tasks)
            })
        },
        onDataChanged: function(){
            this.unsavedData.dataSaved = false
            window.clearTimeout(this.timeoutId)
            this.timeoutId = window.setTimeout(this.saveTasks, 1100)
        },
        onDataSaved: function(){
            this.unsavedData.dataSaved = true
            this.unsavedData.requestOut = false
        },
        onDataSaveFailed: function(){
            this.unsavedData.dataSaved = false
            this.unsavedData.requestOut = false
        },
        newId: function(){
            let num = localStorage.getItem("idCounter") || 0
            localStorage.setItem("idCounter", ++num)
            return num;
        },
        openTasks: function(){
            return this.tasks.filter((task) => task.state == 'open')
        },
        completedTasks: function(){
            return this.tasks.filter((task) => task.state == 'completed')
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
    .saved-container{
        float: right;
        margin-right: 5%;
    }
    .tasks-saved{
        color: green;
    }
    .tasks-unsaved{
        color: red;
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
