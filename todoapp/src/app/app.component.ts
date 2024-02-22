// src/app/app.component.ts

// Le dÃ©corateur Component permet de donner Ã  Angular des informations
// supplÃ©mentaires sur une classe afin d'expliquer que :
// 1. C'est un composant ;
// 2. Il devra afficher un template HTML donnÃ© ;
// 3. Il aura des styles scopÃ©s ;
// Et beaucoup d'autres choses encore
import { Component } from '@angular/core';
import { Tasks } from './types/task';
import { HttpClient } from "@angular/common/http";
import { TasksService } from './api/tasks.service';

@Component({
  // Le sÃ©lecteur du composant permet de dire Ã  Angular
  // "Quand tu vois une balise <app-root>, remplaces la
  // par le rendu de ce composant
  selector: 'app-root',
  // Le template reprÃ©sente le HTML qui sera rendu par ce composant
  // Il peut contenir des balises HTML classiques comme des
  // appels Ã  d'autres composants Angular
  template: `
   <div id="app">
          <h1>La Todo App</h1>

          <main>
            <app-todo-list
              [tasks]="tasks"
              (onToggle)="toggle($event)"
            ></app-todo-list>
            <app-task-form
              (onNewTask)="addTask($event)"
            ></app-task-form>
          </main>
      </div>
    `,
  // Les styles nous permettent de crÃ©er des styles CSS *scopÃ©s*
  // C'est Ã  dire que les rÃ¨gles dÃ©finies ici ne s'appliqueront que sur
  // le template de ce composant, et pas en dehors
  styles: []
})
// app/app.component.ts

export class AppComponent {
  tasks: Tasks = [];

  // On ajoute au constructeur une demande de recevoir une instance
  // du TasksService :
  constructor(
    private http: HttpClient,
    private service: TasksService
  ) { }

  ngOnInit() {
    // On remplace le code de la requête HTTP par l'appel
    // à la méthode findAll() de notre service, qui renverra
    // exactement la même chose que ce que renvoyait le
    // HttpClient, on réagira donc de la même manière via la
    // méthode subscribe(
    this.service
      .findAll()
      .subscribe((tasks) => this.tasks = tasks)
  }


   toggle(id: number) {
      const task = this.tasks.find(task => task.id === id);

      if (task) {
        const isDone = !task.done;

        this.service
          .toggleDone(id, isDone)
          .subscribe(() => task.done = isDone);
      }
    }

    addTask(text: string) {
      this.service
        .create(text)
        .subscribe((tasks) => this.tasks.push(tasks[0]));
    }
}
