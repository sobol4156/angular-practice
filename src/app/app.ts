import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TuiLink } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, RouterLink, TuiLink],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
}
