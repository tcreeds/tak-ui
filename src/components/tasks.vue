<template>
    <div id="task-view" class="cf">
        <span id="userGreeting" v-once>Hi {{user}}!</span>
        <h2>TASKS</h2>
        <button id="logout-btn" v-on:click="logout">LOGOUT</button>
        <div id="view-list">
            <button id="toggle-views-btn" v-on:click="toggleViewList">V</button>
            <ul v-if="viewListOpen">
                <li v-for="view in views" v-bind:key="view.name" v-on:click="filterText=view.filter">
                    {{view.name}}
                </li>
            </ul>
        </div>
        <div id="tasks-header">
            <div class="newtask-container">
                <input type="text" placeholder="New Task Name" v-model='newTaskName' v-on:keyup.enter="addTask" />
                <button v-on:click="addTask">ADD TASK</button>
            </div>
            <div class='saved-container'>
                <button class="tasks-saved" v-if='unsavedData.dataSaved && !unsavedData.requestOut'>saved</button>
                <button class="tasks-unsaved" v-if='!unsavedData.dataSaved || unsavedData.requestOut'>SAVE</button>
            </div>
            <div class="header-container">
                <input type="radio" id="one" value="open" v-model="taskStateFilter">
                <label for="one">Open</label>
                <input type="radio" id="two" value="completed" v-model="taskStateFilter">
                <label for="two">Completed</label>
                <input type="radio" id="two" value="all" v-model="taskStateFilter">
                <label for="two">All</label>
            </div>
            <div>
                <input type="text" placeholder="Filter" v-model='filterText' />
            </div>
        </div>

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
            filterText: '',
            unsavedData: {
                requestOut: false,
                dataSaved: true
            },
            views: [],
            viewListOpen: false
        }
    },

    mounted: function(){
        if (Out.checkAuth()){
            this.loadData()
        }
    },

    computed: {
        taskView: function(){
            return this.tasks.filter((task) => {
                if (this.filterText.trim().length > 0){
                    return task.name && task.name.includes(this.filterText) ||
                        task.tags.filter((tag) => {
                            return tag.type.includes(this.filterText) || tag.value.includes(this.filterText)
                        }).length > 0
                }
                return true;
            }).filter((task) => {
                return this.taskStateFilter == 'all' || task.state == this.taskStateFilter
            })
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
            this.onDataChanged()
        },
        savaData: function(){
            if (!this.unsavedData.requestOut && !this.unsavedData.dataSaved) {
                this.unsavedData.requestOut = true
                Out.saveData({tasks: this.tasks, views: this.views})
                    .then(this.onDataSaved)
                    .catch(this.onDataSaveFailed)
            }
        },
        loadData: function(){
            Out.loadData().then((response) => {
                this.tasks = response.data.tasks
                this.views = response.data.views
                console.log(this.tasks)
                console.log(this.views)
            })
        },
        onDataChanged: function(){
            /*this.unsavedData.dataSaved = false
            window.clearTimeout(this.timeoutId)
            this.timeoutId = window.setTimeout(this.saveData, 1100)*/
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
            function s4() {
              return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
        openTasks: function(){
            return this.tasks.filter((task) => task.state == 'open')
        },
        completedTasks: function(){
            return this.tasks.filter((task) => task.state == 'completed')
        },
        toggleViewList: function(){
            this.viewListOpen = !this.viewListOpen
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
        left: 3em;
    }
    #view-list{
        position: absolute;
        top: 1em;
        right: 2em;
        width: 10em;
        max-width: 90%;
    }
    #view-list > ul{
        width: 100%;
        float: right;
        list-style-type: none;
        background: white;
    }
    #view-list li{
        cursor: pointer;
    }
    #toggle-views-btn{
        float: right;
    }
    #tasks-header{
        margin-bottom: 1em;
        position: relative;
    }
    .newtask-container{
        margin-bottom: 2em;
    }
    .saved-container{
        position: absolute;
        right: 5%;
    }
    .header-container{
        margin-bottom: 0.7em;
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
