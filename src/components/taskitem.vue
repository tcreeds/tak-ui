<template>
    <div>
        <input class="task-name display-input" type='text' @keyup='onDataChanged' v-model='task.name'/>
        <ul class="tag-container">
            <li class="cf" v-for='tag in task.tags'>
                <input class="tag-type" v-model='tag.type' @keyup='onDataChanged'/>
                <input class="tag-value" v-model='tag.value' @keyup='onDataChanged'/>
                <font-awesome-icon icon="times" class="delete-tag" v-on:click='deleteTag(tag)'/>
            </li>
            <font-awesome-icon icon="plus" class="add-tag" v-on:click='addTag'/>
        </ul>
        <div class="task-button-container">
             <font-awesome-icon icon="check" class="task-button-complete" v-on:click='completeTask' />
             <font-awesome-icon icon="times" class="task-button-delete" v-on:click='deleteTask' />
        </div>
    </div>
</template>

<script>

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
    props: ['task'],

    methods: {
        deleteTask: function(){
            this.$emit('deletetask', this.task)
        },
        completeTask: function(){
            if (this.task.state != 'completed')
                this.task.state = 'completed'
            else
                this.task.state = 'open'
            this.$emit('datachanged')
        },
        deleteTag: function(tag){
            this.task.tags.splice(this.task.tags.indexOf(tag), 1)
            this.$emit('datachanged')
        },
        addTag: function(){
            this.task.tags.push({type:'', value:'New Tag'})
        },
        onDataChanged: function(){
            this.$emit('datachanged')
        }
    },

    components: {
        FontAwesomeIcon
    }
}

</script>

<style>
    .task-name{
        font-size: 1.5em;
        float: left;
        margin-left: 0.3em;
        margin-bottom: 0.3em;
        width: 95%;
    }
    .tag-container{
        float: left;
        width: 90%;
        padding: 0;
        margin-left: 5%;
        margin-bottom: 0.2em;
    }
    .tag-container > li{
        position: relative;
        list-style-type: none;
        margin-bottom: 0.5em;
    }
    .tag-type, .tag-value{
        font-size: 1em;
        float: left;
        background: lightgreen;
        border-radius: 5px;
        margin-right: 0.3em;
    }
    .add-tag, .delete-tag{
        float: left;
    }
    .task-button-container{
        position: absolute;
        right: 0.5em;
        top: 50%;
        transform: translateY(-50%);
    }
    .task-button-complete{
        cursor: pointer;
        font-size: 2em;
        margin-right: 0.5em;
    }
    .task-button-delete{
        font-size: 1em;
        cursor: pointer;
        margin-right: 0.5em;
    }

</style>
