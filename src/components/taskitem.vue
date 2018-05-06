<template>
    <div>
        <input type='text' v-model='task.name'/>
        <ul><li v-for='tag in task.tags'>
            <input v-model='tag.type'/>
            <input v-model='tag.value'/><button v-on:click='deleteTag(tag)'>DELETE</button></li>
        </ul>
        <button v-on:click='addTag'>ADD TAG</button>
        <button v-on:click='deleteTask'>DELETE</button>
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
