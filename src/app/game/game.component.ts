import { Component, OnInit, HostListener  } from '@angular/core';
import { Location } from '@angular/common';

enum KEY_CODE {
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  width: number;
  height: number;
  board: number[][];
  currentPosition: number[];
  numberOfSteps: number;

  constructor() {
    this.numberOfSteps = 0
    this.board = [];
    this.currentPosition = [];
    this.currentPosition[0] = 0;
    this.currentPosition[1] = 0;
   }

  ngOnInit() {
    do {
      this.width = parseInt(prompt("Please enter width of board"));
      this.height = parseInt(prompt("Please enter height of board"));
    } while(isNaN(this.width) || isNaN(this.height))

    this.initBoard();
    this.setEnemy();
    this.setPlayer();
  }

  initBoard() {
    for (let i = 0; i < this.width; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.height; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  setEnemy() {
    let numberOfBug = (this.width * this.height)/10;
    for (let index = 0; index < numberOfBug; index++) {
      let i = Math.floor(Math.random() * this.width) + 0;
      let j = Math.floor(Math.random() * this.height) + 0;
      this.board[i][j] = 1;
    }
  }

  setPlayer() {
    let xPos = Math.floor(this.width/2);
    let yPos = Math.floor(this.height/2);
    this.board[xPos][yPos] = 10;
    this.currentPosition[0] = xPos;
    this.currentPosition[1] = yPos;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let movement = false;
    let xPos = this.currentPosition[0];
    let yPos = this.currentPosition[1];

    if (event.keyCode === KEY_CODE.RIGHT_ARROW && this.currentPosition[1]+1 < this.width) {
      this.currentPosition[1] = this.currentPosition[1] + 1;
      movement = true;
    } else if (event.keyCode === KEY_CODE.LEFT_ARROW && this.currentPosition[1]-1 > -1) {
      this.currentPosition[1] = this.currentPosition[1] - 1;
      movement = true;
    } else if (event.keyCode === KEY_CODE.UP_ARROW && this.currentPosition[0]-1 > -1) {
      this.currentPosition[0] = this.currentPosition[0] - 1;
      movement = true;
    } else if (event.keyCode === KEY_CODE.DOWN_ARROW && this.currentPosition[0]+1 < this.height) {
      this.currentPosition[0] = this.currentPosition[0] + 1;
      movement = true;
    }
    
    if(movement) {
      this.board[this.currentPosition[0]][this.currentPosition[1]] = 10;
      this.board[xPos][yPos] = 0;
      this.numberOfSteps++;
      this.checkForEnemy()
    }
  }

  checkForEnemy() {
    let enemyFound = true;
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if(this.board[i][j] == 1) {
          enemyFound = false;
        }
      }
    }

    if(enemyFound) {
      alert("You completed game in " + this.numberOfSteps + " moves")
      location.reload();
    }
  }

}
