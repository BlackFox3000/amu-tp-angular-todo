// src/app/app.component.ts

// Le dÃ©corateur Component permet de donner Ã  Angular des informations
// supplÃ©mentaires sur une classe afin d'expliquer que :
// 1. C'est un composant ;
// 2. Il devra afficher un template HTML donnÃ© ;
// 3. Il aura des styles scopÃ©s ;
// Et beaucoup d'autres choses encore
import { Component } from '@angular/core';
import { Tasks } from './types/task';

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
  tasks: Tasks = [
    { id: 1, text: "Aller faire des courses", done: false },
    { id: 2, text: "Faire à manger", done: true },
  ];

  // La méthode addTask recevra une string
  addTask(text: string) {
    // Elle s'en servira pour créer une nouvelle tâche dans
    // le tableau des tâches, et Angular mettra à jour
    // l'affichage afin d'en tenir compte !
    this.tasks.push({
      id: Date.now(),
      text: text,
      done: false
    });
  }
}
