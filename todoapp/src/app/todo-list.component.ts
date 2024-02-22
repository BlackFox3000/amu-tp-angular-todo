// src/app/todo-list.component.ts

import { Component, Input } from "@angular/core";
// Définition du type d'un élément de la liste des tâches
interface Task {
    id: number;
    text: string;
    done: boolean;
}

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
    // Le dÃ©corateur Input permet de spÃ©cifier Ã  Angular
    // que cette donnÃ©e tasks pourra Ãªtre renseignÃ©e depuis
    // l'extÃ©rieur du composant. Par dÃ©faut, le tableau sera vide
    // mais il prendra la valeur qu'on lui donne depuis l'extÃ©rieur
    // si c'est le cas
    @Input()
    tasks: Task[] = [];
}
