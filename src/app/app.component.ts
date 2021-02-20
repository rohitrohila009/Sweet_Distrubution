import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  rows: number;
  column: number;
  rowsForXY: number;
  columnForXY: number;
  corner:string="";
  blocksArray: any = [];
  rowArray: any = [];
  columnArray: any = [];
  styleParams: any;
  submitClicked: boolean = false;
  sweetRow=1
  sweetCol=1
  var_dir=""
  hor_dir=""
  direction=""

  ngOnInIt() {
    this.submitClicked = false;
  }
  getDetails() {
    this.rowArray=[];
    this.columnArray=[]
    if(this.corner == 'tLeft'){
      this.sweetRow=1
      this.sweetCol=1
    }else if(this.corner == 'tRight'){
      this.sweetRow=1
      this.sweetCol=this.column
    }
    else if(this.corner == 'bLeft'){
      this.sweetRow=this.rows
      this.sweetCol=1
    }else{
      this.sweetRow=this.rows
      this.sweetCol=this.column
    }
    console.log(this.sweetRow,'row');
    console.log(this.sweetCol,'col');

    for (let i = 1; i <= this.rows; i++) {
      this.rowArray.push(i);
    }
    for (let i = 1; i <= this.column; i++) {
      this.columnArray.push(i);
    }
    this.styleParams = 100 / this.column;
    console.log(this.rowArray);
    console.log(this.columnArray);
    this.submitClicked = true;
    // console.log(this.corner)
    
    this.sweetDistribution();

  }
  adjustStyleFlex(){   
  return `0 0 ${this.styleParams}%`
  }
  adjustStyleWidth(){   
    return ` ${this.styleParams}%`
    }
  show(rowIndex, columnIndex) {

    if (rowIndex !== this.rowsForXY && columnIndex !== this.columnForXY) {
      return true;
    } else {
      return false;
    }
  }
  sweetDistribution(){
    if (this.sweetRow==1)
  {
        this.var_dir='down'
        this.direction =  this.var_dir

        
  }
    else
  {
        this.var_dir='up'
        this.direction =  this.var_dir

    
  }
    
    if (this.sweetCol==1)
  {
        if ((this.sweetRow-this.rowsForXY)%2==0){
            this.hor_dir = 'right'
            this.direction = this.hor_dir
      
  }
        else
    {
            this.hor_dir = 'left'
            this.direction = this.hor_dir

  }
    }
    else
  {
        if ((this.sweetRow-this.rowsForXY)%2==0){
            this.hor_dir = 'left'
            this.direction = this.hor_dir

      }
        else{
            this.hor_dir = 'right'
            this.direction = this.hor_dir

      }
  }
  if (this.hor_dir == 'right'){
    if (this.columnForXY+1 <= this.column){
        console.log('Right')
        this.direction = 'Right'

      }
    else{
        if(this.var_dir == 'up'){
            if (this.rowsForXY-1 >= 1){
                console.log('Front')
        this.direction = 'Front'

              }
            else{console.log('Over')
        this.direction = 'Over'

          }
    }
        else{
            if (this.rowsForXY+1 <= this.rows){
                console.log('Back')
        this.direction = 'Back'

              }
            else
            {
              console.log('Over');
        this.direction = 'Over'

            }
    }
    
    
  }
}

else{
    if (this.columnForXY-1 >= 1)
{
        console.log('Left')
        this.direction = 'Left'

  }
    else{
        if (this.var_dir == 'up'){
            if (this.rowsForXY-1 >= 1){
                console.log('Front')
                this.direction = 'Front'


              }
            else{
              console.log('Over')
              this.direction = 'Over'

            }
    }
        else{
            if (this.rowsForXY+1 <= this.rows){
                console.log('Back')
              this.direction = 'Back'

              }
            else{
              console.log('Over')
              this.direction = 'Over'

    }
    }
  }


}
  }
}
