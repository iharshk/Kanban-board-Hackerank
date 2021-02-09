import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName: string

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = (submit = false) => {
    if(this.taskName) {
      let a : Task = { name: this.taskName, stage: 0 };
      let unique = true;
      this.tasks.map(el => {
          if(el.name == this.taskName) {
            unique = false
          }
      })
      if(unique){
        this.tasks.push(a);
        this.stagesTasks[0].push(a)
      }
      this.taskName = ''
    }

    if(!submit) {
      this.stagesTasks = [];
      for (let i = 0; i < this.stagesNames.length; ++i) {
        this.stagesTasks.push([]);
      }
      for (let task of this.tasks) {
        console.log(task)
        const stageId = task.stage;
        this.stagesTasks[stageId].push(task);
      }
    }

  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
  
  moveTask(index, task, action) {
    let taskToMove = {name : '', stage : 0};
    this.stagesTasks.map((stages, i) => {
      if(i === task.stage) {
        switch(action) {
          case 'back':
              stages.map((el, ind) => {
                if(el.name == task.name) {
                  taskToMove.name = el.name;
                  taskToMove.stage = el.stage;
                  stages.splice(ind, 1);
                }
            });
            taskToMove.stage--
            this.stagesTasks[i - 1].push(taskToMove);
            taskToMove = {name : '', stage : 0};

          break;
          case 'forward':
            stages.map((el, ind) => {
                if(el.name == task.name) {
                  taskToMove.name = el.name;
                  taskToMove.stage = el.stage;
                  stages.splice(ind, 1);
                }
            });
            taskToMove.stage++
            this.stagesTasks[i + 1].push(taskToMove);
            taskToMove = {name : '', stage : 0};
          break;
          case 'delete':
            stages.map((el, ind) => {
                if(el.name == task.name) {
                  stages.splice(ind, 1);
                }
            });
            
            this.tasks.map((el, ind) => {
              if(el.name == task.name) {
                this.tasks.splice(ind, 1);
              }
            })

          break;
        }
      }
    })

  }

}

interface Task {
  name: string;
  stage: number;
}