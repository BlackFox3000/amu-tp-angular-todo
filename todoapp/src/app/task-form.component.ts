// src/app/task-form.component.ts

import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-task-form",
    template: `
        <form (ngSubmit)="onSubmit()" [formGroup]="form">
            <input
              formControlName="text"
              type="text"
              name="todo-text"
              placeholder="Ajouter une tâche"
            />
            <button>Ajouter</button>
        </form>
    `
})
export class TaskFormComponent {
    // Notre formulaire sera représenté par la propriété "form"
    // Elle contient une instance d'un FormGroup (groupe de champs)
    // qui lui même ne contient qu'un seul champ appelé "text" et qui
    // sera représenté par une instance de FormControl
    // Ces deux classes (FormGroup et FormControl) vont nous donner
    // toutes les fonctionnalités nécessaires à gérer des champs de
    // formulaires et en extraire les données !
    form = new FormGroup({
        text: new FormControl()
    });

    onSubmit() {
            console.log(this.form.value);
        }
}
