'use strict';

Vue.component('task-field', {
  template: '<li class="list-group-item">\n    <p>{{ parentTask }}</p>\n    <div class="form-group" v-if="edit">\n      <div class="input-group">\n        <input type="text" class="form-control" placeholder="Edit task..." v-model="newTask">\n        <span class="input-group-btn">\n          <button class="btn btn-default" type="button" @click="updateTask">Done</button>\n        </span>\n      </div>\n    </div>\n    <div class="text-right">\n      <div class="btn-group" role="group" v-if="!edit">\n        <button type="button" class="btn btn-success" @click="editToggle">Edit</button>\n      </div>\n      <div class="btn-group" role="group" v-if="edit">\n        <button type="button" class="btn btn-success" @click="editCancel">Cancel</button>\n      </div>\n      <div class="btn-group" role="group">\n        <button type="button" class="btn btn-danger" @click="getIndex">Delete</button>\n      </div>\n    </div>\n  </li>',
  props: {
    'parentTask': String,
    'id': Number
  },
  data: function data() {
    return {
      edit: false,
      newTask: ''
    };
  },
  methods: {
    editToggle: function editToggle() {
      this.edit = !this.edit;
    },
    editCancel: function editCancel() {
      this.editToggle();
      this.newTask = "";
    },
    getIndex: function getIndex() {
      this.$emit('get-index', this.id);
    },
    updateTask: function updateTask() {
      if (this.newTask === "") return;
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
    sendTask: function sendTask() {
      if (this.text === '') return;
      this.tasks.push(this.text);
      this.text = '';
    },
    deleteTask: function deleteTask(id) {
      this.tasks.splice(id, 1);
    },
    updateTask: function updateTask(id, task) {
      this.tasks.splice(id, 1, task);
    }
  }
});