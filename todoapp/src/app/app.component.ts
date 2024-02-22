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
  // Supprimons les tasks qui étaient en dur dans le tableau
    // d'objets et remplaçons cela par un tableau vide au départ
    tasks: Tasks = [];

  // Grâce au constructor, on peut indiquer à Angular que notre
  // composant aura besoin d'une instance de la classe HttpClient
  constructor(private http: HttpClient) {

    // Ayant obtenu l'instance de HttpClient, on peut l'utiliser
    // pour appeler Supabase en méthode GET. On peut tout de suite
    // indiquer à la méthode GET qu'elle doit s'attendre à recevoir un json
    // correspondant à un tableau de tâches (le fameux type Tasks).
    // On n'oubliera pas aussi de préciser pour cette requête HTTP
    // les entêtes importantes comme le Content-Type ou la clé API
    this.http.get<Tasks>('https://rjztxrmgksaiqczizfvz.supabase.co/rest/v1/todos', {
      headers: {
        "Content-Type": "application/json",
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqenR4cm1na3NhaXFjeml6ZnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQzNTEsImV4cCI6MjAyMzkzMDM1MX0.73y6U15n4TfbctZwOvJ6PPFEoFHwDeG6whD_SOmgZJA"
      }
    })
    // Lorsque la requête aura terminé son travail et que le serveur
    // aura répondu, nous recevrons une liste de tâches que
    // nous pourrons alors assigner à notre propriété "tasks"
    .subscribe((tasks) => this.tasks = tasks)
  }

  ngOnInit() {
    this.http.get<Tasks>('https://rjztxrmgksaiqczizfvz.supabase.co/rest/v1/todos', {
      headers: {
        "Content-Type": "application/json",
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqenR4cm1na3NhaXFjeml6ZnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQzNTEsImV4cCI6MjAyMzkzMDM1MX0.73y6U15n4TfbctZwOvJ6PPFEoFHwDeG6whD_SOmgZJA"
      }
    }).subscribe((tasks) => this.tasks = tasks)
  }


  addTask(text: string) {
      // Appelons l'API en POST et signalons que nous recevrons
      // en retour un JSON représentant un tableau de tâches
      this.http.post<Tasks>(
        'https://rjztxrmgksaiqczizfvz.supabase.co/rest/v1/todos',
        // Passons à l'API un objet à insérer dans la base de données
        // qui ne comporte que le text et le statut (vu que l'id sera
        // assigné automatiquement par la base de données)
        {
          text: text,
          done: false
        },
        // N'oublions pas les entêtes permettant d'informer le
        // serveur sur ce qu'on envoie et ce que l'on souhaite
        // recevoir
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqenR4cm1na3NhaXFjeml6ZnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQzNTEsImV4cCI6MjAyMzkzMDM1MX0.73y6U15n4TfbctZwOvJ6PPFEoFHwDeG6whD_SOmgZJA",
            Prefer: "return=representation"
          }
        }
      )
      // Lorsque la requête sera terminée et qu'on aura reçu la réponse du serveur
      // nous recevrons un tableau de tasks, dont la première
      // (et la seule) sera celle qu'on vient d'ajouter.
      // Il nous suffira donc de la pousser dans le tableau, et Angular
      // réaffichera le tableau modifié dans l'interface
      .subscribe((tasks) => this.tasks.push(tasks[0]));
  }

  // Lorsque le composant TodoListComponent va emettre l'événement
    // (onToggle), on va l'écouter et appeler cette méthode on passant
    // l'événement (qui est un identifiant numérique d'une tâche)
    toggle(id: number) {
      // On retrouve la tâche qui correspond à l'identifiant
      const task = this.tasks.find(task => task.id === id);

      // Si la tâche existe
      if (task) {
        // On récupère l'inverse de son statut
        const isDone = !task.done;

        // On appelle l'API en PATCH (pour modifier une tâche)
        this.http.patch<Tasks>(
          'https://rjztxrmgksaiqczizfvz.supabase.co/rest/v1/todos?id=eq.' + id,
          // On ne passe que la donnée qui doit changer
          {
            done: isDone
          },
          // Et toujours les entêtes importantes
          {
            headers: {
              "Content-Type": "application/json",
              apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqenR4cm1na3NhaXFjeml6ZnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQzNTEsImV4cCI6MjAyMzkzMDM1MX0.73y6U15n4TfbctZwOvJ6PPFEoFHwDeG6whD_SOmgZJA",
              Prefer: "return=representation"
            }
          }
        )
        // Lorsque la réponse revient, il nous suffit simplement
        // de faire évoluer la tâche locale, et Angular actualisera
        // l'interface HTML
        .subscribe(() => task.done = isDone);
      }
    }
}
