<template>
    <div>
        <input class="task-name" type='text' v-model='task.name'/>
        <ul class="tag-container">
            <li class="cf" v-for='tag in task.tags'>
                <input class="tag-type" v-model='tag.type'/>
                <input class="tag-value" v-model='tag.value'/><button class="delete-tag" v-on:click='deleteTag(tag)'>x</button>
            </li>
            <button class="add-tag" v-on:click='addTag'>+</button>
        </ul>
        <button class="delete-task" v-on:click='deleteTask'>x</button>
    </div>
</template>

<script>


export default {
    props: ['task'],

    methods: {
        deleteTask: function(){
            this.$emit('deletetask', this.task)
        },
        deleteTag: function(tag){
            this.task.tags.splice(this.task.tags.indexOf(tag), 1)
        },
        addTag: function(){
            this.task.tags.push({type:'', value:'New Tag'})
        }
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
    }
    .tag-container > li{
        position: relative;
        list-style-type: none;
    }
    .tag-type, .tag-value{
        font-size: 1em;
        float: left;
        background: lightgreen;
        border-radius: 5px;
        margin-right: 0.3em;
    }
    .add-tag{
        float: left;
        border-radius: 50%;
        padding: 0;
        width: 1em;
        height: 1em;
    }
    .delete-tag{
        float: left;
        background: darkgrey;
        color: white;
        border-radius: 50%;
        border: none;
        padding: 0;
        width: 1em;
        height: 1em;
    }
    .delete-task{
        position: absolute;
        right: 0.5em;
        background: darkgrey;
        color: white;
        border-radius: 50%;
        border: none;
        padding: 0;
        width: 1em;
        height: 1em;
    }

</style>
