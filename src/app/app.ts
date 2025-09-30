import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "../widgets/navigation/navigation";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
}
