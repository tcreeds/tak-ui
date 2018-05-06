<template>
    <div v-if="loggedIn">
        <button v-on:click="logout">LOGOUT</button>
        <input type="text" placeholder="New Task Name" v-model='newTaskName' v-on:keyup.enter="addTask" />
        <button v-on:click="addTask">ADD TASK</button>
        <div>
            <button v-on:click='saveTasks'>SAVE</button>
        </div>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <task-item v-on:deletetask='deleteTask' :task='task'></task-item>
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
            loggedIn: Out.checkAuth()
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
