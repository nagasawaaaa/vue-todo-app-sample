Vue.component('task-field', {
  template: `<li class="list-group-item">
    <p>{{ parentTask }}</p>
    <div class="form-group" v-if="edit">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Edit task..." v-model="newTask">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click="updateTask">Done</button>
        </span>
      </div>
    </div>
    <div class="text-right">
      <div class="btn-group" role="group" v-if="!edit">
        <button type="button" class="btn btn-success" @click="editToggle">Edit</button>
      </div>
      <div class="btn-group" role="group" v-if="edit">
        <button type="button" class="btn btn-success" @click="editCancel">Cancel</button>
      </div>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-danger" @click="getIndex">Delete</button>
      </div>
    </div>
  </li>`,
  props: {
    'parentTask': String,
    'id': Number
  },
  data: function(){
    return {
      edit: false,
      newTask: ''
    }
  },
  methods: {
    editToggle: function(){
      this.edit = !this.edit;
    },
    editCancel: function(){
      this.editToggle();
      this.newTask = "";
    },
    getIndex: function(){
      this.$emit('get-index', this.id);
    },
    updateTask: function(){
      if(this.newTask === "") return;
      this.$emit('update-task', this.id, this.newTask);
      this.editCancel();
    }
  }
});

var vm = new Vue({
  el: '#main',
  data: {
    text: '',
    tasks: []
  },
  methods: {
    sendTask: function(){
      if( this.text === '' ) return;
      this.tasks.push(this.text);
      this.text = '';

    },
    deleteTask: function(id){
      this.tasks.splice(id,1);
    },
    updateTask: function(id, task){
      this.tasks.splice(id, 1, task);
    }
  }
});
