// src/app/todo-list.component.ts

import { Component, Input } from "@angular/core";
import { Tasks } from './types/task';

// Définition du type d'un élément de la liste des tâches


@Component({
    // Ce composant sera affichÃ© par Angular Ã  chaque fois
    // qu'un Ã©lÃ©ment <app-todo-list> sera rencontrÃ© dans
    // un template HTML
    selector: 'app-todo-list',
    // Le HTML reprend ici notre liste de tÃ¢ches
    template: `
        <ul>
            <li *ngFor="let item of tasks">
                <label>
                <input
                    type="checkbox"
                    id="item-{{ item.id }}"
                    [checked]="item.done"
                />
                {{ item.text }}
                </label>
            </li>
        </ul>
    `
})
export class TodoListComponent {
    @Input()
    tasks: Tasks = [];
}
