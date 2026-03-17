import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnackBarComp } from './snack-bar-comp/snack-bar-comp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SnackBarComp],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('careImpact');
}
